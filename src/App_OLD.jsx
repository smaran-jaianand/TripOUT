import React, { useState, useMemo, useEffect, useCallback } from "react";
import "./App.css";
import { sanitize } from "./sanitize";
import {
  NAV_ITEMS,
  FOOTER_ITEMS,
  FILTER_CATEGORIES,
  VENDORS,
  QUOTES,
  METRICS,
  PLANS,
  EVENTS,
} from "./data";

/* ────────────────────────────────────────────────────────────
   Icon helper
   ──────────────────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────────────────
   Sidebar
   ──────────────────────────────────────────────────────────── */
function Sidebar({ activeTab, onTabChange, collapsed, onToggleCollapse }) {
  return (
    <nav className={`fixed left-0 top-0 h-screen border-r border-outline-variant dark:border-outline border-zinc-200 dark:border-zinc-800 bg-surface dark:bg-inverse-surface flex flex-col py-6 px-4 z-50 transition-all duration-300 ${
      collapsed ? "w-20" : "w-64"
    }`}>
      {/* Brand */}
      <div className={`mb-8 px-2 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
          <span className="text-sm font-bold">T</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-headline text-xl font-bold text-on-surface dark:text-inverse-on-surface tracking-tight leading-none truncate">
              TripOUT
            </h1>
            <p className="font-label text-xs text-on-surface-variant dark:text-on-surface-variant mt-1">
              AI Trip Planner
            </p>
          </div>
        )}
      </div>

      {/* New Event CTA */}
      <button
        className="mb-6 w-full py-2.5 px-4 bg-primary text-on-primary rounded font-label font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        onClick={() => alert("New Event flow coming soon!")}
        title="New Event"
      >
        <Icon name="add" className="text-sm" />
        {!collapsed && "New Event"}
      </button>

      {/* Main nav */}
      <ul className="flex flex-col gap-1 flex-1 font-label font-medium text-sm tracking-tight">
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded text-left transition-colors duration-200 ${
                  active
                    ? "text-primary dark:text-[#b1deb6] font-semibold bg-surface-container dark:bg-surface-container border-r-2 border-primary"
                    : "text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface hover:bg-surface-container dark:hover:bg-surface-container"
                }`}
                title={item.label}
              >
                <Icon name={item.icon} filled={active} className="text-[20px]" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer nav */}
      <div className="mt-auto pt-4 border-t border-outline-variant dark:border-outline">
        <ul className="flex flex-col gap-1 font-label font-medium text-sm tracking-tight">
          {FOOTER_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => alert(`${item.label} — coming soon!`)}
                className={`w-full flex ${collapsed ? "justify-center" : "items-center gap-3 px-3"} py-2 rounded text-left text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface hover:bg-surface-container dark:hover:bg-surface-container transition-colors duration-200`}
                title={item.label}
              >
                <Icon name={item.icon} className="text-[20px]" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="w-full mt-4 py-2 rounded flex items-center justify-center text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface hover:bg-surface-container dark:hover:bg-surface-container transition-colors"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <Icon name={collapsed ? "arrow_forward" : "arrow_back"} className="text-[20px]" />
        </button>
      </div>
    </nav>
  );
}

/* ────────────────────────────────────────────────────────────
   TopBar
   ──────────────────────────────────────────────────────────── */
function TopBar({ title, theme, onToggleTheme, sidebarCollapsed, selectedEvent, onClearEvent, searchResults, onSearch }) {
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    onSearch?.(value, { selectedEvent });
  };

  return (
    <header className={`fixed top-0 right-0 h-16 border-b border-outline-variant dark:border-outline bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-md flex justify-between items-center px-8 z-40 transition-all duration-300 ${
      sidebarCollapsed ? "left-20" : "left-64"
    }`}>
      <div className="flex items-center gap-4">
        {selectedEvent && (
          <button
            onClick={onClearEvent}
            className="text-primary dark:text-[#b1deb6] hover:opacity-75 transition-opacity"
            title="Back to Events"
          >
            <Icon name="arrow_back" className="text-[24px]" />
          </button>
        )}
        <div className="text-primary dark:text-[#b1deb6] font-headline font-semibold text-lg">
          {title}
        </div>
      </div>
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block w-64">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm"
          />
          <input
            className="w-full pl-9 pr-4 py-1.5 bg-surface-container dark:bg-surface-container border-none rounded-full text-sm font-label focus:ring-1 focus:ring-primary outline-none text-on-surface dark:text-on-surface placeholder:text-on-surface-variant"
            placeholder={`Search ${title.toLowerCase()}...`}
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4 text-on-surface-variant dark:text-on-surface-variant">
          <button
            onClick={onToggleTheme}
            className="hover:text-primary dark:hover:text-[#b1deb6] transition-all"
            title={theme === "light" ? "Switch to Night Mode" : "Switch to Day Mode"}
          >
            <Icon name={theme === "light" ? "dark_mode" : "light_mode"} />
          </button>
          <button
            className="hover:text-primary dark:hover:text-[#b1deb6] transition-all relative"
            onClick={() => alert("No new notifications")}
          >
            <Icon name="notifications" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full" />
          </button>
          <button
            className="hover:text-primary dark:hover:text-[#b1deb6] transition-all"
            onClick={() => alert("Profile settings")}
          >
            <Icon name="account_circle" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────────────────
   Events View
   ──────────────────────────────────────────────────────────── */
function EventsView({ onSelectEvent, searchQuery }) {
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

  const filtered = useMemo(() => {
    if (!searchQuery) return EVENTS;
    return EVENTS.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex-1 p-8 overflow-y-auto view-enter">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="font-headline text-4xl text-on-surface dark:text-zinc-50 mb-3">
            Your Events
          </h2>
          <p className="font-body text-on-surface-variant dark:text-zinc-400 text-lg max-w-2xl">
            Select an event to manage vendors, quotes, and workspace details.
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="event_note" className="text-6xl text-outline-variant/50 dark:text-zinc-800 mb-4 inline-block" />
            <p className="font-body text-on-surface-variant dark:text-zinc-400 text-lg">
              No events found matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((event) => (
              <div
                key={event.id}
                className="bg-surface-container-lowest dark:bg-zinc-900 rounded-xl border border-outline-variant dark:border-zinc-800 p-6 hover:border-primary/50 hover:shadow-md transition-all card-enter"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon name={event.icon} className="text-primary text-3xl" />
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface dark:text-zinc-50 mb-2">
                  {event.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant dark:text-zinc-400 mb-4">
                  {event.location}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm font-label">
                    <Icon name="calendar_month" className="text-primary" />
                    <span className="text-on-surface dark:text-zinc-300">
                      {event.date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-label">
                    <Icon name="schedule" className="text-secondary dark:text-[#b1deb6]" />
                    <span className="text-secondary dark:text-[#b1deb6] font-medium">
                      {formatCountdown(event.date)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onSelectEvent(event.id)}
                  className="w-full py-2.5 px-4 bg-primary text-on-primary rounded-lg font-label font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="arrow_forward" className="text-sm" />
                  Open Event
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Workspace View
   ──────────────────────────────────────────────────────────── */
function WorkspaceView() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "user",
      text: "I need two options for our Q3 executive retreat. Budget is $15k. We need focus time but also some light team building. Preferably within a 2-hour drive of the city. One option should be more nature-focused, the other more amenity-heavy.",
    },
    {
      role: "ai",
      text: "I've put together two distinct options for your Q3 executive retreat that fit the $15,000 budget for 25 people, both within a 2-hour drive.",
      plans: PLANS,
    },
  ]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSend = () => {
    const cleaned = sanitize(message.trim());
    if (!cleaned) return;
    setChatHistory((prev) => [...prev, { role: "user", text: cleaned }]);
    setMessage("");
    // Simulate AI response after short delay
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
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface dark:text-zinc-50 mb-3 tracking-tight">
          Corporate Retreat: Q3 Strategy
        </h2>
        <p className="font-body text-on-surface-variant dark:text-zinc-400 text-lg">
          Planning options for a 3-day executive offsite for 25 people.
        </p>
      </div>

      {/* Messages */}
      <div className="space-y-8 flex-1 pb-28">
        {chatHistory.map((msg, idx) =>
          msg.role === "user" ? (
            <div key={idx} className="flex justify-end">
              <div className="bg-surface-container dark:bg-zinc-900 px-5 py-4 rounded-2xl rounded-tr-sm max-w-2xl border border-outline-variant/30 dark:border-zinc-800">
                <p className="font-body text-on-surface dark:text-zinc-200 text-[15px] leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </div>
          ) : (
            <div key={idx} className="flex items-start gap-4 max-w-3xl">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1 border border-primary/20">
                <Icon name="psychiatry" className="text-sm" />
              </div>
              <div className="flex-1 space-y-6">
                <p className="font-body text-on-surface dark:text-zinc-200 text-[15px] leading-relaxed">
                  {msg.text}
                </p>
                {/* Plan cards - Dynamic layout */}
                {msg.plans && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
                    {msg.plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`bg-surface-container-lowest dark:bg-zinc-900 rounded-xl border p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all relative overflow-hidden group card-enter ${
                          selectedPlan === plan.id
                            ? "border-primary ring-2 ring-primary/20 lg:col-span-2"
                            : "border-outline-variant dark:border-zinc-800"
                        }`}
                      >
                        <div className={`absolute top-0 left-0 w-full h-1.5 bg-${plan.accent}`} />
                        <div className="flex justify-between items-start gap-4 mb-4">
                          <div className="flex-1">
                            <span
                              className={`inline-block px-2.5 py-0.5 bg-${plan.accent}/10 text-${plan.accent} font-label font-bold text-[10px] rounded uppercase tracking-widest mb-3`}
                            >
                              {plan.label}
                            </span>
                            <h3 className="font-headline text-lg font-bold text-on-surface dark:text-zinc-50">
                              {plan.name}
                            </h3>
                          </div>
                          <Icon name={plan.icon} className={`text-${plan.accent} text-4xl shrink-0`} />
                        </div>
                        <p className="font-body text-sm text-on-surface-variant dark:text-zinc-400 mb-4 leading-relaxed line-clamp-2">
                          {plan.description}
                        </p>
                        <ul className="space-y-2 mb-6 font-label text-xs text-on-surface dark:text-zinc-300">
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
                              ? "bg-primary text-on-primary shadow-md"
                              : `bg-surface dark:bg-zinc-800 text-${plan.accent} border border-${plan.accent}/30 dark:border-zinc-700 hover:bg-${plan.accent}/5`
                          }`}
                        >
                          {selectedPlan === plan.id ? "✓ Selected" : "View Details"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {/* Action buttons */}
                {msg.plans && (
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => alert("Sharing options...")}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary-container text-on-primary-container rounded-full font-label text-sm font-medium hover:bg-primary hover:text-on-primary transition-colors shadow-sm"
                    >
                      <Icon name="ios_share" className="text-[18px]" />
                      Share Trip Options
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(msg.text);
                        alert("Copied to clipboard!");
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 text-on-surface-variant dark:text-zinc-400 hover:text-primary rounded-full font-label text-sm transition-colors hover:bg-surface-container dark:hover:bg-zinc-800"
                    >
                      <Icon name="content_copy" className="text-[18px]" />
                      Copy
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 right-0 left-64 p-6 bg-gradient-to-t from-background dark:from-zinc-950 via-background/90 dark:via-zinc-950/90 to-transparent transition-all duration-300" style={{left: 'var(--sidebar-width)'}}>
        <div className="max-w-3xl mx-auto relative group">
          <textarea
            className="w-full bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant dark:border-zinc-800 rounded-2xl pl-5 pr-14 py-4 font-body text-on-surface dark:text-zinc-50 placeholder:text-on-surface-variant/60 dark:placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none shadow-sm group-hover:shadow-md transition-shadow"
            placeholder="Refine options or ask for vendor details..."
            rows="1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-on-primary rounded-xl flex items-center justify-center hover:bg-surface-tint transition-colors disabled:opacity-40"
          >
            <Icon name="arrow_upward" />
          </button>
        </div>
        <p className="text-center mt-2 font-label text-[10px] text-on-surface-variant/60 dark:text-zinc-500 uppercase tracking-widest">
          TripOUT AI may produce inaccurate information.
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Vendors View
   ──────────────────────────────────────────────────────────── */
function VendorsView({ searchQuery }) {
  const [activeFilter, setActiveFilter] = useState("All Categories");
  const filtered = useMemo(() => {
    let results = VENDORS;
    
    if (activeFilter !== "All Categories") {
      results = results.filter(
        (v) => v.category.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }
    
    if (searchQuery) {
      results = results.filter(
        (v) => v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               v.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return results;
  }, [activeFilter, searchQuery]);

  return (
    <div className="flex-1 pt-8 px-8 pb-12 overflow-y-auto max-w-7xl mx-auto w-full view-enter">
      <div className="mb-10">
        <h2 className="font-headline text-4xl text-on-surface dark:text-zinc-50 mb-3">
          Curated Partners
        </h2>
        <p className="font-body text-on-surface-variant dark:text-zinc-400 text-lg max-w-2xl">
          Discover hand-selected professionals dedicated to crafting
          exceptional, refined experiences tailored to your vision.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8 font-label text-sm">
        {FILTER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
              activeFilter === cat
                ? "bg-primary-container text-on-primary-container border border-transparent"
                : "bg-surface-container dark:bg-zinc-900 hover:bg-surface-container-high dark:hover:bg-zinc-800 text-on-surface dark:text-zinc-300 border border-outline-variant dark:border-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((vendor) => (
          <article
            key={vendor.id}
            className={`${
              vendor.featured
                ? "col-span-1 md:col-span-2 lg:col-span-2 flex-col md:flex-row"
                : "flex-col"
            } group flex rounded-xl border border-outline-variant dark:border-zinc-800 bg-surface dark:bg-zinc-900 overflow-hidden hover:border-primary/30 transition-colors card-enter`}
          >
            <div
              className={`${
                vendor.featured ? "md:w-1/2 h-64 md:h-auto" : "h-48"
              } bg-surface-container-high dark:bg-zinc-800 relative overflow-hidden`}
            >
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-surface/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Icon name="star" filled className="text-[14px] text-primary" />
                <span className="font-label font-bold text-sm text-on-surface dark:text-zinc-50">
                  {vendor.rating}
                </span>
              </div>
            </div>
            <div
              className={`p-6 ${vendor.featured ? "md:w-1/2" : ""} flex flex-col`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-label text-xs tracking-wider text-secondary dark:text-[#b1deb6] uppercase font-semibold">
                  {vendor.category}
                </span>
                <span className="font-label text-sm text-on-surface-variant dark:text-zinc-400 font-medium">
                  {vendor.priceRange}
                </span>
              </div>
              <h3 className="font-headline text-2xl text-on-surface dark:text-zinc-50 mb-2">
                {vendor.name}
              </h3>
              <p className="font-body text-on-surface-variant dark:text-zinc-400 text-sm mb-6 flex-1">
                {vendor.description}
              </p>
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => alert(`Contacting ${vendor.name}...`)}
                  className="flex-1 py-2 px-4 rounded bg-primary text-on-primary font-label text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="mail" className="text-[18px]" />
                  Contact
                </button>
                <button
                  onClick={() => alert(`Calling ${vendor.name}...`)}
                  className="py-2 px-4 rounded border border-outline dark:border-zinc-700 text-on-surface dark:text-zinc-300 font-label text-sm font-medium hover:bg-surface-container dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="call" className="text-[18px]" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Quotes View
   ──────────────────────────────────────────────────────────── */
function QuotesView() {
  const statusStyle = (status) => {
    switch (status) {
      case "Quote Received":
        return "bg-secondary-container text-on-secondary-container border border-secondary-fixed";
      case "Pending Review":
        return "bg-surface-container dark:bg-zinc-800 text-on-surface-variant dark:text-zinc-400 border border-outline-variant dark:border-zinc-700";
      default:
        return "bg-error-container text-on-error-container border border-error/20";
    }
  };
  const dotStyle = (status) => {
    switch (status) {
      case "Quote Received": return "bg-primary";
      case "Pending Review":  return "bg-outline";
      default:                return "bg-error";
    }
  };

  return (
    <div className="flex-1 p-8 lg:p-12 overflow-y-auto view-enter">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h2 className="font-headline text-3xl text-on-surface dark:text-zinc-50 mb-2">
            Quote Analysis
          </h2>
          <p className="font-body text-on-surface-variant dark:text-zinc-400 text-base max-w-2xl">
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
                  ? "bg-primary-container border border-transparent"
                  : "bg-surface-container-lowest dark:bg-zinc-900 border border-outline-variant dark:border-zinc-800"
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
              <div
                className={`flex items-center gap-2 mb-4 relative z-10 ${
                  m.highlight
                    ? "text-on-primary-container"
                    : "text-on-surface-variant dark:text-zinc-400"
                }`}
              >
                <Icon name={m.icon} className="text-[18px]" />
                <span className="font-label text-sm font-medium tracking-wide">
                  {m.label}
                </span>
              </div>
              <div className="relative z-10">
                <span
                  className={`font-headline text-4xl block mb-1 ${
                    m.highlight
                      ? "text-on-primary-container"
                      : "text-on-surface dark:text-zinc-50"
                  }`}
                >
                  {m.value}
                </span>
                <span
                  className={`font-label text-xs flex items-center gap-1 ${
                    m.highlight
                      ? "text-on-primary-container opacity-80"
                      : "text-secondary dark:text-[#b1deb6]"
                  }`}
                >
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
        <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-lg border border-outline-variant dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-outline-variant dark:border-zinc-800 flex justify-between items-center bg-surface-container-low dark:bg-zinc-900/50">
            <h3 className="font-label text-base font-semibold text-on-surface dark:text-zinc-50">
              Vendor Comparisons
            </h3>
            <button
              onClick={() => alert("Filter panel coming soon")}
              className="font-label text-sm text-primary dark:text-[#b1deb6] hover:text-surface-tint font-medium flex items-center gap-1 transition-colors"
            >
              <Icon name="filter_list" className="text-[18px]" />
              Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest dark:bg-zinc-900 border-b border-outline-variant dark:border-zinc-800">
                  {["Vendor Details", "Status", "Total Price", "Key Inclusions", ""].map(
                    (h, i) => (
                      <th
                        key={i}
                        className={`py-4 px-6 font-label text-xs font-semibold text-on-surface-variant dark:text-zinc-500 uppercase tracking-wider ${
                          i === 4 ? "text-right" : ""
                        }`}
                      >
                        {h || "Actions"}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="font-body text-sm divide-y divide-outline-variant/50 dark:divide-zinc-800">
                {QUOTES.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-surface-container-low dark:hover:bg-zinc-800/50 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-medium text-on-surface dark:text-zinc-100 group-hover:text-primary dark:group-hover:text-[#b1deb6] transition-colors">
                          {q.vendor}
                        </span>
                        <span className="text-xs text-on-surface-variant dark:text-zinc-500 font-label mt-0.5">
                          {q.category} • {q.location}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-label font-medium ${statusStyle(
                          q.status
                        )}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${dotStyle(q.status)}`} />
                        {q.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {q.price ? (
                        <span className="font-headline text-lg text-on-surface dark:text-zinc-100">
                          ${q.price.toLocaleString()}
                        </span>
                      ) : (
                        <span className="font-headline text-lg text-on-surface-variant dark:text-zinc-500 italic">
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
                              className="px-2 py-0.5 rounded text-xs font-label bg-surface dark:bg-zinc-800 text-on-surface-variant dark:text-zinc-400 border border-outline-variant dark:border-zinc-700"
                            >
                              {inc}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-on-surface-variant dark:text-zinc-500 italic">
                            Details requested...
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => alert(`Viewing details for ${q.vendor}`)}
                        className="text-on-surface-variant dark:text-zinc-500 hover:text-primary dark:hover:text-[#b1deb6] transition-colors p-1"
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

/* ────────────────────────────────────────────────────────────
   Settings View
   ──────────────────────────────────────────────────────────── */
function SettingsView() {
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex@verdant.ai");
  const [notifications, setNotifications] = useState(true);
  const [aiRecs, setAiRecs] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 p-8 lg:p-12 max-w-3xl mx-auto w-full view-enter">
      <h2 className="font-headline text-3xl text-on-surface dark:text-zinc-50 mb-8">
        Settings
      </h2>
      <div className="space-y-6">
        {/* Profile */}
        <section className="bg-surface-container-low dark:bg-zinc-900 rounded-xl p-6 border border-outline-variant dark:border-zinc-800 shadow-sm">
          <h3 className="font-label font-bold text-on-surface dark:text-zinc-100 mb-4">
            Profile Information
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="font-label text-xs text-on-surface-variant dark:text-zinc-500 uppercase tracking-wider font-bold">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container dark:bg-zinc-800 border border-outline-variant dark:border-zinc-700 rounded p-2 text-sm text-on-surface dark:text-zinc-50 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="font-label text-xs text-on-surface-variant dark:text-zinc-500 uppercase tracking-wider font-bold">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container dark:bg-zinc-800 border border-outline-variant dark:border-zinc-700 rounded p-2 text-sm text-on-surface dark:text-zinc-50 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-surface-container-low dark:bg-zinc-900 rounded-xl p-6 border border-outline-variant dark:border-zinc-800 shadow-sm">
          <h3 className="font-label font-bold text-on-surface dark:text-zinc-100 mb-4">
            Application Preferences
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-body text-sm text-on-surface dark:text-zinc-300">
                Email Notifications
              </span>
              <button
                role="switch"
                aria-checked={notifications}
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  notifications ? "bg-primary" : "bg-outline-variant dark:bg-zinc-700"
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
              <span className="font-body text-sm text-on-surface dark:text-zinc-300">
                AI Smart Recommendations
              </span>
              <button
                role="switch"
                aria-checked={aiRecs}
                onClick={() => setAiRecs(!aiRecs)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  aiRecs ? "bg-primary" : "bg-outline-variant dark:bg-zinc-700"
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

        <button
          onClick={handleSave}
          className="w-full bg-primary text-on-primary py-3 rounded-lg font-label font-bold tracking-wide hover:bg-surface-tint transition-colors active:scale-[0.98]"
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   App Shell
   ──────────────────────────────────────────────────────────── */
export default function App() {
  const [activeTab, setActiveTab] = useState("workspace");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggle } = useTheme();

  const view = useMemo(() => {
    // Show events view if no event is selected
    if (!selectedEvent) {
      return <EventsView onSelectEvent={setSelectedEvent} searchQuery={searchQuery} />;
    }

    // Show selected tab's view if event is selected
    switch (activeTab) {
      case "workspace": return <WorkspaceView />;
      case "vendors":   return <VendorsView searchQuery={searchQuery} />;
      case "quotes":    return <QuotesView />;
      case "settings":  return <SettingsView />;
      default:          return <WorkspaceView />;
    }
  }, [activeTab, selectedEvent, searchQuery]);

  const title =
    NAV_ITEMS.find((i) => i.id === activeTab)?.label ?? "Workspace";

  return (
    <div className="bg-background dark:bg-inverse-surface text-on-background dark:text-inverse-on-surface font-body antialiased min-h-screen flex">
      <style>{`:root { --sidebar-width: ${sidebarCollapsed ? '5rem' : '16rem'}; }`}</style>
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? "ml-20" : "ml-64"
      }`}>
        <TopBar 
          title={selectedEvent ? title : "Events"} 
          theme={theme} 
          onToggleTheme={toggle}
          sidebarCollapsed={sidebarCollapsed}
          selectedEvent={selectedEvent}
          onClearEvent={() => setSelectedEvent(null)}
          onSearch={(query) => setSearchQuery(query)}
        />
        <div className="mt-16 flex-1 flex flex-col overflow-hidden">
          {view}
        </div>
      </main>
    </div>
  );
}
