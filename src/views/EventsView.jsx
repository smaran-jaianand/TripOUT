import React, { useMemo, useState } from "react";
import { EVENTS } from "../data";

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

export default function EventsView({ onSelectEvent, searchQuery, events, onNewEvent }) {
  const [viewMode, setViewMode] = useState("grid");
  const formatCountdown = (eventDate) => {
    const now = new Date();
    const diff = eventDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    } else if (hours > 0) {
      return `${hours}h remaining`;
    } else {
      return "Today";
    }
  };

  const eventList = events || [];
  const filtered = useMemo(() => {
    if (!searchQuery) return eventList;
    return eventList.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, eventList]);

  return (
    <div className="flex-1 p-8 overflow-y-auto view-enter">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-headline text-4xl text-gray-900 mb-3 dark:text-white">
              Your Events
            </h2>
            <p className="font-body text-gray-600 text-lg max-w-2xl dark:text-gray-400">
              Select an event to manage vendors, quotes, and workspace details.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-1 rounded-lg flex items-center dark:bg-gray-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded flex items-center justify-center transition-colors ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-primary dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
                title="Grid View"
              >
                <Icon name="grid_view" className="text-[20px]" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded flex items-center justify-center transition-colors ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-primary dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                }`}
                title="List View"
              >
                <Icon name="view_list" className="text-[20px]" />
              </button>
            </div>
            <button
              onClick={onNewEvent}
              className="py-2.5 px-5 bg-primary text-white rounded-lg font-label font-bold text-sm tracking-wide hover:opacity-90 transition-all flex items-center gap-2 active:scale-95"
            >
              <Icon name="add" className="text-[20px]" />
              New Event
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="event_note" className="text-6xl text-gray-300 mb-4 inline-block" />
            <p className="font-body text-gray-600 text-lg dark:text-gray-400">
              No events found matching "{searchQuery}"
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-primary/50 hover:shadow-md transition-all card-enter dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon name={event.icon} className="text-primary text-3xl" />
                </div>
                <h3 className="font-headline text-xl font-bold text-gray-900 mb-2 dark:text-white">
                  {event.title}
                </h3>
                <p className="font-body text-sm text-gray-600 mb-4 dark:text-gray-400">
                  {event.location}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm font-label">
                    <Icon name="calendar_month" className="text-primary" />
                    <span className="text-gray-900 dark:text-white">
                      {event.date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-label">
                    <Icon name="schedule" className="text-primary" />
                    <span className="text-primary font-medium">
                      {formatCountdown(event.date)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectEvent(event.id)}
                  className="w-full py-2.5 px-4 bg-primary text-white rounded-lg font-label font-medium text-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="arrow_forward" className="text-sm" />
                  Open Event
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 rounded-xl border border-gray-200 p-5 hover:border-primary/50 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 shrink-0">
                  <Icon name={event.icon} className="text-primary text-[24px]" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-headline text-xl font-bold text-gray-900 mb-1 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="font-body text-sm text-gray-600 dark:text-gray-400">
                    {event.location}
                  </p>
                </div>
                
                <div className="flex items-center gap-8 text-sm md:w-auto">
                  <div className="flex items-center gap-2 font-label text-gray-700 dark:text-gray-300 min-w-[120px]">
                    <Icon name="calendar_month" className="text-primary text-[20px]" />
                    {event.date.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2 font-label text-primary font-medium min-w-[120px]">
                    <Icon name="schedule" className="text-[20px]" />
                    {formatCountdown(event.date)}
                  </div>
                </div>
                
                <button
                  onClick={() => onSelectEvent(event.id)}
                  className="w-full md:w-auto py-2.5 px-6 bg-primary text-white rounded-lg font-label font-medium text-sm hover:opacity-90 transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  Open
                  <Icon name="arrow_forward" className="text-sm" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
