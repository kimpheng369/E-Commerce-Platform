/* ==========================================================================
   AURA E-COMMERCE PLATFORM - WORLDWIDE TIMEZONE PROTOCOL SUITE
   ========================================================================== */

import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../context/StoreContext.jsx';

function getAllWorldTimezones() {
  let list = [];
  try {
    if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
      list = Intl.supportedValuesOf('timeZone');
    }
  } catch (e) {}

  if (!list || list.length === 0) {
    list = [
      'Africa/Cairo', 'Africa/Casablanca', 'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Nairobi',
      'America/Anchorage', 'America/Bogota', 'America/Buenos_Aires', 'America/Chicago', 'America/Denver',
      'America/Halifax', 'America/Los_Angeles', 'America/Mexico_City', 'America/New_York', 'America/Phoenix',
      'America/Santiago', 'America/Sao_Paulo', 'America/Toronto', 'America/Vancouver',
      'Asia/Bangkok', 'Asia/Colombo', 'Asia/Dhaka', 'Asia/Dubai', 'Asia/Hong_Kong', 'Asia/Jakarta',
      'Asia/Jerusalem', 'Asia/Karachi', 'Asia/Kolkata', 'Asia/Kuala_Lumpur', 'Asia/Manila', 'Asia/Phnom_Penh',
      'Asia/Riyadh', 'Asia/Seoul', 'Asia/Shanghai', 'Asia/Singapore', 'Asia/Taipei', 'Asia/Tokyo',
      'Atlantic/Reykjavik', 'Australia/Adelaide', 'Australia/Brisbane', 'Australia/Melbourne',
      'Australia/Perth', 'Australia/Sydney', 'Europe/Amsterdam', 'Europe/Athens', 'Europe/Berlin',
      'Europe/Brussels', 'Europe/Budapest', 'Europe/Dublin', 'Europe/Helsinki', 'Europe/Istanbul',
      'Europe/Lisbon', 'Europe/London', 'Europe/Madrid', 'Europe/Moscow', 'Europe/Paris', 'Europe/Prague',
      'Europe/Rome', 'Europe/Stockholm', 'Europe/Vienna', 'Europe/Warsaw', 'Europe/Zurich',
      'Pacific/Auckland', 'Pacific/Fiji', 'Pacific/Guam', 'Pacific/Honolulu', 'Pacific/Port_Moresby', 'UTC'
    ];
  }
  return list;
}

export default function TimezoneSuite({ selectedTimezone, onTimezoneChange }) {
  const { showToast } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [now, setNow] = useState(new Date());

  // Ticking digital clock every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const allTimezones = useMemo(() => getAllWorldTimezones(), []);

  // Pre-calculate items and group by continent
  const groupedTimezones = useMemo(() => {
    const groups = {};
    const q = searchQuery.toLowerCase().trim();

    allTimezones.forEach(tz => {
      const parts = tz.split('/');
      const region = parts.length > 1 ? parts[0] : 'General / UTC';
      const cityName = parts.length > 1 ? parts.slice(1).join('/').replace(/_/g, ' ') : tz;

      let offset = 'GMT';
      try {
        const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
        offset = f.formatToParts(now).find(p => p.type === 'timeZoneName')?.value || 'GMT';
      } catch (e) {}

      const label = `(${offset}) ${cityName}`;
      const searchStr = `${tz} ${cityName} ${offset}`.toLowerCase();

      if (!q || searchStr.includes(q)) {
        if (!groups[region]) groups[region] = [];
        groups[region].push({ tz, offset, cityName, label });
      }
    });

    return groups;
  }, [allTimezones, searchQuery, now]);

  const regionNames = useMemo(() => {
    const priority = ['Asia', 'America', 'Europe', 'Australia', 'Pacific', 'Africa', 'Atlantic'];
    return Object.keys(groupedTimezones).sort((a, b) => {
      const pA = priority.indexOf(a);
      const pB = priority.indexOf(b);
      if (pA !== -1 && pB !== -1) return pA - pB;
      if (pA !== -1) return -1;
      if (pB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [groupedTimezones]);

  // Handle 1-click Auto Detect
  const handleAutoDetect = () => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) {
        onTimezoneChange(detected);
        showToast(`Auto-detected timezone: ${detected.replace(/_/g, ' ')}`, 'success');
      }
    } catch (e) {
      showToast('Could not detect local timezone', 'error');
    }
  };

  // Format live clock data
  let timeStr = '--:--:-- --';
  let dateStr = '';
  let offsetBadge = 'GMT';

  try {
    const timeF = new Intl.DateTimeFormat('en-US', {
      timeZone: selectedTimezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    const dateF = new Intl.DateTimeFormat('en-US', {
      timeZone: selectedTimezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const offsetF = new Intl.DateTimeFormat('en-US', {
      timeZone: selectedTimezone,
      timeZoneName: 'shortOffset'
    });

    timeStr = timeF.format(now);
    dateStr = dateF.format(now);
    offsetBadge = offsetF.formatToParts(now).find(p => p.type === 'timeZoneName')?.value || 'GMT';
  } catch (e) {
    timeStr = now.toLocaleTimeString();
  }

  return (
    <div className="form-group timezone-picker-group">
      <div className="timezone-header-row">
        <label className="form-label" htmlFor="drawer-timezone">
          <i className="fa-regular fa-clock" style={{ marginRight: '0.25rem' }}></i> Primary Timezone
        </label>
        <button
          type="button"
          className="btn-detect-tz"
          onClick={handleAutoDetect}
          title="Auto-detect my current system timezone"
        >
          <i className="fa-solid fa-crosshairs"></i> Auto-Detect
        </button>
      </div>

      {/* Real-time Search / Filter Input */}
      <div className="timezone-search-wrap">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          className="form-input timezone-search-input"
          placeholder="Filter city or region (e.g. Phnom Penh, Tokyo, London, New York)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* Grouped Timezone Select */}
      <select
        id="drawer-timezone"
        className="form-input timezone-select"
        value={selectedTimezone}
        onChange={(e) => onTimezoneChange(e.target.value)}
      >
        {regionNames.map(region => (
          <optgroup key={region} label={region === 'America' ? 'Americas (North & South)' : region}>
            {groupedTimezones[region].map(item => (
              <option key={item.tz} value={item.tz}>{item.label}</option>
            ))}
          </optgroup>
        ))}
      </select>

      {/* Live Digital Clock & Offset Card */}
      <div className="timezone-live-card">
        <div className="tz-live-clock-row">
          <div className="tz-live-time">{timeStr}</div>
          <span className="tz-live-offset-badge">{offsetBadge}</span>
        </div>
        <div className="tz-live-details">
          {selectedTimezone.replace(/_/g, ' ')} • {dateStr}
        </div>
      </div>
    </div>
  );
}
