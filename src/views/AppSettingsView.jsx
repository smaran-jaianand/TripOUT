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

export default function AppSettingsView() {
  const [saved, setSaved] = useState(false);

  // App Settings
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex@tripout.ai");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [notifications, setNotifications] = useState(true);
  const [aiRecs, setAiRecs] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 p-8 lg:p-12 max-w-3xl mx-auto w-full view-enter overflow-y-auto">
      <h2 className="font-headline text-3xl font-bold text-gray-900 mb-8 dark:text-white sticky top-0 bg-white dark:bg-gray-950 pb-4 z-10">
        App Settings
      </h2>

      <div className="space-y-6">
        {/* Profile */}
        <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-label font-bold text-gray-900 mb-4 flex items-center gap-2 dark:text-white">
            <Icon name="person" />
            Profile Information
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="font-label text-xs text-gray-600 uppercase tracking-wider font-bold dark:text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-label font-bold text-gray-900 mb-4 flex items-center gap-2 dark:text-white">
            <Icon name="tune" />
            Preferences
          </h3>
          <div className="space-y-6">
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <div className="font-body text-sm font-medium text-gray-900 dark:text-white">
                  In-App Notifications
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Receive bell notifications</div>
              </div>
              <button
                role="switch"
                aria-checked={notifications}
                onClick={() => setNotifications(!notifications)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
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
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <div className="font-body text-sm font-medium text-gray-900 dark:text-white">
                  Email Updates
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Weekly digests and summaries</div>
              </div>
              <button
                role="switch"
                aria-checked={emailUpdates}
                onClick={() => setEmailUpdates(!emailUpdates)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
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
            <label className="flex items-center justify-between cursor-pointer group">
              <div>
                <div className="font-body text-sm font-medium text-gray-900 dark:text-white">
                  AI Smart Recommendations
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Allow AI to propose vendors</div>
              </div>
              <button
                role="switch"
                aria-checked={aiRecs}
                onClick={() => setAiRecs(!aiRecs)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  aiRecs ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    aiRecs ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </label>
          </div>
        </section>
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
