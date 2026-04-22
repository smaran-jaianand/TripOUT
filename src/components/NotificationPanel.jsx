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

export default function NotificationPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div className="fixed top-20 right-8 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 dark:bg-gray-900 dark:border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Icon name="notifications_active" className="text-primary text-[20px]" />
            <h3 className="font-headline font-bold text-gray-900 dark:text-white">
              Notifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-gray-100"
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icon name="inbox" className="text-gray-300 text-4xl mb-3 dark:text-gray-600" />
            <p className="font-body text-sm text-gray-600 dark:text-gray-400">
              No notifications yet
            </p>
            <p className="font-label text-xs text-gray-500 mt-1 dark:text-gray-500">
              Updates will appear here
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
