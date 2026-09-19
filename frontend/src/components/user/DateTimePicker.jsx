/**
 * ORIXA – DateTimePicker
 * ───────────────────────
 * Calendar-view date picker combined with an hour/minute time selector.
 * Rendered under the Home page "Arrival by" control.
 */

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const pad = (n) => String(n).padStart(2, '0');
const toDateStr = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const todayStr = () => {
  const t = new Date();
  return toDateStr(t.getFullYear(), t.getMonth(), t.getDate());
};

export default function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  onClose,
  minDate,
}) {
  const min = minDate || todayStr();

  const selected = useMemo(() => {
    const [y, m, d] = (date || todayStr()).split('-').map(Number);
    return { y, m: m - 1, d };
  }, [date]);

  const [view, setView] = useState({ y: selected.y, m: selected.m });

  const [hour, minute] = (time || '08:00').split(':').map(Number);

  const changeMonth = (delta) => {
    setView((prev) => {
      let m = prev.m + delta;
      let y = prev.y;
      if (m < 0)  { m = 11; y -= 1; }
      if (m > 11) { m = 0;  y += 1; }
      return { y, m };
    });
  };

  const goToday = () => {
    const t = new Date();
    setView({ y: t.getFullYear(), m: t.getMonth() });
    onDateChange(todayStr());
  };

  const grid = useMemo(() => {
    const first = new Date(view.y, view.m, 1).getDay();
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < first; i += 1) cells.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [view]);

  const handleTime = (h, m) => onTimeChange(`${pad(h)}:${pad(m)}`);

  return (
    <div className="dtp-panel" role="dialog" aria-label="Select arrival date and time">
      <div className="dtp-calendar">
        <div className="dtp-head">
          <button type="button" className="dtp-nav" onClick={() => changeMonth(-1)} aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <div className="dtp-title">
            <CalendarIcon size={14} aria-hidden="true" />
            <span>{MONTHS[view.m]} {view.y}</span>
          </div>
          <button type="button" className="dtp-nav" onClick={() => changeMonth(1)} aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="dtp-weekdays" aria-hidden="true">
          {WEEKDAYS.map((w) => <span key={w}>{w}</span>)}
        </div>

        <div className="dtp-grid">
          {grid.map((day, idx) => {
            if (day === null) return <span key={`e${idx}`} className="dtp-cell empty" />;
            const dateStr = toDateStr(view.y, view.m, day);
            const isPast = dateStr < min;
            const isSelected = dateStr === date;
            const isToday = dateStr === todayStr();
            return (
              <button
                key={dateStr}
                type="button"
                className={`dtp-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => onDateChange(dateStr)}
                disabled={isPast}
                aria-pressed={isSelected}
                aria-label={dateStr}
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="dtp-quick">
          <button type="button" className="dtp-quick-btn" onClick={goToday}>Today</button>
          <button
            type="button"
            className="dtp-quick-btn"
            onClick={() => {
              const t = new Date(Date.now() + 86400000);
              const s = toDateStr(t.getFullYear(), t.getMonth(), t.getDate());
              setView({ y: t.getFullYear(), m: t.getMonth() });
              onDateChange(s);
            }}
          >
            Tomorrow
          </button>
        </div>
      </div>

      <div className="dtp-time">
        <div className="dtp-time-label">
          <Clock size={14} aria-hidden="true" />
          <span>Arrival time</span>
        </div>

        <div className="dtp-time-value" aria-live="polite">
          {pad(hour)}:{pad(minute)}
        </div>

        <div className="dtp-time-controls">
          <div className="dtp-stepper">
            <label>Hour</label>
            <div className="dtp-step-row">
              <button type="button" onClick={() => handleTime((hour + 23) % 24, minute)} aria-label="Decrease hour">−</button>
              <input
                type="number"
                min="0"
                max="23"
                value={pad(hour)}
                onChange={(e) => handleTime(Math.max(0, Math.min(23, Number(e.target.value) || 0)), minute)}
                aria-label="Hour"
              />
              <button type="button" onClick={() => handleTime((hour + 1) % 24, minute)} aria-label="Increase hour">+</button>
            </div>
          </div>

          <div className="dtp-stepper">
            <label>Minute</label>
            <div className="dtp-step-row">
              <button type="button" onClick={() => handleTime(hour, (minute + 55) % 60)} aria-label="Decrease minute">−</button>
              <input
                type="number"
                min="0"
                max="59"
                value={pad(minute)}
                onChange={(e) => handleTime(hour, Math.max(0, Math.min(59, Number(e.target.value) || 0)))}
                aria-label="Minute"
              />
              <button type="button" onClick={() => handleTime(hour, (minute + 5) % 60)} aria-label="Increase minute">+</button>
            </div>
          </div>
        </div>

        <div className="dtp-presets">
          {['08:00', '09:00', '12:00', '17:00', '18:00'].map((t) => (
            <button
              key={t}
              type="button"
              className={`dtp-preset ${time === t ? 'active' : ''}`}
              onClick={() => onTimeChange(t)}
              aria-pressed={time === t}
            >
              {t}
            </button>
          ))}
        </div>

        <button type="button" className="dtp-done" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}