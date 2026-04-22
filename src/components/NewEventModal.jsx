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

export default function NewEventModal({ isOpen, onClose, onCreateEvent }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [icon, setIcon] = useState("event");
  const [error, setError] = useState("");

  const EVENT_ICONS = [
    "event",
    "business_center",
    "celebration",
    "groups",
    "favorite",
    "card_giftcard",
    "theater_comedy",
    "sports_soccer",
  ];

  const INDIAN_CITIES = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Goa",
    "Kerala",
    "Jaipur",
    "Lucknow",
    "Ahmedabad",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Event title is required");
      return;
    }
    if (!location.trim()) {
      setError("Location is required");
      return;
    }
    if (!date) {
      setError("Event date is required");
      return;
    }

    const eventDate = new Date(date);
    if (eventDate <= new Date()) {
      setError("Event date must be in the future");
      return;
    }

    onCreateEvent({
      title: title.trim(),
      location: location.trim(),
      date: eventDate,
      icon: icon,
    });

    setTitle("");
    setLocation("");
    setDate("");
    setIcon("event");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-headline text-2xl font-bold text-gray-900 dark:text-white">
            Create Event
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-100"
          >
            <Icon name="close" className="text-[24px]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-1">
            <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Wedding, Corporate Retreat, Product Launch"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="">Select a city...</option>
              {INDIAN_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
              Event Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>

          {/* Icon */}
          <div className="space-y-1">
            <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
              Event Type
            </label>
            <div className="grid grid-cols-4 gap-2">
              {EVENT_ICONS.map((ico) => (
                <button
                  key={ico}
                  type="button"
                  onClick={() => setIcon(ico)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    icon === ico
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:border-primary/50"
                  } dark:bg-gray-800 dark:border-gray-700`}
                >
                  <Icon name={ico} className="text-primary text-[20px]" />
                </button>
              ))}
            </div>
            <p className="font-body text-xs text-gray-500 mt-2 dark:text-gray-400">
              {icon === "favorite" && "Perfect for weddings"}
              {icon === "celebration" && "Great for parties"}
              {icon === "business_center" && "For corporate events"}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-900 rounded-lg font-label font-medium hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-primary text-white rounded-lg font-label font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="add" className="text-sm" />
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
