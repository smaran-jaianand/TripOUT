import React, { useState } from "react";
import { sanitize } from "../sanitize";
import { PLANS } from "../data";

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

export default function WorkspaceView({ event }) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "user",
      text: `I need two options for our ${event?.title || "event"}. Budget is around $15k. We need focus time but also some light team building. Preferably within a 2-hour drive of the city. One option should be more nature-focused, the other more amenity-heavy.`,
    },
    {
      role: "ai",
      text: `I've put together two distinct options for your ${event?.title || "event"} that fit the parameters you mentioned.`,
      plans: PLANS,
    },
  ]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSend = () => {
    const cleaned = sanitize(message.trim());
    if (!cleaned) return;
    setChatHistory((prev) => [...prev, { role: "user", text: cleaned }]);
    setMessage("");
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Thanks for the additional details! I'll refine the options based on: "${cleaned}". Give me a moment to update the proposals.`,
        },
      ]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto flex flex-col max-w-4xl mx-auto w-full view-enter">
      {/* Thread header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight dark:text-white">
          {event ? event.title : "Corporate Retreat: Q3 Strategy"}
        </h2>
        <p className="font-body text-gray-600 text-lg dark:text-gray-400">
          Planning options for {event ? event.location : "a 3-day executive offsite"}.
        </p>
      </div>

      {/* Messages */}
      <div className="space-y-8 flex-1 pb-28">
        {chatHistory.map((msg, idx) =>
          msg.role === "user" ? (
            <div key={idx} className="flex justify-end">
              <div className="bg-gray-100 px-5 py-4 rounded-2xl rounded-tr-sm max-w-2xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <p className="font-body text-gray-900 text-[15px] leading-relaxed dark:text-gray-100">
                  {msg.text}
                </p>
              </div>
            </div>
          ) : (
            <div key={idx} className="flex items-start gap-4 max-w-3xl">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1 border border-primary/20 dark:bg-primary/20">
                <Icon name="psychiatry" className="text-sm" />
              </div>
              <div className="flex-1 space-y-6">
                <p className="font-body text-gray-900 text-[15px] leading-relaxed dark:text-gray-100">
                  {msg.text}
                </p>
                {/* Plan cards - Dynamic layout */}
                {msg.plans && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
                    {msg.plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`bg-gray-50 rounded-xl border p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all relative overflow-hidden group card-enter dark:bg-gray-800 dark:border-gray-700 ${
                          selectedPlan === plan.id
                            ? "border-primary ring-2 ring-primary/20 lg:col-span-2"
                            : "border-gray-200"
                        }`}
                      >
                        <div className={`absolute top-0 left-0 w-full h-1.5 bg-primary`} />
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div className="flex-1">
                            <span className={`inline-block px-2.5 py-0.5 bg-primary/10 text-primary font-label font-bold text-[10px] rounded uppercase tracking-widest mb-3`}>
                              {plan.label}
                            </span>
                            <h3 className="font-headline text-lg font-bold text-gray-900 dark:text-white">
                              {plan.name}
                            </h3>
                          </div>
                          <Icon name={plan.icon} className={`text-primary text-4xl shrink-0`} />
                        </div>
                        <p className="font-body text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2 dark:text-gray-400">
                          {plan.description}
                        </p>
                        <ul className="space-y-2 mb-6 font-label text-xs text-gray-900 dark:text-gray-200">
                          {plan.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Icon name="check_circle" className="text-primary text-[16px] mt-0.5 shrink-0" />
                              <span className="line-clamp-1">{f}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => {
                            setSelectedPlan(plan.id);
                            alert(`Selected: ${plan.name}`);
                          }}
                          className={`w-full py-2.5 px-3 rounded-lg font-label text-sm font-semibold transition-all ${
                            selectedPlan === plan.id
                              ? "bg-primary text-white shadow-md"
                              : `bg-white text-primary border border-primary/30 hover:bg-primary/5 dark:bg-gray-700 dark:text-primary dark:border-primary/50 dark:hover:bg-gray-600`
                          }`}
                        >
                          {selectedPlan === plan.id ? "✓ Selected" : "View Details"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 right-0 left-64 p-6 bg-gradient-to-t from-white via-white/90 to-transparent transition-all duration-300 dark:from-gray-950 dark:via-gray-950/90" style={{left: 'var(--sidebar-width)'}}>
        <div className="max-w-3xl mx-auto relative group">
          <textarea
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-5 pr-14 py-4 font-body text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none shadow-sm group-hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-500"
            placeholder="Refine options or ask for vendor details..."
            rows="1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Icon name="arrow_upward" />
          </button>
        </div>
        <p className="text-center mt-2 font-label text-[10px] text-gray-500 uppercase tracking-widest dark:text-gray-500">
          TripOUT AI may produce inaccurate information.
        </p>
      </div>
    </div>
  );
}
