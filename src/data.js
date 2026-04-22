/*
 *  src/data.js
 *  All application data lives here so views stay clean.
 */

export const NAV_ITEMS = [
  { id: "workspace", label: "Workspace", icon: "edit_note" },
  { id: "vendors",   label: "Vendors",   icon: "storefront" },
  { id: "quotes",    label: "Quotes",    icon: "request_quote" },
  { id: "settings",  label: "Settings",  icon: "settings" },
];

export const FOOTER_ITEMS = [
  { id: "help",    label: "Help",    icon: "help_outline" },
  { id: "archive", label: "Archive", icon: "archive" },
];

export const FILTER_CATEGORIES = [
  "All Categories",
  "Venues",
  "Catering",
  "Florals",
  "Photography",
];

export const VENDORS = [
  {
    id: 1,
    name: "The Conservatory Gardens",
    description:
      "An exquisite garden venue surrounded by lush landscaping. Offers a serene, light-filled atmosphere perfect for elegant afternoon ceremonies and starlit evening receptions.",
    rating: 4.9,
    priceRange: "₹15,00,000+",
    category: "Premium Venue",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBT8VGXEqu0QT1Pt-Q0VRsCuIV3Bs4sM1xjKd0BHNnVx_A0wPdBNzaZkL-U93Azl7NE5g8YtNTj_nEN5jEzSl6dEeO1_i-RCnFFamiIrmFZBDtSxMIwZeLrnhvHKNg7qen9LzZV71eNUwI-M0ybTvYyaI6T0wMX3OqNj9jn9mXIB4ff_xC5jtgRH901CYXvn2UcqcfsU3OnFmakewhDldkXnGySQ_tj0ElbZ5y7DLL00VQLBA-iXh8EUDg1hwN60PKdFlQVYuE3To",
    featured: true,
  },
  {
    id: 2,
    name: "Artisan Hearth",
    description:
      "Farm-to-table culinary experiences focusing on seasonal, locally sourced Indian ingredients with elegant plating.",
    rating: 4.8,
    priceRange: "₹8,00,000 - ₹12,00,000",
    category: "Catering",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ8-0nV7uouzOKB71SXm_dX4sZcKkRUnflteBF4-040ODiFEK5sDBUZTnAy0qk8z0_v1JTLIczNcngCeCPO4x7CoZ5apPgV0bMk2DxvbmrMqwrZday7P71gIKoe_dfXLpg0uS-Fk15Rb5qtH19WoneoKxcJcq35TWRu0eq-ox_JNPU9Qgvw7Vk6PTTFTfdh-8-hXRR2jFCSPTn84OO3wCnvohPSwM3bBJyiYkFfkNMfMnN0dL80LQn_tF6UFIJk86PSQ7w3ps62TQ",
    featured: false,
  },
];

export const QUOTES = [
  {
    id: 1,
    vendor: "Botanica Floral Design",
    category: "Florist",
    location: "Mumbai",
    status: "Quote Received",
    price: 85000,
    inclusions: ["Centerpieces", "Archway", "Setup"],
  },
  {
    id: 2,
    vendor: "Lumina Catering Co.",
    category: "Catering",
    location: "Bangalore",
    status: "Pending Review",
    price: 275000,
    inclusions: ["3-Course Meal", "Staffing", "Bar Service"],
  },
  {
    id: 3,
    vendor: "Echo Sound & Lighting",
    category: "A/V Production",
    location: "Delhi",
    status: "Awaiting Response",
    price: null,
    inclusions: [],
  },
  {
    id: 4,
    vendor: "The Grand Estate",
    category: "Venue",
    location: "Pune",
    status: "Quote Received",
    price: 400000,
    inclusions: ["Full Access", "Furniture", "Valet"],
  },
];

export const METRICS = [
  { label: "Avg. Quote Value",  value: "₹2,12,500", icon: "payments",        trend: "12% vs last month",  direction: "down" },
  { label: "Response Rate",     value: "78%",        icon: "forum",           trend: "4% vs last month",   direction: "up" },
  { label: "Active Vendors",    value: "14",         icon: "store",           trend: "Currently in review", direction: null },
  { label: "Pending Responses", value: "3",          icon: "hourglass_empty", trend: "Requires follow-up", direction: null, highlight: true },
];

export const PLANS = [
  {
    id: "plan-a",
    label: "Plan A",
    name: "The Grove Eco-Lodge",
    icon: "forest",
    accent: "secondary",
    description:
      "A secluded, nature-focused retreat focusing on deep work without distractions. Features private cabins and a central timber-framed meeting hall.",
    features: [
      "Guided morning hikes",
      "Farm-to-table communal dining",
      "Est. Cost: $12,400",
    ],
  },
  {
    id: "plan-b",
    label: "Plan B",
    name: "Vista Point Resort",
    icon: "domain",
    accent: "tertiary",
    description:
      "A full-service, amenity-heavy resort offering premium conference facilities, high-speed connectivity, and structured leisure activities.",
    features: [
      "Executive boardroom access",
      "Spa or Golf afternoon options",
      "Est. Cost: $14,850",
    ],
  },
];

export const EVENTS = [
  {
    id: 1,
    title: "Q3 Executive Retreat",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    location: "Mumbai",
    icon: "business_center",
  },
  {
    id: 2,
    title: "Summer Gala 2026",
    date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    location: "Delhi",
    icon: "celebration",
  },
  {
    id: 3,
    title: "Team Building Weekend",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    location: "Goa",
    icon: "groups",
  },
  {
    id: 4,
    title: "Wedding Reception",
    date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    location: "Bangalore",
    icon: "favorite",
  },
];
