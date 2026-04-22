import React, { useState } from "react";

function Icon({ name, filled, className = "" }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}

export default function SettingsView({ event }) {
  const [saved, setSaved] = useState(false);

  // Event Settings
  const [eventName, setEventName] = useState(event?.title || "Q3 Executive Retreat");
  const [eventLocation, setEventLocation] = useState(event?.location || "Mumbai");
  const [eventDate, setEventDate] = useState(event?.date ? new Date(event.date).toISOString().split('T')[0] : "2026-06-20");
  const [guestCount, setGuestCount] = useState("45");
  const [budget, setBudget] = useState("500000");
  const [eventDescription, setEventDescription] = useState(event?.description || "A premium retreat for team building and strategic planning.");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 p-8 lg:p-12 max-w-3xl mx-auto w-full view-enter overflow-y-auto">
      {/* Header */}
      <h2 className="font-headline text-3xl font-bold text-gray-900 mb-8 dark:text-white sticky top-0 bg-white dark:bg-gray-950 pb-4 z-10">
        Event Settings
      </h2>

      <div className="space-y-6">
        {/* Event Information */}
        <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-label font-bold text-gray-900 mb-4 flex items-center gap-2 dark:text-white">
            <Icon name="event_note" />
            Event Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
                Location
              </label>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
                Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
                Guest Count
              </label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
                Budget (₹)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
              Description
            </label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows="3"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </section>

        {/* Event Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center dark:bg-gray-800 dark:border-gray-700">
            <div className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
              Est. Cost/Guest
            </div>
            <div className="font-headline text-2xl font-bold text-primary mt-2">
              ₹{(parseInt(budget) / parseInt(guestCount)).toFixed(0)}
            </div>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center dark:bg-gray-800 dark:border-gray-700">
            <div className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
              Days to Event
            </div>
            <div className="font-headline text-2xl font-bold text-primary mt-2">
              {Math.max(0, Math.floor((new Date(eventDate) - new Date()) / (1000 * 60 * 60 * 24)))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-primary text-white py-3 rounded-lg font-label font-bold tracking-wide hover:opacity-90 transition-colors active:scale-[0.98] mt-8"
      >
        {saved ? "✓ Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
