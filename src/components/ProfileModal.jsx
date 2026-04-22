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

export default function ProfileModal({ isOpen, onClose }) {
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex@tripout.ai");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-xl dark:bg-gray-900">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-headline text-2xl font-bold text-gray-900 dark:text-white">
              Profile Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-100"
            >
              <Icon name="close" className="text-[24px]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Profile Information */}
            <section className="space-y-4">
              <h3 className="font-label font-bold text-gray-900 mb-4 flex items-center gap-2 dark:text-white">
                <Icon name="person" />
                Profile Information
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </section>

            {/* Preferences */}
            <section className="space-y-4">
              <h3 className="font-label font-bold text-gray-900 mb-4 flex items-center gap-2 dark:text-white">
                <Icon name="tune" />
                Preferences
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-body text-sm text-gray-900 dark:text-white">
                    In-App Notifications
                  </span>
                  <button
                    role="switch"
                    aria-checked={notifications}
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      notifications ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        notifications ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-body text-sm text-gray-900 dark:text-white">
                    Email Updates
                  </span>
                  <button
                    role="switch"
                    aria-checked={emailUpdates}
                    onClick={() => setEmailUpdates(!emailUpdates)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      emailUpdates ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        emailUpdates ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </label>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-900 rounded-lg font-label font-medium hover:bg-gray-200 transition-colors dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 py-2.5 px-4 bg-primary text-white rounded-lg font-label font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name={saved ? "check" : "save"} className="text-sm" />
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
