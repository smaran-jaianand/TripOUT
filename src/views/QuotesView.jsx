import React from "react";
import { QUOTES, METRICS } from "../data";

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

export default function QuotesView() {
  const statusStyle = (status) => {
    switch (status) {
      case "Quote Received":
        return "bg-green-100 text-green-900 border border-green-300";
      case "Pending Review":
        return "bg-gray-100 text-gray-900 border border-gray-300";
      default:
        return "bg-red-100 text-red-900 border border-red-300";
    }
  };
  const dotStyle = (status) => {
    switch (status) {
      case "Quote Received": return "bg-green-600";
      case "Pending Review":  return "bg-gray-400";
      default:                return "bg-red-600";
    }
  };

  return (
    <div className="flex-1 p-8 lg:p-12 overflow-y-auto view-enter">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h2 className="font-headline text-3xl text-gray-900 mb-2 dark:text-white">
            Quote Analysis
          </h2>
          <p className="font-body text-gray-600 text-base max-w-2xl dark:text-gray-400">
            A comprehensive overview of pending and received vendor estimates
            for your upcoming events.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m, i) => (
            <div
              key={i}
              className={`rounded-lg p-6 shadow-sm flex flex-col justify-between relative overflow-hidden ${
                m.highlight
                  ? "bg-primary text-white border border-transparent"
                  : "bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              }`}
            >
              {m.highlight && (
                <div className="absolute -right-4 -top-4 opacity-10">
                  <Icon
                    name="pending_actions"
                    filled
                    className="text-[120px]"
                  />
                </div>
              )}
              <div className={`flex items-center gap-2 mb-4 relative z-10 ${
                m.highlight
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-400"
              }`}>
                <Icon name={m.icon} className="text-[18px]" />
                <span className="font-label text-sm font-medium tracking-wide">
                  {m.label}
                </span>
              </div>
              <div className="relative z-10">
                <span className={`font-headline text-4xl block mb-1 ${
                  m.highlight ? "text-white" : "text-gray-900 dark:text-white"
                }`}>
                  {m.value}
                </span>
                <span className={`font-label text-xs flex items-center gap-1 ${
                  m.highlight ? "text-white opacity-80" : "text-primary"
                }`}>
                  {m.direction && (
                    <Icon
                      name={m.direction === "up" ? "arrow_upward" : "arrow_downward"}
                      className="text-[14px]"
                    />
                  )}
                  {m.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-100 dark:bg-gray-700 dark:border-gray-700">
            <h3 className="font-label text-base font-semibold text-gray-900 dark:text-white">
              Vendor Comparisons
            </h3>
            <button
              onClick={() => alert("Filter panel coming soon")}
              className="font-label text-sm text-primary hover:opacity-75 font-medium flex items-center gap-1 transition-colors"
            >
              <Icon name="filter_list" className="text-[18px]" />
              Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-700">
                  {["Vendor Details", "Status", "Total Price", "Key Inclusions", ""].map(
                    (h, i) => (
                      <th
                        key={i}
                        className={`py-4 px-6 font-label text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-400 ${
                          i === 4 ? "text-right" : ""
                        }`}
                      >
                        {h || "Actions"}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="font-body text-sm divide-y divide-gray-200 dark:divide-gray-700">
                {QUOTES.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-gray-100 transition-colors group dark:hover:bg-gray-700"
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 group-hover:text-primary transition-colors dark:text-white">
                          {q.vendor}
                        </span>
                        <span className="text-xs text-gray-600 font-label mt-0.5 dark:text-gray-400">
                          {q.category} • {q.location}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-label font-medium ${statusStyle(q.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dotStyle(q.status)}`} />
                        {q.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {q.price ? (
                        <span className="font-headline text-lg text-gray-900 dark:text-white">
                          ₹{q.price.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="font-headline text-lg text-gray-400 italic dark:text-gray-500">
                          TBD
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-2">
                        {q.inclusions.length > 0 ? (
                          q.inclusions.map((inc, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded text-xs font-label bg-white text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            >
                              {inc}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-400 italic">
                            Details requested...
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => alert(`Viewing details for ${q.vendor}`)}
                        className="text-gray-600 hover:text-primary transition-colors p-1"
                        title="View Details"
                      >
                        <Icon name="chevron_right" className="text-[20px]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
