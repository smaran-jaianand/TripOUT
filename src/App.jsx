import React, { useState, useMemo } from "react";
import "./App.css";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { NAV_ITEMS, FOOTER_ITEMS, EVENTS } from "./data";
import EventsView from "./views/EventsView";
import WorkspaceView from "./views/WorkspaceView";
import VendorsView from "./views/VendorsView";
import QuotesView from "./views/QuotesView";
import SettingsView from "./views/SettingsView";
import AppSettingsView from "./views/AppSettingsView";
import NewEventModal from "./components/NewEventModal";
import AIAssistant from "./components/AIAssistant";

/* Icon helper */
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

/* Sidebar */
function Sidebar({ activeTab, onTabChange, collapsed, onToggleCollapse, selectedEvent, onNewEvent }) {
  return (
    <nav className={`fixed left-0 top-0 h-screen border-r border-gray-200 bg-white flex flex-col py-6 px-4 z-50 transition-all duration-300 ${
      collapsed ? "w-20" : "w-64"
    } dark:bg-gray-900 dark:border-gray-800`}>
      {/* Brand */}
      <div className={`mb-8 px-2 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
          <span className="text-sm font-bold">T</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-headline text-xl font-bold text-gray-900 tracking-tight leading-none truncate dark:text-white">
              TripOUT
            </h1>
            <p className="font-label text-xs text-gray-600 mt-1 dark:text-gray-400">
              AI Trip Planner
            </p>
          </div>
        )}
      </div>

      {/* New Event CTA */}
      <button
        className="mb-6 w-full py-2.5 px-4 bg-primary text-white rounded font-label font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        onClick={onNewEvent}
        title="New Event"
      >
        <Icon name="add" className="text-sm" />
        {!collapsed && "New Event"}
      </button>

      {/* Main nav */}
      <ul className="flex flex-col gap-1 flex-1 font-label font-medium text-sm tracking-tight">
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.id;
          const isDisabled = !selectedEvent;
          return (
            <li key={item.id}>
              <button
                onClick={() => !isDisabled && onTabChange(item.id)}
                disabled={isDisabled}
                className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3 px-3"} py-2.5 rounded text-left transition-colors duration-200 ${
                  isDisabled
                    ? "text-gray-300 cursor-not-allowed dark:text-gray-600"
                    : active
                    ? "text-primary font-semibold bg-gray-100 border-r-2 border-primary dark:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
                }`}
                title={isDisabled ? `Select an event first to access ${item.label}` : item.label}
              >
                <Icon name={item.icon} filled={active} className="text-[20px]" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer nav */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <ul className="flex flex-col gap-1 font-label font-medium text-sm tracking-tight">
          {FOOTER_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => alert(`${item.label} — coming soon!`)}
                className={`w-full flex ${collapsed ? "justify-center" : "items-center gap-3 px-3"} py-2 rounded text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800`}
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
          className="w-full mt-4 py-2 rounded flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <Icon name={collapsed ? "arrow_forward" : "arrow_back"} className="text-[20px]" />
        </button>
      </div>
    </nav>
  );
}

/* TopBar */
function TopBar({ title, sidebarCollapsed, selectedEvent, onClearEvent, onSearch, onOpenAppSettings }) {
  const [search, setSearch] = useState("");
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSearch = (value) => {
    setSearch(value);
    onSearch?.(value);
  };

  return (
    <header className={`fixed top-0 right-0 h-16 border-b border-gray-200 bg-white flex justify-between items-center px-8 z-40 transition-all duration-300 ${
      sidebarCollapsed ? "left-20" : "left-64"
    } dark:bg-gray-950 dark:border-gray-800`}>
      <div className="flex items-center gap-4">
        {(selectedEvent || title === "App Settings") && (
          <button
            onClick={onClearEvent}
            className="text-primary hover:opacity-75 transition-opacity"
            title="Back"
          >
            <Icon name="arrow_back" className="text-[24px]" />
          </button>
        )}
        <div className="text-primary font-headline font-semibold text-lg">
          {title}
        </div>
      </div>
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block w-64">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
          />
          <input
            className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border-none rounded-full text-sm font-label focus:ring-1 focus:ring-primary outline-none text-gray-900 placeholder:text-gray-400 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500"
            placeholder={`Search ${title.toLowerCase()}...`}
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="hover:text-primary transition-all"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <Icon name={isDark ? "light_mode" : "dark_mode"} />
          </button>
          
          <div className="relative">
            <button
              className="hover:text-primary transition-all relative"
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              title="Notifications"
            >
              <Icon name="notifications" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 font-label font-bold text-gray-900 dark:text-white">
                  Notifications
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">New quote received</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lumina Catering Co. sent a quote</div>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Welcome to TripOUT</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Setup your profile and app settings</div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="hover:text-primary transition-all"
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              title="Profile"
            >
              <Icon name="account_circle" />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Alex Rivera</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">alex@tripout.ai</div>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { onOpenAppSettings(); setShowProfile(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Icon name="settings" className="!text-[18px]" /> App Settings
                  </button>
                  <button 
                    onClick={() => setShowProfile(false)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center gap-2"
                  >
                    <Icon name="logout" className="!text-[18px]" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* App Shell */
function AppContent() {
  const [activeTab, setActiveTab] = useState("workspace");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [events, setEvents] = useState(EVENTS);

  const handleCreateEvent = (eventData) => {
    const newEvent = {
      id: Math.max(...events.map(e => e.id), 0) + 1,
      ...eventData,
    };
    setEvents([...events, newEvent]);
    setShowNewEventModal(false);
  };

  const view = useMemo(() => {
    // Show app settings even if no event is selected
    if (activeTab === "app-settings") {
      return <AppSettingsView />;
    }

    // Show events view if no event is selected
    if (!selectedEvent) {
      return <EventsView onSelectEvent={setSelectedEvent} searchQuery={searchQuery} events={events} onNewEvent={() => setShowNewEventModal(true)} />;
    }

    const eventDetails = events.find(e => e.id === selectedEvent);

    // Show selected tab's view if event is selected
    switch (activeTab) {
      case "workspace": return <WorkspaceView key={selectedEvent} event={eventDetails} />;
      case "vendors":   return <VendorsView searchQuery={searchQuery} />;
      case "quotes":    return <QuotesView />;
      case "settings":  return <SettingsView key={selectedEvent} event={eventDetails} />;
      default:          return <WorkspaceView key={selectedEvent} event={eventDetails} />;
    }
  }, [activeTab, selectedEvent, searchQuery, events]);

  const title =
    activeTab === "app-settings" 
      ? "App Settings" 
      : (NAV_ITEMS.find((i) => i.id === activeTab)?.label ?? "Workspace");

  return (
    <div className="bg-white text-gray-900 font-body antialiased min-h-screen flex dark:bg-gray-950 dark:text-gray-100">
      <style>{`:root { --sidebar-width: ${sidebarCollapsed ? '5rem' : '16rem'}; }`}</style>
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        selectedEvent={selectedEvent}
        onNewEvent={() => setShowNewEventModal(true)}
      />
      <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? "ml-20" : "ml-64"
      }`}>
        <TopBar 
          title={(selectedEvent || activeTab === "app-settings") ? title : "Events"} 
          sidebarCollapsed={sidebarCollapsed}
          selectedEvent={selectedEvent}
          onClearEvent={activeTab === "app-settings" ? () => setActiveTab(selectedEvent ? "workspace" : "") : () => setSelectedEvent(null)}
          onSearch={(query) => setSearchQuery(query)}
          onOpenAppSettings={() => setActiveTab("app-settings")}
        />
        <div className="mt-16 flex-1 flex flex-col overflow-hidden">
          {view}
        </div>
      </main>
      <NewEventModal 
        isOpen={showNewEventModal}
        onClose={() => setShowNewEventModal(false)}
        onCreateEvent={handleCreateEvent}
      />
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
