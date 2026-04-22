import React, { useState, useMemo, useEffect } from "react";
import { FILTER_CATEGORIES } from "../data";

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

export default function VendorsView({ searchQuery }) {
  const [activeFilter, setActiveFilter] = useState("All Categories");
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      setIsLoading(true);
      try {
        const query = searchQuery 
          ? `event vendors ${searchQuery}`
          : activeFilter !== "All Categories" 
            ? `event vendors ${activeFilter}` 
            : "event vendors";
            
        const res = await fetch(`http://localhost:8000/api/vendors?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setVendors(data.vendors || []);
      } catch (err) {
        console.error("Failed to fetch vendors", err);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchVendors, searchQuery ? 500 : 0);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeFilter]);

  const filtered = useMemo(() => {
    let results = vendors;
    
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
  }, [activeFilter, searchQuery, vendors]);

  return (
    <div className="flex-1 pt-8 px-8 pb-12 overflow-y-auto max-w-7xl mx-auto w-full view-enter">
      <div className="mb-10">
        <h2 className="font-headline text-4xl text-gray-900 mb-3 dark:text-white">
          Curated Partners
        </h2>
        <p className="font-body text-gray-600 text-lg max-w-2xl dark:text-gray-400">
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
                ? "bg-primary text-white border border-transparent"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((vendor) => (
          <article
            key={vendor.id}
            className={`${
              vendor.featured
                ? "col-span-1 md:col-span-2 lg:col-span-2 flex-col md:flex-row"
                : "flex-col"
            } group flex rounded-xl border border-gray-200 bg-white overflow-hidden hover:border-primary/30 transition-colors card-enter dark:bg-gray-800 dark:border-gray-700`}
          >
            <div
              className={`${
                vendor.featured ? "md:w-1/2 h-64 md:h-auto" : "h-48"
              } bg-gray-200 relative overflow-hidden`}
            >
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Icon name="star" filled className="text-[14px] text-primary" />
                <span className="font-label font-bold text-sm text-gray-900">
                  {vendor.rating}
                </span>
              </div>
            </div>
            <div className={`p-6 ${vendor.featured ? "md:w-1/2" : ""} flex flex-col`}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-label text-xs tracking-wider text-primary uppercase font-semibold">
                  {vendor.category}
                </span>
                <span className="font-label text-sm text-gray-600 font-medium dark:text-gray-400">
                  {vendor.priceRange}
                </span>
              </div>
              <h3 className="font-headline text-2xl text-gray-900 mb-2 dark:text-white">
                {vendor.name}
              </h3>
              <p className="font-body text-gray-600 text-sm mb-6 flex-1 dark:text-gray-400">
                {vendor.description}
              </p>
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => alert(`Contacting ${vendor.name}...`)}
                  className="flex-1 py-2 px-4 rounded bg-primary text-white font-label text-sm font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2"
                >
                  <Icon name="mail" className="text-[18px]" />
                  Contact
                </button>
                <button
                  onClick={() => alert(`Calling ${vendor.name}...`)}
                  className="py-2 px-4 rounded border border-gray-300 text-gray-900 font-label text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  <Icon name="call" className="text-[18px]" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      )}
    </div>
  );
}
