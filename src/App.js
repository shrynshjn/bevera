import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  navy: "#0B1F3B",
  green: "#0E7C66",
  gold: "#C7A200",
  bg: "#F4F6FA",
  white: "#FFFFFF",
  success: "#16A34A",
  warning: "#D97706",
  danger: "#DC2626",
  t1: "#0F172A",
  t2: "#64748B",
  t3: "#94A3B8",
  border: "#E2E8F0",
  navy2: "#1a3a6e",
};

// ─── FLAVOR DATA ──────────────────────────────────────────────────────────────
const FLAVOR_PROFILES = [
  {
    id: 1,
    name: "Wheat Beer",
    volume: "330ml",
    category: "Wheat Ale",
    margin: 38,
    velocity: 92,
    stock: 240,
    reorder: 80,
    flavorAnchor: {
      bitterness: 12,
      sweetness: 68,
      aroma: 82,
      body: 55,
      carbonation: 72,
      finish: 65,
    },
    currentBatch: {
      bitterness: 13,
      sweetness: 65,
      aroma: 80,
      body: 54,
      carbonation: 74,
      finish: 63,
    },
    ttbScore: 94,
    regionDemand: {
      pune: 85,
      bengaluru: 40,
      mumbai: 78,
      hyderabad: 52,
      goa: 61,
    },
    flavorNotes: ["Banana ester", "Clove phenol", "Soft wheat malt"],
    idealTemp: "4–6°C",
    abv: "4.8%",
    ibu: 12,
  },
  {
    id: 2,
    name: "Strong Lager",
    volume: "650ml",
    category: "Lager",
    margin: 31,
    velocity: 74,
    stock: 180,
    reorder: 60,
    flavorAnchor: {
      bitterness: 22,
      sweetness: 45,
      aroma: 38,
      body: 62,
      carbonation: 80,
      finish: 55,
    },
    currentBatch: {
      bitterness: 24,
      sweetness: 43,
      aroma: 36,
      body: 63,
      carbonation: 78,
      finish: 52,
    },
    ttbScore: 88,
    regionDemand: {
      pune: 60,
      bengaluru: 55,
      mumbai: 72,
      hyderabad: 68,
      goa: 44,
    },
    flavorNotes: ["Clean malt base", "Crisp hop finish", "Light corn adjunct"],
    idealTemp: "3–5°C",
    abv: "7.2%",
    ibu: 22,
  },
  {
    id: 3,
    name: "IPA",
    volume: "330ml",
    category: "India Pale Ale",
    margin: 44,
    velocity: 88,
    stock: 90,
    reorder: 40,
    flavorAnchor: {
      bitterness: 72,
      sweetness: 30,
      aroma: 88,
      body: 50,
      carbonation: 65,
      finish: 78,
    },
    currentBatch: {
      bitterness: 79,
      sweetness: 28,
      aroma: 85,
      body: 48,
      carbonation: 63,
      finish: 74,
    },
    ttbScore: 85,
    regionDemand: {
      pune: 35,
      bengaluru: 90,
      mumbai: 82,
      hyderabad: 41,
      goa: 74,
    },
    flavorNotes: [
      "Citrus & pine resin",
      "High bitterness",
      "Floral dry-hop aroma",
    ],
    idealTemp: "5–7°C",
    abv: "6.5%",
    ibu: 72,
  },
  {
    id: 4,
    name: "Kokum Sour",
    volume: "330ml",
    category: "Fruited Sour",
    margin: 52,
    velocity: 41,
    stock: 60,
    reorder: 25,
    flavorAnchor: {
      bitterness: 8,
      sweetness: 55,
      aroma: 75,
      body: 40,
      carbonation: 88,
      finish: 82,
    },
    currentBatch: {
      bitterness: 9,
      sweetness: 53,
      aroma: 73,
      body: 41,
      carbonation: 86,
      finish: 80,
    },
    ttbScore: 96,
    regionDemand: {
      pune: 30,
      bengaluru: 28,
      mumbai: 45,
      hyderabad: 22,
      goa: 88,
    },
    flavorNotes: ["Kokum tartness", "Hibiscus note", "Effervescent finish"],
    idealTemp: "4–6°C",
    abv: "4.2%",
    ibu: 8,
  },
  {
    id: 5,
    name: "Mango Witbier",
    volume: "500ml",
    category: "Witbier",
    margin: 47,
    velocity: 38,
    stock: 45,
    reorder: 20,
    flavorAnchor: {
      bitterness: 10,
      sweetness: 72,
      aroma: 90,
      body: 48,
      carbonation: 70,
      finish: 68,
    },
    currentBatch: {
      bitterness: 11,
      sweetness: 70,
      aroma: 88,
      body: 49,
      carbonation: 69,
      finish: 65,
    },
    ttbScore: 91,
    regionDemand: {
      pune: 25,
      bengaluru: 20,
      mumbai: 52,
      hyderabad: 35,
      goa: 79,
    },
    flavorNotes: [
      "Alphonso mango forward",
      "Coriander spice",
      "Orange peel undertone",
    ],
    idealTemp: "4–6°C",
    abv: "5.0%",
    ibu: 10,
  },
];

const BATCH_HISTORY = [
  {
    batch: "B-001",
    bci: 94,
    bitterness: 0.2,
    aroma: 0.1,
    carbonation: -0.3,
    ph: 0.1,
    ester: 0.0,
  },
  {
    batch: "B-002",
    bci: 96,
    bitterness: 0.1,
    aroma: 0.0,
    carbonation: -0.1,
    ph: 0.0,
    ester: 0.1,
  },
  {
    batch: "B-003",
    bci: 91,
    bitterness: 0.5,
    aroma: 0.2,
    carbonation: -0.5,
    ph: 0.2,
    ester: 0.2,
  },
  {
    batch: "B-004",
    bci: 88,
    bitterness: 0.9,
    aroma: 0.3,
    carbonation: -0.6,
    ph: 0.3,
    ester: 0.4,
  },
  {
    batch: "B-005",
    bci: 85,
    bitterness: 1.2,
    aroma: 0.0,
    carbonation: -0.8,
    ph: 0.4,
    ester: 0.5,
  },
  {
    batch: "B-006",
    bci: 90,
    bitterness: 0.7,
    aroma: 0.1,
    carbonation: -0.4,
    ph: 0.2,
    ester: 0.2,
  },
  {
    batch: "B-007",
    bci: 93,
    bitterness: 0.4,
    aroma: 0.0,
    carbonation: -0.2,
    ph: 0.1,
    ester: 0.1,
  },
  {
    batch: "B-008",
    bci: 95,
    bitterness: 0.2,
    aroma: 0.1,
    carbonation: -0.1,
    ph: 0.1,
    ester: 0.0,
  },
];

const REGIONAL_PALATE = [
  { region: "Pune", wheat: 85, lager: 60, ipa: 35, sour: 30, witbier: 25 },
  { region: "Bengaluru", wheat: 40, lager: 55, ipa: 90, sour: 28, witbier: 20 },
  { region: "Mumbai", wheat: 78, lager: 72, ipa: 82, sour: 45, witbier: 52 },
  { region: "Hyderabad", wheat: 52, lager: 68, ipa: 41, sour: 22, witbier: 35 },
  { region: "Goa", wheat: 61, lager: 44, ipa: 74, sour: 88, witbier: 79 },
];

const WORKING_CAPITAL = [
  { category: "Raw Materials", value: 18.4 },
  { category: "WIP Batches", value: 12.1 },
  { category: "Finished Goods", value: 31.7 },
  { category: "Credit Outstanding", value: 24.5 },
];

const EXCISE_REPORTS = [
  {
    id: 1,
    name: "FL-3 Daily Stock Register",
    status: "Auto-Filled",
    form: "fl3",
  },
  {
    id: 2,
    name: "Stock Movement Ledger",
    status: "Ready to Print",
    form: "sml",
  },
  {
    id: 3,
    name: "Duty Paid Register",
    status: "Variance Detected",
    form: "dpr",
  },
  {
    id: 4,
    name: "State Form – Maharashtra",
    status: "Auto-Filled",
    form: "sfm",
  },
];

const OUTLETS = [
  {
    id: 1,
    name: "Pai Wines, Koregaon Park",
    status: "visited",
    creditRisk: "low",
    slowSku: "Mango Witbier",
    lastOrder: "Feb 20",
    creditDays: 12,
    stock: "adequate",
    asset: "Fridge",
  },
  {
    id: 2,
    name: "Supreme Beverages, Viman",
    status: "pending",
    creditRisk: "medium",
    slowSku: "Kokum Sour",
    lastOrder: "Feb 15",
    creditDays: 28,
    stock: "low",
    asset: "Tap + Fridge",
  },
  {
    id: 3,
    name: "City Spirits, Baner",
    status: "pending",
    creditRisk: "low",
    slowSku: "IPA",
    lastOrder: "Feb 22",
    creditDays: 8,
    stock: "adequate",
    asset: "Fridge",
  },
  {
    id: 4,
    name: "Royal Wines, Wakad",
    status: "pending",
    creditRisk: "high",
    slowSku: "Mango Witbier",
    lastOrder: "Feb 10",
    creditDays: 45,
    stock: "critical",
    asset: "None",
  },
  {
    id: 5,
    name: "Metro Cellars, Hadapsar",
    status: "pending",
    creditRisk: "low",
    slowSku: "Kokum Sour",
    lastOrder: "Feb 21",
    creditDays: 5,
    stock: "adequate",
    asset: "Fridge",
  },
];

const INVOICES = [
  {
    id: "INV-2026-0891",
    date: "Feb 22",
    amount: 48200,
    status: "paid",
    sku: "Wheat Beer × 48 cases",
  },
  {
    id: "INV-2026-0872",
    date: "Feb 18",
    amount: 31500,
    status: "pending",
    sku: "Strong Lager × 30 cases",
  },
  {
    id: "INV-2026-0855",
    date: "Feb 12",
    amount: 22800,
    status: "paid",
    sku: "IPA × 24 cases",
  },
  {
    id: "INV-2026-0841",
    date: "Feb 5",
    amount: 15600,
    status: "overdue",
    sku: "Kokum Sour × 18 cases",
  },
];

const ACTIVE_BATCHES = [
  {
    batch: "B-008",
    sku: "Wheat Beer",
    stage: "Fermentation",
    volume: "1,200 L",
    day: "Day 5 / 12",
    progress: 42,
    status: "On Track",
    gravityDrop: "1.048→1.020",
    temp: "18°C",
    ph: "4.6",
  },
  {
    batch: "B-009",
    sku: "IPA",
    stage: "Conditioning",
    volume: "800 L",
    day: "Day 9 / 14",
    progress: 64,
    status: "On Track",
    gravityDrop: "1.062→1.014",
    temp: "4°C",
    ph: "4.4",
  },
  {
    batch: "B-010",
    sku: "Mango Witbier",
    stage: "Filtration",
    volume: "600 L",
    day: "Day 12 / 13",
    progress: 92,
    status: "Near Complete",
    gravityDrop: "1.052→1.012",
    temp: "2°C",
    ph: "4.5",
  },
  {
    batch: "B-011",
    sku: "Strong Lager",
    stage: "Brewing",
    volume: "1,500 L",
    day: "Day 2 / 6",
    progress: 18,
    status: "Early Stage",
    gravityDrop: "1.060→—",
    temp: "12°C",
    ph: "5.4",
  },
];

// ─── UTILITY COMPONENTS ──────────────────────────────────────────────────────

const Badge = ({ label }) => {
  const map = {
    "Auto-Filled": { bg: "#DCFCE7", text: "#15803D" },
    "Ready to Print": { bg: "#DBEAFE", text: "#1D4ED8" },
    "Variance Detected": { bg: "#FEE2E2", text: "#B91C1C" },
    Compliant: { bg: "#DCFCE7", text: "#15803D" },
    paid: { bg: "#DCFCE7", text: "#15803D" },
    pending: { bg: "#FEF9C3", text: "#A16207" },
    overdue: { bg: "#FEE2E2", text: "#B91C1C" },
    visited: { bg: "#DCFCE7", text: "#15803D" },
    low: { bg: "#DCFCE7", text: "#15803D" },
    medium: { bg: "#FEF9C3", text: "#A16207" },
    high: { bg: "#FEE2E2", text: "#B91C1C" },
    "On Track": { bg: "#DCFCE7", text: "#15803D" },
    "Near Complete": { bg: "#DBEAFE", text: "#1D4ED8" },
    "Early Stage": { bg: "#F3F4F6", text: "#374151" },
    adequate: { bg: "#DCFCE7", text: "#15803D" },
    critical: { bg: "#FEE2E2", text: "#B91C1C" },
    Keep: { bg: "#DCFCE7", text: "#15803D" },
    Improve: { bg: "#FEF9C3", text: "#A16207" },
    Drop: { bg: "#FEE2E2", text: "#B91C1C" },
  };
  const s = map[label] || { bg: "#F3F4F6", text: "#374151" };
  return (
    <span
      style={{
        background: s.bg,
        color: s.text,
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
};

const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: C.white,
      borderRadius: 12,
      boxShadow: "0 1px 3px rgba(11,31,59,0.07), 0 1px 2px rgba(11,31,59,0.04)",
      padding: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

const KpiCard = ({ title, value, sub, alert, accent }) => (
  <Card
    style={{
      flex: 1,
      minWidth: 170,
      borderLeft: accent ? `3px solid ${accent}` : undefined,
    }}
  >
    <p
      style={{
        fontSize: 10,
        color: C.t2,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.09em",
        marginBottom: 8,
      }}
    >
      {title}
    </p>
    <p
      style={{
        fontSize: 26,
        fontWeight: 800,
        color: alert ? C.danger : accent || C.t1,
        fontFamily: "'DM Mono', monospace",
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}
    >
      {value}
    </p>
    {sub && (
      <p style={{ fontSize: 11, color: C.t2, marginTop: 6, lineHeight: 1.4 }}>
        {sub}
      </p>
    )}
    {alert && (
      <div
        style={{
          marginTop: 10,
          background: "#FEF2F2",
          borderRadius: 6,
          padding: "5px 10px",
          fontSize: 11,
          color: C.danger,
          fontWeight: 600,
        }}
      >
        {alert}
      </div>
    )}
  </Card>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 20 }}>
    <h2
      style={{
        fontSize: 14,
        fontWeight: 700,
        color: C.t1,
        margin: 0,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
    {sub && (
      <p style={{ fontSize: 11, color: C.t2, marginTop: 3, margin: 0 }}>
        {sub}
      </p>
    )}
  </div>
);

const Btn = ({ children, variant = "primary", onClick, small, style = {} }) => {
  const styles = {
    primary: { background: C.navy, color: "#fff", border: "none" },
    secondary: {
      background: "transparent",
      color: C.navy,
      border: `1.5px solid ${C.navy}`,
    },
    success: { background: C.green, color: "#fff", border: "none" },
    danger: { background: C.danger, color: "#fff", border: "none" },
    gold: { background: C.gold, color: "#fff", border: "none" },
    ghost: { background: "#F1F5F9", color: C.t1, border: "1px solid #E2E8F0" },
  };
  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        padding: small ? "5px 12px" : "8px 18px",
        borderRadius: 7,
        fontSize: small ? 11 : 13,
        fontWeight: 600,
        cursor: "pointer",
        transition: "opacity 0.15s",
        letterSpacing: "0.01em",
        fontFamily: "inherit",
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
};

const Divider = () => (
  <div style={{ height: 1, background: C.border, margin: "0 0 20px" }} />
);

const StatRow = ({ label, value, mono }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "9px 0",
      borderBottom: `1px solid ${C.border}`,
    }}
  >
    <span style={{ fontSize: 12, color: C.t2 }}>{label}</span>
    <span
      style={{
        fontSize: 13,
        fontWeight: 700,
        color: C.t1,
        fontFamily: mono ? "'DM Mono', monospace" : "inherit",
      }}
    >
      {value}
    </span>
  </div>
);

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11,31,59,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: C.white,
          borderRadius: 14,
          padding: 32,
          minWidth: 400,
          maxWidth: 520,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: C.navy,
              marginBottom: 20,
            }}
          >
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};

const TooltipStyle = {
  background: C.navy,
  border: "none",
  borderRadius: 8,
  color: "#fff",
  fontSize: 11,
  padding: "6px 10px",
};

// ─── HEADER ───────────────────────────────────────────────────────────────────

const Header = ({ role, setRole }) => (
  <div
    style={{
      background: C.navy,
      color: "#fff",
      padding: "0 28px",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 200,
      boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div>
        <span
          style={{
            fontWeight: 800,
            fontSize: 16,
            letterSpacing: "0.06em",
            color: "#fff",
          }}
        >
          BEVERA
        </span>
        <span
          style={{
            fontSize: 9,
            color: C.gold,
            marginLeft: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
          }}
        >
          EXCISE INTELLIGENCE
        </span>
      </div>
      <div
        style={{ width: 1, height: 26, background: "rgba(255,255,255,0.12)" }}
      />
      <div style={{ display: "flex", gap: 10, fontSize: 11 }}>
        <span
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "3px 10px",
            borderRadius: 5,
            color: "#CBD5E1",
          }}
        >
          <span style={{ color: C.gold, fontWeight: 700 }}>FL-3</span> ·
          Maharashtra
        </span>
        <span
          style={{
            background: "rgba(22,163,74,0.18)",
            padding: "3px 10px",
            borderRadius: 5,
            color: "#86EFAC",
            fontWeight: 600,
          }}
        >
          Compliance 94 / 100
        </span>
        <span
          style={{
            background: "rgba(255,255,255,0.06)",
            padding: "3px 10px",
            borderRadius: 5,
            color: "#94A3B8",
          }}
        >
          Apex Breweries · Pune
        </span>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: "#94A3B8" }}>Portal</span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 7,
            padding: "5px 28px 5px 10px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            appearance: "auto",
          }}
        >
          <option value="seller" style={{ background: C.navy }}>
            Seller — Brewery
          </option>
          <option value="customer" style={{ background: C.navy }}>
            Customer — Distributor
          </option>
          <option value="rep" style={{ background: C.navy }}>
            Sales Rep — Field
          </option>
        </select>
      </div>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: C.gold,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 12,
          color: C.navy,
        }}
      >
        AK
      </div>
    </div>
  </div>
);

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

const Sidebar = ({ items, active, setActive }) => (
  <div
    style={{
      width: 216,
      background: C.white,
      borderRight: `1px solid ${C.border}`,
      minHeight: "calc(100vh - 56px)",
      padding: "18px 10px",
      flexShrink: 0,
      position: "sticky",
      top: 56,
      alignSelf: "flex-start",
      height: "calc(100vh - 56px)",
      overflowY: "auto",
    }}
  >
    {items.map((item) => (
      <button
        key={item.id}
        onClick={() => setActive(item.id)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "9px 13px",
          borderRadius: 8,
          marginBottom: 2,
          border: "none",
          background: active === item.id ? C.navy : "transparent",
          color: active === item.id ? "#fff" : C.t2,
          fontWeight: active === item.id ? 700 : 500,
          fontSize: 13,
          cursor: "pointer",
          textAlign: "left",
          transition: "all 0.12s",
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          if (active !== item.id) e.currentTarget.style.background = "#F1F5F9";
        }}
        onMouseLeave={(e) => {
          if (active !== item.id)
            e.currentTarget.style.background = "transparent";
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: active === item.id ? "rgba(255,255,255,0.15)" : C.bg,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: active === item.id ? "#fff" : C.t3,
            }}
          />
        </span>
        {item.label}
        {item.badge && (
          <span
            style={{
              marginLeft: "auto",
              background: C.gold,
              color: "#fff",
              fontSize: 8,
              fontWeight: 800,
              padding: "2px 6px",
              borderRadius: 10,
              letterSpacing: "0.05em",
            }}
          >
            {item.badge}
          </span>
        )}
      </button>
    ))}
  </div>
);

// ─── SELLER DASHBOARD ────────────────────────────────────────────────────────

const SellerDashboard = () => {
  const [auditOpen, setAuditOpen] = useState(false);
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditDone, setAuditDone] = useState(false);

  const runAudit = () => {
    setAuditRunning(true);
    setTimeout(() => {
      setAuditRunning(false);
      setAuditDone(true);
    }, 2000);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: C.navy,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Seller Dashboard
          </h1>
          <p style={{ color: C.t2, fontSize: 12, marginTop: 4 }}>
            Excise-Native · Audit-Ready · Margin-Optimized · 27 Feb 2026
          </p>
        </div>
        <Btn
          variant="gold"
          onClick={() => {
            setAuditOpen(true);
            setAuditDone(false);
            setAuditRunning(false);
          }}
        >
          Simulate Excise Audit
        </Btn>
      </div>

      <div
        style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}
      >
        <KpiCard
          title="Today's Production"
          value="4,820 L"
          sub="6% above yesterday's target"
          accent={C.green}
        />
        <KpiCard
          title="Closing Stock Variance"
          value="−38 ml"
          sub="System vs physical count"
          alert="Review required"
        />
        <KpiCard
          title="Working Capital Locked"
          value="₹86.7 L"
          sub="Across raw material, WIP, FG"
          accent={C.gold}
        />
        <KpiCard
          title="Excise Compliance"
          value="94 / 100"
          sub="FL-3 auto-filed · Maharashtra"
          accent={C.green}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr",
          gap: 20,
          marginBottom: 22,
        }}
      >
        <Card>
          <SectionTitle sub="Batch Consistency Index — last 8 production runs">
            Batch Quality Trend
          </SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={BATCH_HISTORY}>
              <defs>
                <linearGradient id="bciGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.green} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={C.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="batch" tick={{ fontSize: 10, fill: C.t2 }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: C.t2 }} />
              <Tooltip
                contentStyle={TooltipStyle}
                formatter={(v) => [`${v}`, "BCI Score"]}
              />
              <ReferenceLine
                y={92}
                stroke={C.green}
                strokeDasharray="4 4"
                label={{
                  value: "Target",
                  fill: C.green,
                  fontSize: 9,
                  position: "right",
                }}
              />
              <ReferenceLine
                y={87}
                stroke={C.danger}
                strokeDasharray="4 4"
                label={{
                  value: "Alert",
                  fill: C.danger,
                  fontSize: 9,
                  position: "right",
                }}
              />
              <Area
                type="monotone"
                dataKey="bci"
                stroke={C.green}
                strokeWidth={2.5}
                fill="url(#bciGrad)"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  const col =
                    payload.bci < 87
                      ? C.danger
                      : payload.bci < 92
                        ? C.warning
                        : C.green;
                  return (
                    <circle
                      key={payload.batch}
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={col}
                      stroke="#fff"
                      strokeWidth={1.5}
                    />
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
          {BATCH_HISTORY.some((b) => b.bci < 87) && (
            <div
              style={{
                marginTop: 12,
                background: "#FEF2F2",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 12,
                color: C.danger,
                fontWeight: 600,
              }}
            >
              Batch B-005 fell below alert threshold (85). Bitterness drift +1.2
              IBU detected. Production team notified.
            </div>
          )}
        </Card>

        <Card>
          <SectionTitle sub="Capital allocation across production stages">
            Working Capital Map
          </SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WORKING_CAPITAL} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="category" tick={{ fontSize: 9, fill: C.t2 }} />
              <YAxis tick={{ fontSize: 10, fill: C.t2 }} unit="L" />
              <Tooltip
                contentStyle={TooltipStyle}
                formatter={(v) => [`₹${v}L`, ""]}
              />
              <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                {WORKING_CAPITAL.map((_, i) => (
                  <Cell key={i} fill={[C.green, C.navy2, C.navy, C.gold][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}
      >
        <Card>
          <SectionTitle sub="Pending excise actions">
            Compliance Queue
          </SectionTitle>
          {[
            { label: "FL-3 Auto-filed Today", status: "Compliant" },
            { label: "Pending Approvals", status: "2 orders" },
            { label: "Next Submission", status: "Feb 28" },
            { label: "Annual Duty Cycle", status: "Q4 FY26" },
          ].map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "9px 0",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <span style={{ fontSize: 12, color: C.t2 }}>{r.label}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: r.status === "Compliant" ? C.success : C.t1,
                }}
              >
                {r.status}
              </span>
            </div>
          ))}
        </Card>
        <Card>
          <SectionTitle sub="SKU velocity this week">
            Top Performers
          </SectionTitle>
          {FLAVOR_PROFILES.sort((a, b) => b.velocity - a.velocity)
            .slice(0, 5)
            .map((s) => (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "7px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <span style={{ fontSize: 12, color: C.t1, fontWeight: 500 }}>
                  {s.name}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 60,
                      height: 5,
                      background: "#E5E7EB",
                      borderRadius: 4,
                    }}
                  >
                    <div
                      style={{
                        width: `${s.velocity}%`,
                        height: "100%",
                        background: s.velocity > 70 ? C.green : C.warning,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: C.t1,
                      width: 28,
                    }}
                  >
                    {s.velocity}
                  </span>
                </div>
              </div>
            ))}
        </Card>
        <Card
          style={{
            background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy2} 100%)`,
          }}
        >
          <p
            style={{
              fontSize: 10,
              color: C.gold,
              fontWeight: 800,
              letterSpacing: "0.1em",
              marginBottom: 10,
            }}
          >
            BREWPULSE™ ALERT
          </p>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 8,
            }}
          >
            IPA Bitterness Drift
          </p>
          <p style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>
            Current batch B-008 shows +7 IBU deviation from anchor (72 IBU).
            Bengaluru zone demand is high — protect this batch. Recommend
            dry-hop volume adjustment.
          </p>
          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
            <Btn small variant="gold">
              Review Batch
            </Btn>
            <Btn
              small
              variant="secondary"
              style={{ color: "#94A3B8", borderColor: "rgba(255,255,255,0.2)" }}
            >
              Dismiss
            </Btn>
          </div>
        </Card>
      </div>

      <Modal
        open={auditOpen}
        onClose={() => setAuditOpen(false)}
        title="Excise Audit Simulation — FL-3 Maharashtra"
      >
        {!auditRunning && !auditDone && (
          <div>
            <p
              style={{
                fontSize: 13,
                color: C.t2,
                marginBottom: 20,
                lineHeight: 1.7,
              }}
            >
              Bevera will simulate a surprise excise audit for today's date. The
              system will cross-check all stock movements, dispatches, and
              physical counts against the FL-3 ledger.
            </p>
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: 10,
                padding: 16,
                marginBottom: 20,
              }}
            >
              {[
                ["License", "FL-3-MH-2024-0892"],
                ["Audit Date", "27 Feb 2026"],
                ["SKUs Under Review", "5"],
                ["Transactions Today", "18"],
              ].map(([l, v]) => (
                <StatRow key={l} label={l} value={v} mono />
              ))}
            </div>
            <Btn onClick={runAudit}>Run Audit Simulation</Btn>
          </div>
        )}
        {auditRunning && (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div
              style={{
                width: 48,
                height: 48,
                border: `4px solid ${C.border}`,
                borderTop: `4px solid ${C.navy}`,
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 20px",
              }}
            />
            <p style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>
              Cross-referencing FL-3 ledger...
            </p>
            <p style={{ fontSize: 12, color: C.t2, marginTop: 6 }}>
              Checking 18 transactions across 5 SKUs
            </p>
          </div>
        )}
        {auditDone && (
          <div>
            <div
              style={{
                background: "#F0FDF4",
                border: "1.5px solid #22C55E",
                borderRadius: 10,
                padding: 18,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: C.success,
                  fontFamily: "monospace",
                }}
              >
                AUDIT CLEAR
              </p>
              <p style={{ fontSize: 13, color: "#166534", marginTop: 6 }}>
                All stock movements reconcile with FL-3 records. No variance
                flagged by the excise system.
              </p>
            </div>
            {[
              ["Opening Stock Match", "Verified"],
              ["Sales Dispatch Records", "18 / 18 matched"],
              ["Closing Stock Variance", "−38 ml (within 50 ml tolerance)"],
              ["Excise Duty Calculated", "₹4.2L — Auto-filed"],
            ].map(([l, v]) => (
              <StatRow key={l} label={l} value={v} />
            ))}
            <div style={{ marginTop: 20 }}>
              <Btn onClick={() => setAuditOpen(false)}>
                Download Audit Report
              </Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ─── FLAVOR INTELLIGENCE (BREWPULSE) ─────────────────────────────────────────

const BrewPulse = () => {
  const [selectedSku, setSelectedSku] = useState(FLAVOR_PROFILES[0]);

  const skuRec = (v, m) =>
    v > 70 && m > 35 ? "Keep" : v > 50 ? "Improve" : "Drop";

  const radarData = Object.keys(selectedSku.flavorAnchor).map((key) => ({
    attr: key.charAt(0).toUpperCase() + key.slice(1),
    Anchor: selectedSku.flavorAnchor[key],
    "Current Batch": selectedSku.currentBatch[key],
  }));

  const regionData = Object.entries(selectedSku.regionDemand).map(
    ([region, score]) => ({
      region: region.charAt(0).toUpperCase() + region.slice(1),
      score,
    }),
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.navy,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          BrewPulse™ Intelligence
        </h1>
        <p style={{ color: C.t2, fontSize: 12, marginTop: 4 }}>
          Flavor consistency · Regional palate mapping · SKU rationalization ·
          Batch drift detection
        </p>
      </div>

      {/* Batch Drift */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 20,
          marginBottom: 22,
        }}
      >
        <Card>
          <SectionTitle sub="Current batch B-008 attribute drift vs flavor anchor">
            Batch Drift Detection
          </SectionTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 16,
            }}
          >
            {[
              {
                attr: "Bitterness (IBU)",
                anchor: "72",
                current: "79",
                delta: "+7",
                status: "drift",
              },
              {
                attr: "Aroma Stability",
                anchor: "88",
                current: "85",
                delta: "−3",
                status: "minor",
              },
              {
                attr: "Carbonation (g/L)",
                anchor: "65",
                current: "63",
                delta: "−2",
                status: "ok",
              },
              {
                attr: "Ester Level",
                anchor: "40",
                current: "40",
                delta: "0",
                status: "ok",
              },
            ].map((a) => (
              <div
                key={a.attr}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: 8,
                  background:
                    a.status === "drift"
                      ? "#FFF5F5"
                      : a.status === "minor"
                        ? "#FFFBEB"
                        : "#F8FAFC",
                  border: `1.5px solid ${a.status === "drift" ? "#FCA5A5" : a.status === "minor" ? "#FDE68A" : C.border}`,
                }}
              >
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.t1 }}>
                    {a.attr}
                  </span>
                  <span style={{ fontSize: 11, color: C.t2, marginLeft: 10 }}>
                    Anchor: {a.anchor}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: C.t1,
                    }}
                  >
                    {a.current}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: "monospace",
                      color:
                        a.status === "drift"
                          ? C.danger
                          : a.status === "minor"
                            ? C.warning
                            : C.success,
                    }}
                  >
                    {a.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={BATCH_HISTORY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="batch" tick={{ fontSize: 9, fill: C.t2 }} />
              <YAxis tick={{ fontSize: 9, fill: C.t2 }} />
              <Tooltip contentStyle={TooltipStyle} />
              <Line
                type="monotone"
                dataKey="bitterness"
                stroke={C.danger}
                strokeWidth={2}
                dot={false}
                name="Bitterness"
              />
              <Line
                type="monotone"
                dataKey="carbonation"
                stroke={C.warning}
                strokeWidth={2}
                dot={false}
                name="Carbonation"
              />
              <Line
                type="monotone"
                dataKey="ester"
                stroke={C.green}
                strokeWidth={1.5}
                dot={false}
                name="Ester"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle sub="True-to-Brand scores across current SKUs">
            Trueness to Brand (TTB)
          </SectionTitle>
          {FLAVOR_PROFILES.map((s) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 0",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.t1 }}>
                  {s.name}
                </p>
                <p style={{ fontSize: 10, color: C.t2 }}>{s.category}</p>
              </div>
              <div
                style={{
                  width: 80,
                  height: 5,
                  background: "#E5E7EB",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    width: `${s.ttbScore}%`,
                    height: "100%",
                    background:
                      s.ttbScore > 92
                        ? C.green
                        : s.ttbScore > 87
                          ? C.warning
                          : C.danger,
                    borderRadius: 4,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  fontWeight: 800,
                  color:
                    s.ttbScore > 92
                      ? C.success
                      : s.ttbScore > 87
                        ? C.warning
                        : C.danger,
                  width: 30,
                  textAlign: "right",
                }}
              >
                {s.ttbScore}
              </span>
            </div>
          ))}
        </Card>
      </div>

      {/* SKU Flavor Profile + Regional Demand */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 22,
        }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <SectionTitle sub="Flavor anchor vs current batch">
              Flavor Profile Radar
            </SectionTitle>
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {FLAVOR_PROFILES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSku(s)}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "1.5px solid",
                    fontFamily: "inherit",
                    borderColor: selectedSku.id === s.id ? C.navy : C.border,
                    background:
                      selectedSku.id === s.id ? C.navy : "transparent",
                    color: selectedSku.id === s.id ? "#fff" : C.t2,
                  }}
                >
                  {s.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis
                  dataKey="attr"
                  tick={{ fontSize: 10, fill: C.t2 }}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Flavor Anchor"
                  dataKey="Anchor"
                  stroke={C.green}
                  fill={C.green}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Radar
                  name="Current Batch"
                  dataKey="Current Batch"
                  stroke={C.navy}
                  fill={C.navy}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  strokeDasharray="4 2"
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {selectedSku.flavorNotes.map((n) => (
              <span
                key={n}
                style={{
                  background: "#F1F5F9",
                  color: C.t2,
                  fontSize: 10,
                  padding: "3px 10px",
                  borderRadius: 20,
                  fontWeight: 500,
                }}
              >
                {n}
              </span>
            ))}
            <span style={{ marginLeft: "auto", fontSize: 11, color: C.t2 }}>
              TTB Score:{" "}
              <strong
                style={{
                  color: selectedSku.ttbScore > 92 ? C.success : C.warning,
                }}
              >
                {selectedSku.ttbScore}
              </strong>
            </span>
          </div>
        </Card>

        <Card>
          <SectionTitle sub="Regional demand index per city · 0–100 scale">
            Geographic Palate Map — {selectedSku.name}
          </SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={regionData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="region" tick={{ fontSize: 11, fill: C.t2 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: C.t2 }} />
              <Tooltip
                contentStyle={TooltipStyle}
                formatter={(v) => [`${v} / 100`, "Demand Index"]}
              />
              <Bar dataKey="score" radius={[5, 5, 0, 0]}>
                {regionData.map((d, i) => (
                  <Cell
                    key={i}
                    fill={
                      d.score > 70 ? C.green : d.score > 45 ? C.gold : "#CBD5E1"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div
            style={{
              marginTop: 14,
              background: "#F8FAFC",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 12,
              color: C.t2,
              lineHeight: 1.6,
            }}
          >
            <strong style={{ color: C.t1 }}>Intelligence:</strong>{" "}
            {selectedSku.name} peaks in{" "}
            {Object.entries(selectedSku.regionDemand)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 2)
              .map(([r]) => r.charAt(0).toUpperCase() + r.slice(1))
              .join(" and ")}
            .{" "}
            {selectedSku.category === "India Pale Ale"
              ? "Coastal + metro tech crowds drive IPA affinity. Push volume in Bengaluru and Mumbai."
              : ""}
            {selectedSku.category === "Wheat Ale"
              ? "Humid climate + casual dining culture drives Wheat Beer in Pune."
              : ""}
            {selectedSku.category === "Fruited Sour"
              ? "Goa's tourist-driven market heavily favors experimental sour styles."
              : ""}
          </div>
        </Card>
      </div>

      {/* Regional Cross-SKU Palate Matrix */}
      <Card>
        <SectionTitle sub="Demand index across all cities and SKUs — guides production planning">
          Regional Palate Intelligence Matrix
        </SectionTitle>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    color: C.t2,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    borderBottom: `2px solid ${C.border}`,
                  }}
                >
                  REGION
                </th>
                {FLAVOR_PROFILES.map((s) => (
                  <th
                    key={s.id}
                    style={{
                      textAlign: "center",
                      padding: "8px 12px",
                      color: C.t2,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      borderBottom: `2px solid ${C.border}`,
                    }}
                  >
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REGIONAL_PALATE.map((row, i) => (
                <tr
                  key={row.region}
                  style={{ background: i % 2 === 0 ? "#FAFBFD" : "#fff" }}
                >
                  <td
                    style={{
                      padding: "9px 12px",
                      fontWeight: 700,
                      color: C.t1,
                    }}
                  >
                    {row.region}
                  </td>
                  {[row.wheat, row.lager, row.ipa, row.sour, row.witbier].map(
                    (score, j) => (
                      <td
                        key={j}
                        style={{ padding: "9px 12px", textAlign: "center" }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: 42,
                            padding: "3px 0",
                            borderRadius: 6,
                            textAlign: "center",
                            fontSize: 12,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            background:
                              score > 70
                                ? "#DCFCE7"
                                : score > 45
                                  ? "#FEF9C3"
                                  : "#F1F5F9",
                            color:
                              score > 70
                                ? "#166534"
                                : score > 45
                                  ? "#A16207"
                                  : C.t3,
                          }}
                        >
                          {score}
                        </span>
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: C.t3, marginTop: 12 }}>
          Higher score indicates stronger regional consumer preference. Drives
          BrewPulse™ production volume recommendations.
        </p>
      </Card>

      {/* SKU Rationalization */}
      <div style={{ marginTop: 22 }}>
        <Card>
          <SectionTitle sub="Portfolio performance — velocity vs margin analysis">
            SKU Rationalization Panel
          </SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 14,
            }}
          >
            {FLAVOR_PROFILES.map((sku) => {
              const rec = skuRec(sku.velocity, sku.margin);
              return (
                <div
                  key={sku.id}
                  style={{
                    background:
                      rec === "Drop"
                        ? "#FFF5F5"
                        : rec === "Improve"
                          ? "#FFFBEB"
                          : "#F0FDF4",
                    border: `1.5px solid ${rec === "Drop" ? "#FCA5A5" : rec === "Improve" ? "#FDE68A" : "#BBF7D0"}`,
                    borderRadius: 10,
                    padding: 16,
                  }}
                >
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: C.t1,
                      marginBottom: 4,
                    }}
                  >
                    {sku.name}
                  </p>
                  <p style={{ fontSize: 10, color: C.t2, marginBottom: 12 }}>
                    {sku.category}
                  </p>
                  <div style={{ marginBottom: 8 }}>
                    <p
                      style={{
                        fontSize: 9,
                        color: C.t2,
                        fontWeight: 700,
                        marginBottom: 3,
                        letterSpacing: "0.06em",
                      }}
                    >
                      VELOCITY
                    </p>
                    <div
                      style={{
                        background: "#E5E7EB",
                        borderRadius: 4,
                        height: 5,
                      }}
                    >
                      <div
                        style={{
                          width: `${sku.velocity}%`,
                          background: sku.velocity > 70 ? C.green : C.warning,
                          height: "100%",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: C.t1,
                        marginTop: 2,
                      }}
                    >
                      {sku.velocity}
                    </p>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <p
                      style={{
                        fontSize: 9,
                        color: C.t2,
                        fontWeight: 700,
                        marginBottom: 2,
                        letterSpacing: "0.06em",
                      }}
                    >
                      MARGIN
                    </p>
                    <p
                      style={{
                        fontSize: 18,
                        fontFamily: "monospace",
                        fontWeight: 800,
                        color: C.navy,
                      }}
                    >
                      {sku.margin}%
                    </p>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <p
                      style={{
                        fontSize: 9,
                        color: C.t2,
                        fontWeight: 700,
                        marginBottom: 2,
                        letterSpacing: "0.06em",
                      }}
                    >
                      TTB SCORE
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: sku.ttbScore > 92 ? C.success : C.warning,
                      }}
                    >
                      {sku.ttbScore}
                    </p>
                  </div>
                  <div
                    style={{
                      background:
                        rec === "Keep"
                          ? C.success
                          : rec === "Improve"
                            ? C.warning
                            : C.danger,
                      color: "#fff",
                      borderRadius: 5,
                      padding: "4px 10px",
                      fontSize: 11,
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    {rec}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── PRODUCTION PAGE ──────────────────────────────────────────────────────────

const Production = () => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: C.navy,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        Production
      </h1>
      <p style={{ color: C.t2, fontSize: 12, marginTop: 4 }}>
        Active batches · Brew schedule · Fermentation monitoring
      </p>
    </div>

    <div
      style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}
    >
      <KpiCard
        title="Active Batches"
        value="4"
        sub="Wheat, IPA, Witbier, Lager"
        accent={C.navy}
      />
      <KpiCard
        title="Total WIP Volume"
        value="4,100 L"
        sub="Across all stages"
        accent={C.green}
      />
      <KpiCard
        title="Nearest Completion"
        value="B-010"
        sub="Filtration — 92% done"
        accent={C.gold}
      />
      <KpiCard
        title="Batch Drift Alerts"
        value="1"
        sub="IPA bitterness +7 IBU"
        alert="Review B-008"
      />
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 20,
        marginBottom: 22,
      }}
    >
      {ACTIVE_BATCHES.map((b) => (
        <Card key={b.batch}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 14,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  color: C.t2,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {b.batch}
              </p>
              <p style={{ fontSize: 16, fontWeight: 800, color: C.navy }}>
                {b.sku}
              </p>
            </div>
            <Badge label={b.status} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginBottom: 14,
            }}
          >
            {[
              ["Stage", b.stage],
              ["Volume", b.volume],
              ["Progress", b.day],
            ].map(([l, v]) => (
              <div
                key={l}
                style={{
                  background: "#F8FAFC",
                  borderRadius: 7,
                  padding: "8px 10px",
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    color: C.t2,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  {l}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.t1,
                    marginTop: 2,
                  }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginBottom: 14,
            }}
          >
            {[
              ["Gravity", b.gravityDrop],
              ["Temp", b.temp],
              ["pH", b.ph],
            ].map(([l, v]) => (
              <div
                key={l}
                style={{
                  background: "#F8FAFC",
                  borderRadius: 7,
                  padding: "8px 10px",
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    color: C.t2,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  {l}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: C.t1,
                    fontFamily: "monospace",
                    marginTop: 2,
                  }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <span style={{ fontSize: 10, color: C.t2 }}>{b.day}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.green }}>
                {b.progress}%
              </span>
            </div>
            <div style={{ background: "#E5E7EB", borderRadius: 6, height: 7 }}>
              <div
                style={{
                  width: `${b.progress}%`,
                  background: `linear-gradient(90deg, ${C.green}, ${C.navy})`,
                  height: "100%",
                  borderRadius: 6,
                }}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>

    <Card>
      <SectionTitle sub="Key fermentation variables affect final flavor — logged continuously">
        Fermentation Quality Log — B-008 (Wheat Beer)
      </SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        }}
      >
        {[
          {
            label: "Yeast Generation",
            value: "G3",
            note: "Within 5-gen limit",
          },
          { label: "Pitch Rate", value: "0.75M/mL/°P", note: "Optimal range" },
          {
            label: "Ester Production",
            value: "Normal",
            note: "Banana character stable",
          },
          {
            label: "Sulfur Presence",
            value: "None",
            note: "Clean fermentation",
          },
        ].map((f) => (
          <div
            key={f.label}
            style={{
              background: "#F8FAFC",
              border: `1px solid ${C.border}`,
              borderRadius: 9,
              padding: 14,
            }}
          >
            <p
              style={{
                fontSize: 10,
                color: C.t2,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              {f.label}
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: C.navy,
                fontFamily: "monospace",
                marginTop: 4,
              }}
            >
              {f.value}
            </p>
            <p style={{ fontSize: 10, color: C.success, marginTop: 4 }}>
              {f.note}
            </p>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── INVENTORY ────────────────────────────────────────────────────────────────

const Inventory = () => (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 28,
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.navy,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Inventory
        </h1>
        <p style={{ color: C.t2, fontSize: 12, marginTop: 4 }}>
          Finished goods · Bid allocation · Real-time stock levels
        </p>
      </div>
      <Btn variant="ghost">Export Ledger</Btn>
    </div>

    <Card style={{ marginBottom: 20 }}>
      <SectionTitle sub="All SKUs — live count including bid-allocated quantities">
        Current Stock Positions
      </SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {FLAVOR_PROFILES.map((sku) => {
          const pct = Math.min(100, (sku.stock / 300) * 100);
          const level =
            sku.stock < 60 ? "critical" : sku.stock < 120 ? "low" : "adequate";
          return (
            <div
              key={sku.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "13px 16px",
                background: "#F8FAFC",
                borderRadius: 9,
              }}
            >
              <div style={{ width: 160 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>
                  {sku.name}
                </p>
                <p style={{ fontSize: 10, color: C.t2 }}>
                  {sku.volume} · {sku.category}
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ background: "#E5E7EB", borderRadius: 5, height: 9 }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      borderRadius: 5,
                      background:
                        level === "critical"
                          ? C.danger
                          : level === "low"
                            ? C.warning
                            : C.green,
                    }}
                  />
                </div>
              </div>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: C.navy,
                  fontFamily: "monospace",
                  width: 55,
                  textAlign: "right",
                }}
              >
                {sku.stock}
              </p>
              <p style={{ fontSize: 10, color: C.t2, width: 35 }}>units</p>
              <div style={{ width: 80 }}>
                <p style={{ fontSize: 9, color: C.t2 }}>
                  Reorder at {sku.reorder}
                </p>
              </div>
              <Badge label={level} />
            </div>
          );
        })}
      </div>
    </Card>

    <Card>
      <SectionTitle sub="Slow-moving SKU alerts based on BrewPulse demand velocity">
        Slow-Moving Handle Alerts
      </SectionTitle>
      {FLAVOR_PROFILES.filter((s) => s.velocity < 50).map((s) => (
        <div
          key={s.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 14px",
            background: "#FFFBEB",
            borderRadius: 8,
            marginBottom: 8,
            border: `1px solid #FDE68A`,
          }}
        >
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>
              {s.name} — {s.stock} units remaining
            </p>
            <p style={{ fontSize: 11, color: C.t2 }}>
              Velocity: {s.velocity}/100 · Consider promotion or tap rotation in
              low-demand regions
            </p>
          </div>
          <Btn small variant="ghost">
            Flag for Review
          </Btn>
        </div>
      ))}
    </Card>
  </div>
);

// ─── EXCISE REPORTS ───────────────────────────────────────────────────────────

const ExciseReports = () => {
  const [selected, setSelected] = useState(null);
  const [physicalCount, setPhysicalCount] = useState("");
  const [printSuccess, setPrintSuccess] = useState(false);

  const systemStock = 2842;
  const physical = parseFloat(physicalCount);
  const variance = physicalCount !== "" ? physical - systemStock : null;
  const hasVariance = variance !== null && Math.abs(variance) > 50;

  if (selected) {
    return (
      <div>
        <button
          onClick={() => {
            setSelected(null);
            setPhysicalCount("");
            setPrintSuccess(false);
          }}
          style={{
            background: "none",
            border: "none",
            color: C.green,
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 13,
            marginBottom: 20,
            padding: 0,
          }}
        >
          ← Back to Reports
        </button>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: C.navy,
                  margin: 0,
                }}
              >
                {selected.name}
              </h2>
              <p style={{ fontSize: 11, color: C.t2, marginTop: 4 }}>
                Date: 27/02/2026 · License: FL-3-MH-2024-0892 · Apex Breweries
                Pvt Ltd
              </p>
            </div>
            <Badge label={selected.status} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 14,
              marginBottom: 24,
            }}
          >
            {[
              { label: "Opening Stock (L)", value: "2,918" },
              { label: "Fresh Stock Added", value: "+180 L" },
              { label: "Sales / Dispatched", value: "−256 L" },
              {
                label: "System Closing Stock",
                value: `${systemStock.toLocaleString("en-IN")} L`,
                highlight: true,
              },
            ].map((f) => (
              <div
                key={f.label}
                style={{
                  background: f.highlight ? "#EFF6FF" : "#F8FAFC",
                  border: `1.5px solid ${f.highlight ? "#BFDBFE" : C.border}`,
                  borderRadius: 9,
                  padding: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    color: C.t2,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 6,
                  }}
                >
                  {f.label}
                </p>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: f.highlight ? C.navy : C.t1,
                    fontFamily: "monospace",
                  }}
                >
                  {f.value}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#F8FAFC",
              borderRadius: 10,
              padding: 18,
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: C.t1,
                marginBottom: 14,
              }}
            >
              Physical Count Verification
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div>
                <label
                  style={{
                    fontSize: 11,
                    color: C.t2,
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Enter Physical Count (L)
                </label>
                <input
                  type="number"
                  value={physicalCount}
                  onChange={(e) => setPhysicalCount(e.target.value)}
                  placeholder={`${systemStock}`}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 7,
                    border: `1.5px solid ${hasVariance ? C.danger : "#D1D5DB"}`,
                    fontSize: 15,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    width: 150,
                    outline: "none",
                    color: C.t1,
                    background: "#fff",
                  }}
                />
              </div>
              {variance !== null && (
                <div style={{ marginTop: 18 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: hasVariance ? C.danger : C.success,
                    }}
                  >
                    {variance > 0 ? "+" : ""}
                    {variance.toFixed(0)} L {hasVariance ? "VARIANCE" : "CLEAR"}
                  </span>
                </div>
              )}
            </div>
            {hasVariance && (
              <div
                style={{
                  marginTop: 14,
                  background: "#FEE2E2",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 12,
                  color: C.danger,
                  fontWeight: 600,
                }}
              >
                Variance of {Math.abs(variance).toFixed(0)} L detected. Excise
                submission blocked until reconciled. Contact excise officer
                before proceeding.
              </div>
            )}
          </div>

          {printSuccess && (
            <div
              style={{
                background: "#F0FDF4",
                border: `1.5px solid ${C.success}`,
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: 13,
                color: "#15803D",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              Report exported successfully in Maharashtra Excise Department
              pre-printed format.
            </div>
          )}

          <div style={{ display: "flex", gap: 12 }}>
            <Btn onClick={() => setPrintSuccess(true)}>Print (Govt Format)</Btn>
            <Btn variant="secondary" onClick={() => setPrintSuccess(true)}>
              Export PDF
            </Btn>
            <Btn
              variant={hasVariance ? "danger" : "success"}
              onClick={() => !hasVariance && setPrintSuccess(true)}
            >
              {hasVariance ? "Submission Blocked" : "Submit Digitally"}
            </Btn>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.navy,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Excise Reports
        </h1>
        <p style={{ color: C.t2, fontSize: 12, marginTop: 4 }}>
          Auto-generated Maharashtra FL-3 documentation · Audit-ready daily
          ledgers
        </p>
      </div>

      <div
        style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}
      >
        <KpiCard
          title="Compliance Score"
          value="94 / 100"
          sub="Maharashtra FL-3 · Auto-filed"
          accent={C.green}
        />
        <KpiCard
          title="Reports Due Today"
          value="2"
          sub="FL-3 daily + Movement ledger"
          accent={C.gold}
        />
        <KpiCard
          title="Pending Submissions"
          value="1"
          sub="Duty Paid Register — variance"
          alert="Reconcile required"
        />
        <KpiCard
          title="Duty Paid MTD"
          value="₹4.2 L"
          sub="Maharashtra Excise Dept."
          accent={C.navy}
        />
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}
      >
        <Card>
          <SectionTitle sub="Click any report to open, verify and submit">
            Available Reports
          </SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {EXCISE_REPORTS.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelected(r)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 18px",
                  borderRadius: 9,
                  border: `1.5px solid ${C.border}`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background:
                    r.status === "Variance Detected" ? "#FFF5F5" : "#FAFBFF",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.navy;
                  e.currentTarget.style.background = "#EFF6FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background =
                    r.status === "Variance Detected" ? "#FFF5F5" : "#FAFBFF";
                }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>
                    {r.name}
                  </p>
                  <p style={{ fontSize: 11, color: C.t2, marginTop: 3 }}>
                    License: FL-3-MH-2024-0892 · 27 Feb 2026
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Badge label={r.status} />
                  <span style={{ color: C.t3, fontSize: 18 }}>›</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle sub="How Bevera's Excise-Native architecture works">
            Why FL-3 Auto-Filing Matters
          </SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              {
                step: "01",
                title: "Real-Time Tracking",
                body: "Every sale is logged instantly — SKU, quantity, outlet, timestamp.",
              },
              {
                step: "02",
                title: "Auto-Calculation",
                body: "Opening + Received − Sales = Closing computed per SKU with zero manual entry.",
              },
              {
                step: "03",
                title: "Pre-Printed Format",
                body: "Maharashtra Excise pre-printed template populated exactly as the department mandates.",
              },
              {
                step: "04",
                title: "One-Click Submit",
                body: "Manager hits Print or Submit. Audit-ready in seconds, not hours.",
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    fontWeight: 800,
                    color: C.gold,
                    background: "#FFFBEB",
                    border: "1px solid #FDE68A",
                    borderRadius: 5,
                    padding: "3px 7px",
                    flexShrink: 0,
                  }}
                >
                  {s.step}
                </span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.t1 }}>
                    {s.title}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: C.t2,
                      marginTop: 2,
                      lineHeight: 1.5,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 18,
              background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy2} 100%)`,
              borderRadius: 9,
              padding: 16,
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: C.gold,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              COMPETITIVE MOAT
            </p>
            <p style={{ fontSize: 12, color: "#CBD5E1", lineHeight: 1.6 }}>
              Petpooja reports sales to government. Bevera manages the entire
              journey — brewery gate to retail invoice — and auto-generates
              every state-mandated document natively.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── FINANCE ──────────────────────────────────────────────────────────────────

const Finance = () => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: C.navy,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        Finance
      </h1>
      <p style={{ color: C.t2, fontSize: 12, marginTop: 4 }}>
        Revenue, collections, and credit exposure overview
      </p>
    </div>
    <div
      style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}
    >
      <KpiCard
        title="Monthly Revenue"
        value="₹38.4 L"
        sub="11% above Feb 2025"
        accent={C.green}
      />
      <KpiCard
        title="Outstanding Receivables"
        value="₹12.8 L"
        sub="Across 14 distributors"
        accent={C.gold}
      />
      <KpiCard
        title="Avg Collection Days"
        value="22 days"
        sub="Target: 18 days"
        accent={C.navy}
      />
      <KpiCard
        title="Duty Paid MTD"
        value="₹4.2 L"
        sub="Maharashtra Excise Dept."
        accent={C.navy}
      />
    </div>
    <Card>
      <SectionTitle sub="Revenue by SKU · Feb 2026">
        Revenue Breakdown
      </SectionTitle>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart
          data={FLAVOR_PROFILES.map((s) => ({
            name: s.name,
            revenue: Math.round(s.velocity * s.margin * 120),
          }))}
          barSize={38}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.t2 }} />
          <YAxis
            tick={{ fontSize: 11, fill: C.t2 }}
            tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
          />
          <Tooltip
            contentStyle={TooltipStyle}
            formatter={(v) => [`₹${(v / 1000).toFixed(1)}k`, "Revenue"]}
          />
          <Bar dataKey="revenue" radius={[5, 5, 0, 0]}>
            {FLAVOR_PROFILES.map((_, i) => (
              <Cell
                key={i}
                fill={[C.navy, C.green, C.navy2, C.gold, "#5B8DB8"][i]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </div>
);

// ─── SETTINGS ─────────────────────────────────────────────────────────────────

const SettingsPage = () => (
  <div>
    <h1
      style={{
        fontSize: 22,
        fontWeight: 800,
        color: C.navy,
        marginBottom: 8,
        letterSpacing: "-0.02em",
      }}
    >
      Settings
    </h1>
    <p style={{ color: C.t2, fontSize: 12, marginBottom: 28 }}>
      License, compliance, and platform configuration
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {[
        { label: "License Number", value: "FL-3-MH-2024-0892" },
        { label: "State", value: "Maharashtra" },
        { label: "Business Name", value: "Apex Breweries Pvt Ltd" },
        { label: "Compliance Score", value: "94 / 100" },
        { label: "Reporting Cycle", value: "Daily Auto-Submit" },
        { label: "Excise Officer", value: "Mr. S. Patil, Pune Division" },
      ].map((s) => (
        <Card key={s.label} style={{ padding: 18 }}>
          <p
            style={{
              fontSize: 10,
              color: C.t2,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {s.label}
          </p>
          <p
            style={{ fontSize: 15, fontWeight: 700, color: C.t1, marginTop: 5 }}
          >
            {s.value}
          </p>
        </Card>
      ))}
    </div>
  </div>
);

// ─── CUSTOMER PORTAL ──────────────────────────────────────────────────────────

const CustomerDashboard = () => (
  <div>
    <div style={{ marginBottom: 28 }}>
      <h1
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: C.navy,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        Distributor Dashboard
      </h1>
      <p style={{ color: C.t2, fontSize: 12, marginTop: 4 }}>
        Mumbai Beverages Ltd · Maharashtra region
      </p>
    </div>
    <div
      style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}
    >
      <KpiCard
        title="Available Credit"
        value="₹62,500"
        sub="of ₹2,50,000 limit remaining"
        accent={C.green}
      />
      <KpiCard
        title="Outstanding"
        value="₹1,87,500"
        sub="Aging: 12 days avg"
        accent={C.gold}
      />
      <KpiCard
        title="Active Orders"
        value="5"
        sub="2 dispatched today"
        accent={C.navy}
      />
      <KpiCard
        title="Excise Pending"
        value="1"
        sub="Approval in queue"
        alert="Review required"
      />
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: 20,
        marginBottom: 22,
      }}
    >
      <Card>
        <SectionTitle sub="Current order pipeline">Active Orders</SectionTitle>
        {[
          {
            id: "ORD-7821",
            outlet: "The Tap Room, Bandra",
            sku: "Amber Ale 330ml",
            qty: 120,
            value: 22200,
            status: "dispatched",
          },
          {
            id: "ORD-7820",
            outlet: "Toit Brewpub, Pune",
            sku: "Bengal IPA 330ml",
            qty: 80,
            value: 17600,
            status: "excise_pending",
          },
          {
            id: "ORD-7819",
            outlet: "Social, Andheri",
            sku: "Wheat Beer 500ml",
            qty: 200,
            value: 35000,
            status: "delivered",
          },
        ].map((o) => (
          <div
            key={o.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.navy,
                  fontFamily: "monospace",
                }}
              >
                {o.id}
              </p>
              <p style={{ fontSize: 11, color: C.t2, marginTop: 2 }}>
                {o.outlet} · {o.sku} × {o.qty}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: C.t1,
                  fontFamily: "monospace",
                }}
              >
                ₹{o.value.toLocaleString("en-IN")}
              </span>
              <Badge
                label={
                  o.status === "dispatched"
                    ? "Ready to Print"
                    : o.status === "excise_pending"
                      ? "pending"
                      : "paid"
                }
              />
            </div>
          </div>
        ))}
      </Card>
      <Card
        style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy2} 100%)`,
        }}
      >
        <p
          style={{
            fontSize: 10,
            color: C.gold,
            fontWeight: 800,
            letterSpacing: "0.1em",
            marginBottom: 10,
          }}
        >
          BREWPULSE™ AI
        </p>
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 8,
          }}
        >
          Push Wheat Beer — Pune corridor
        </p>
        <p
          style={{
            fontSize: 12,
            color: "#94A3B8",
            marginTop: 4,
            lineHeight: 1.6,
          }}
        >
          Regional palate demand index: 85/100. Humidity-driven wheat preference
          peaking. 3 outlets under-stocked. Pre-book 80 cases to capture
          festival window.
        </p>
        <div
          style={{
            marginTop: 14,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.07)",
            borderRadius: 7,
          }}
        >
          <p style={{ fontSize: 11, color: "#CBD5E1" }}>
            Flavor match:{" "}
            <strong style={{ color: C.gold }}>
              Banana ester, soft wheat malt
            </strong>{" "}
            — aligns with Pune palate cluster.
          </p>
        </div>
        <div style={{ marginTop: 14 }}>
          <Btn small>Add to Order</Btn>
        </div>
      </Card>
    </div>
    <Card>
      <SectionTitle sub="Stock freshness and reorder intelligence">
        Inventory Status at Warehouse
      </SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {FLAVOR_PROFILES.map((s) => {
          const pct = Math.min(100, (s.stock / 300) * 100);
          return (
            <div
              key={s.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 14px",
                background: "#F8FAFC",
                borderRadius: 8,
              }}
            >
              <div style={{ width: 150 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.t1 }}>
                  {s.name}
                </p>
                <p style={{ fontSize: 10, color: C.t2 }}>
                  {s.volume} · ABV {s.abv}
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ background: "#E5E7EB", borderRadius: 4, height: 7 }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      borderRadius: 4,
                      background:
                        s.stock < 60
                          ? C.danger
                          : s.stock < 120
                            ? C.warning
                            : C.green,
                    }}
                  />
                </div>
              </div>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: C.navy,
                  fontFamily: "monospace",
                  width: 50,
                  textAlign: "right",
                }}
              >
                {s.stock}
              </p>
              <div style={{ width: 80, textAlign: "right" }}>
                <Badge
                  label={
                    s.stock < 60
                      ? "critical"
                      : s.stock < 120
                        ? "low"
                        : "adequate"
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  </div>
);

const CustomerOrderPage = () => {
  const [selected, setSelected] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [discount, setDiscount] = useState("");
  const [discountModal, setDiscountModal] = useState(false);
  const MAX_DISCOUNT = 12;
  const discountValid = parseFloat(discount) <= MAX_DISCOUNT;

  const setQty = (id, val) => setQuantities((q) => ({ ...q, [id]: val }));
  const total = FLAVOR_PROFILES.reduce(
    (sum, s) => sum + (parseFloat(quantities[s.id]) || 0) * s.margin * 100,
    0,
  );

  if (selected) {
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          style={{
            background: "none",
            border: "none",
            color: C.green,
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 13,
            marginBottom: 20,
            padding: 0,
          }}
        >
          ← Back to Order
        </button>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          <Card>
            <h2
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: C.navy,
                marginBottom: 14,
              }}
            >
              {selected.name}
            </h2>
            {[
              ["Category", selected.category],
              ["ABV", selected.abv],
              ["IBU", `${selected.ibu} IBU`],
              ["Ideal Serve Temp", selected.idealTemp],
              ["TTB Score (this batch)", `${selected.ttbScore} / 100`],
              ["Flavor Notes", selected.flavorNotes.join(", ")],
            ].map(([l, v]) => (
              <StatRow key={l} label={l} value={v} />
            ))}
          </Card>
          <Card>
            <SectionTitle sub={`Demand index — ${selected.name}`}>
              Regional Demand
            </SectionTitle>
            {Object.entries(selected.regionDemand).map(([region, score]) => (
              <div
                key={region}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    color: C.t1,
                    width: 90,
                    fontWeight: 500,
                  }}
                >
                  {region.charAt(0).toUpperCase() + region.slice(1)}
                </p>
                <div
                  style={{
                    flex: 1,
                    background: "#E5E7EB",
                    borderRadius: 4,
                    height: 7,
                  }}
                >
                  <div
                    style={{
                      width: `${score}%`,
                      height: "100%",
                      background:
                        score > 70 ? C.green : score > 45 ? C.gold : "#CBD5E1",
                      borderRadius: 4,
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: C.t1,
                    width: 30,
                  }}
                >
                  {score}
                </p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.navy,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Order Placement
        </h1>
        <p style={{ color: C.t2, fontSize: 12, marginTop: 4 }}>
          State-validated pricing · Bid-allocated SKUs only · Compliance
          auto-checked
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <Card>
          <SectionTitle sub="SKUs available for Maharashtra region · Click name for flavor profile">
            Select SKUs
          </SectionTitle>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "Product",
                  "Category",
                  "ABV",
                  "Margin",
                  "Available",
                  "Qty",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 10px",
                      fontSize: 10,
                      color: C.t2,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      borderBottom: `2px solid ${C.border}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FLAVOR_PROFILES.map((s) => (
                <tr key={s.id}>
                  <td
                    style={{
                      padding: "10px 10px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.navy,
                      cursor: "pointer",
                      textDecoration: "underline",
                      textDecorationColor: "#CBD5E1",
                    }}
                    onClick={() => setSelected(s)}
                  >
                    {s.name}
                  </td>
                  <td
                    style={{ padding: "10px 10px", fontSize: 11, color: C.t2 }}
                  >
                    {s.category}
                  </td>
                  <td
                    style={{
                      padding: "10px 10px",
                      fontSize: 12,
                      fontFamily: "monospace",
                      color: C.t1,
                    }}
                  >
                    {s.abv}
                  </td>
                  <td
                    style={{
                      padding: "10px 10px",
                      fontSize: 12,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: C.green,
                    }}
                  >
                    {s.margin}%
                  </td>
                  <td
                    style={{
                      padding: "10px 10px",
                      fontSize: 12,
                      fontFamily: "monospace",
                      color: C.t1,
                    }}
                  >
                    {s.stock - s.reorder}
                  </td>
                  <td style={{ padding: "10px 10px" }}>
                    <input
                      type="number"
                      min="0"
                      value={quantities[s.id] || ""}
                      onChange={(e) => setQty(s.id, e.target.value)}
                      placeholder="0"
                      style={{
                        width: 70,
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: `1.5px solid ${C.border}`,
                        fontSize: 13,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        outline: "none",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: 16, fontWeight: 800, color: C.navy }}>
              Estimated Total:{" "}
              <span style={{ fontFamily: "monospace" }}>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </p>
            <Btn variant="success">Place Order</Btn>
          </div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.t1,
                marginBottom: 14,
              }}
            >
              Compliance Discount Simulator
            </p>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-end",
                marginBottom: 10,
              }}
            >
              <div>
                <label
                  style={{
                    fontSize: 10,
                    color: C.t2,
                    fontWeight: 700,
                    display: "block",
                    marginBottom: 5,
                  }}
                >
                  DISCOUNT %
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Enter %"
                  style={{
                    padding: "9px 12px",
                    borderRadius: 7,
                    border: `1.5px solid ${C.border}`,
                    fontSize: 14,
                    fontFamily: "monospace",
                    width: 100,
                    fontWeight: 700,
                    outline: "none",
                  }}
                />
              </div>
              <Btn small onClick={() => discount && setDiscountModal(true)}>
                Validate
              </Btn>
            </div>
            <p style={{ fontSize: 10, color: C.t2 }}>
              Maharashtra state cap: {MAX_DISCOUNT}% maximum
            </p>
          </Card>
          <Card>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.t1,
                marginBottom: 10,
              }}
            >
              Order Validation
            </p>
            {[
              { label: "State Pricing", status: "Valid" },
              { label: "Bid Allocation", status: "Valid" },
              { label: "Credit Headroom", status: "₹62,500" },
              { label: "Excise Trigger", status: "Auto on submit" },
            ].map((v) => (
              <StatRow key={v.label} label={v.label} value={v.status} />
            ))}
          </Card>
        </div>
      </div>

      <Modal
        open={discountModal}
        onClose={() => setDiscountModal(false)}
        title=""
      >
        {!discountValid ? (
          <div>
            <div
              style={{
                background: "#FEF2F2",
                borderRadius: 10,
                padding: 20,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: C.danger,
                  marginBottom: 8,
                }}
              >
                Discount Cap Exceeded
              </p>
              <p style={{ fontSize: 13, color: "#6B7280" }}>
                Requested {discount}% exceeds Maharashtra's promotional cap of{" "}
                {MAX_DISCOUNT}%.
              </p>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>
                Submission blocked by compliance engine.
              </p>
            </div>
            <Btn variant="danger" onClick={() => setDiscountModal(false)}>
              Revise Discount
            </Btn>
          </div>
        ) : (
          <div>
            <div
              style={{
                background: "#F0FDF4",
                borderRadius: 10,
                padding: 20,
                marginBottom: 16,
                textAlign: "center",
                border: `1.5px solid #BBF7D0`,
              }}
            >
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: C.success,
                  marginBottom: 8,
                }}
              >
                Discount Valid
              </p>
              <p style={{ fontSize: 13, color: "#166534" }}>
                {discount}% is within Maharashtra's promotional guidelines.
              </p>
            </div>
            <Btn variant="success" onClick={() => setDiscountModal(false)}>
              Confirm & Apply
            </Btn>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ─── SALES REP PORTAL ─────────────────────────────────────────────────────────

const SalesRepRoute = () => {
  const [selected, setSelected] = useState(null);
  const [discount, setDiscount] = useState("");
  const [discountModal, setDiscountModal] = useState(false);
  const MAX_DISCOUNT = 12;
  const discountValid = parseFloat(discount) <= MAX_DISCOUNT;

  const applyDiscount = () => discount && setDiscountModal(true);

  if (selected) {
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          style={{
            background: "none",
            border: "none",
            color: C.green,
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 13,
            marginBottom: 20,
            padding: 0,
          }}
        >
          ← Back to Route
        </button>
        <div
          style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20 }}
        >
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 18,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    color: C.t2,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Outlet Detail
                </p>
                <h2
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: C.navy,
                    margin: "4px 0",
                  }}
                >
                  {selected.name}
                </h2>
              </div>
              <Badge label={selected.creditRisk} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 16,
              }}
            >
              {[
                { label: "Last Order", value: selected.lastOrder },
                { label: "Credit Days", value: `${selected.creditDays} days` },
                { label: "Stock Level", value: selected.stock },
                { label: "Asset Installed", value: selected.asset },
              ].map((f) => (
                <div
                  key={f.label}
                  style={{
                    background: "#F8FAFC",
                    borderRadius: 7,
                    padding: 12,
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      color: C.t2,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {f.label}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
            {selected.creditRisk === "high" && (
              <div
                style={{
                  background: "#FEF2F2",
                  borderRadius: 7,
                  padding: "10px 14px",
                  fontSize: 12,
                  color: C.danger,
                  fontWeight: 600,
                }}
              >
                Credit Risk HIGH — {selected.creditDays} days outstanding.
                Verify payment before placing order.
              </div>
            )}
          </Card>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card
              style={{
                background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy2} 100%)`,
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  color: C.gold,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  marginBottom: 8,
                }}
              >
                BREWPULSE™ AI
              </p>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                Push Wheat Beer
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#94A3B8",
                  marginTop: 4,
                  lineHeight: 1.6,
                }}
              >
                High demand zone. Flavor profile matches Pune palate cluster
                (banana ester, soft malt). Demand index: 85/100. Suggest 4-case
                push.
              </p>
              <div style={{ marginTop: 14 }}>
                <Btn small>Add to Order</Btn>
              </div>
            </Card>

            <Card>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.t1,
                  marginBottom: 12,
                }}
              >
                Compliance Discount Simulator
              </p>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <div>
                  <label
                    style={{
                      fontSize: 10,
                      color: C.t2,
                      fontWeight: 700,
                      display: "block",
                      marginBottom: 5,
                    }}
                  >
                    DISCOUNT %
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Enter %"
                    style={{
                      padding: "9px 12px",
                      borderRadius: 7,
                      border: `1.5px solid ${C.border}`,
                      fontSize: 14,
                      fontFamily: "monospace",
                      width: 100,
                      fontWeight: 700,
                      outline: "none",
                    }}
                  />
                </div>
                <Btn small onClick={applyDiscount}>
                  Check
                </Btn>
              </div>
              <p style={{ fontSize: 10, color: C.t2, marginTop: 8 }}>
                Maharashtra promotional cap: {MAX_DISCOUNT}% maximum
              </p>
            </Card>
          </div>
        </div>

        <Modal
          open={discountModal}
          onClose={() => setDiscountModal(false)}
          title=""
        >
          {!discountValid ? (
            <div>
              <div
                style={{
                  background: "#FEF2F2",
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: C.danger,
                    marginBottom: 8,
                  }}
                >
                  Discount Cap Exceeded
                </p>
                <p style={{ fontSize: 13, color: "#6B7280" }}>
                  Exceeds Maharashtra cap of {MAX_DISCOUNT}%. Blocked by
                  compliance engine.
                </p>
              </div>
              <Btn variant="danger" onClick={() => setDiscountModal(false)}>
                Revise
              </Btn>
            </div>
          ) : (
            <div>
              <div
                style={{
                  background: "#F0FDF4",
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 16,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: C.success,
                    marginBottom: 8,
                  }}
                >
                  Discount Valid
                </p>
                <p style={{ fontSize: 13, color: "#166534" }}>
                  {discount}% is within state guidelines.
                </p>
              </div>
              <Btn variant="success" onClick={() => setDiscountModal(false)}>
                Confirm & Apply
              </Btn>
            </div>
          )}
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.navy,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Today's Route
        </h1>
        <p style={{ color: C.t2, fontSize: 12, marginTop: 4 }}>
          Arjun Kumar · Pune West Zone · 27 Feb 2026
        </p>
      </div>

      <div
        style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}
      >
        <KpiCard
          title="Outlets Today"
          value="5"
          sub="1 visited · 4 pending"
          accent={C.navy}
        />
        <KpiCard
          title="Revenue Target"
          value="₹1.2 L"
          sub="48% achieved so far"
          accent={C.green}
        />
        <KpiCard
          title="High Risk Outlet"
          value="1"
          sub="Royal Wines — 45 credit days"
          alert="Review before visit"
        />
      </div>

      <Card>
        <SectionTitle sub="Tap any outlet to open details, BrewPulse recommendation, and discount simulator">
          Outlet Schedule
        </SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {OUTLETS.map((o, i) => (
            <div
              key={o.id}
              onClick={() => setSelected(o)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 16px",
                background: o.creditRisk === "high" ? "#FFF5F5" : "#F8FAFC",
                borderRadius: 9,
                cursor: "pointer",
                border: `1.5px solid ${o.creditRisk === "high" ? "#FCA5A5" : "transparent"}`,
                transition: "all 0.14s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.navy;
                e.currentTarget.style.background = "#EFF6FF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor =
                  o.creditRisk === "high" ? "#FCA5A5" : "transparent";
                e.currentTarget.style.background =
                  o.creditRisk === "high" ? "#FFF5F5" : "#F8FAFC";
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: o.status === "visited" ? C.green : "#E5E7EB",
                  color: o.status === "visited" ? "#fff" : C.t2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 13,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>
                  {o.name}
                </p>
                <p style={{ fontSize: 11, color: C.t2, marginTop: 2 }}>
                  Last order: {o.lastOrder} · Slow-moving: {o.slowSku}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {o.creditRisk !== "low" && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: o.creditRisk === "high" ? C.danger : C.warning,
                    }}
                  >
                    {o.creditRisk === "high" ? "High Risk" : "Watch"}
                  </span>
                )}
                <Badge label={o.status} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const RepTargets = () => (
  <div>
    <h1
      style={{
        fontSize: 22,
        fontWeight: 800,
        color: C.navy,
        marginBottom: 8,
        letterSpacing: "-0.02em",
      }}
    >
      Targets
    </h1>
    <p style={{ color: C.t2, fontSize: 12, marginBottom: 28 }}>
      Monthly performance vs. targets
    </p>
    <div
      style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}
    >
      <KpiCard
        title="Revenue (MTD)"
        value="₹57,600"
        sub="Target: ₹1,20,000 · 48%"
        accent={C.navy}
      />
      <KpiCard
        title="Orders Placed"
        value="7"
        sub="Target: 15 this month"
        accent={C.green}
      />
      <KpiCard
        title="New Outlets"
        value="0"
        sub="Target: 2 this month"
        alert="No new additions yet"
      />
    </div>
    <Card>
      <SectionTitle>SKU-Level Sales Performance</SectionTitle>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={FLAVOR_PROFILES.map((s) => ({
            name: s.name,
            sold: Math.round(s.velocity * 0.8),
            target: 80,
          }))}
          barSize={22}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: C.t2 }} />
          <YAxis tick={{ fontSize: 10, fill: C.t2 }} />
          <Tooltip contentStyle={TooltipStyle} />
          <Bar
            dataKey="sold"
            name="Cases Sold"
            fill={C.green}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="target"
            name="Target"
            fill="#E2E8F0"
            radius={[4, 4, 0, 0]}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  </div>
);

const RepAssets = () => (
  <div>
    <h1
      style={{
        fontSize: 22,
        fontWeight: 800,
        color: C.navy,
        marginBottom: 8,
        letterSpacing: "-0.02em",
      }}
    >
      Asset Management
    </h1>
    <p style={{ color: C.t2, fontSize: 12, marginBottom: 28 }}>
      Refrigerators · Draught dispensers · POS branding material
    </p>
    <Card>
      <SectionTitle sub="Brewery-owned assets placed at outlets — ROI tracking">
        Asset Inventory
      </SectionTitle>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {[
              "Outlet",
              "Asset Type",
              "Installed",
              "Last Cleaned",
              "Status",
            ].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "8px 12px",
                  fontSize: 10,
                  color: C.t2,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  borderBottom: `2px solid ${C.border}`,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            {
              outlet: "Pai Wines, Koregaon Park",
              asset: "Fridge (120L)",
              installed: "Jan 12",
              cleaned: "Feb 18",
              status: "Good",
            },
            {
              outlet: "Supreme Beverages, Viman",
              asset: "Tap + Fridge",
              installed: "Dec 04",
              cleaned: "Feb 10",
              status: "Maintenance Due",
            },
            {
              outlet: "City Spirits, Baner",
              asset: "Fridge (80L)",
              installed: "Feb 02",
              cleaned: "Feb 22",
              status: "Good",
            },
            {
              outlet: "Metro Cellars, Hadapsar",
              asset: "Fridge (120L)",
              installed: "Jan 28",
              cleaned: "Feb 20",
              status: "Good",
            },
          ].map((a, i) => (
            <tr
              key={i}
              style={{ background: i % 2 === 0 ? "#FAFBFD" : "#fff" }}
            >
              <td
                style={{
                  padding: "10px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.t1,
                }}
              >
                {a.outlet}
              </td>
              <td style={{ padding: "10px 12px", fontSize: 12, color: C.t2 }}>
                {a.asset}
              </td>
              <td
                style={{
                  padding: "10px 12px",
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: C.t2,
                }}
              >
                {a.installed}
              </td>
              <td
                style={{
                  padding: "10px 12px",
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: C.t2,
                }}
              >
                {a.cleaned}
              </td>
              <td style={{ padding: "10px 12px" }}>
                <Badge label={a.status === "Good" ? "Compliant" : "pending"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

// ─── PORTAL CONFIGS ───────────────────────────────────────────────────────────

const SELLER_NAV = [
  { id: "dashboard", label: "Dashboard" },
  { id: "production", label: "Production" },
  { id: "inventory", label: "Inventory" },
  { id: "excise", label: "Excise Reports", badge: "USP" },
  { id: "brewpulse", label: "BrewPulse™ AI", badge: "AI" },
  { id: "finance", label: "Finance" },
  { id: "settings", label: "Settings" },
];

const CUSTOMER_NAV = [
  { id: "cdashboard", label: "Dashboard" },
  { id: "orders", label: "Order Placement" },
  { id: "invoices", label: "Invoices" },
  { id: "credit", label: "Credit" },
  { id: "stock", label: "Inventory Status" },
];

const REP_NAV = [
  { id: "route", label: "Today's Route" },
  { id: "outlets", label: "Outlets" },
  { id: "targets", label: "Targets" },
  { id: "assets", label: "Asset Management" },
];

// ─── CUSTOMER CREDIT PAGE ─────────────────────────────────────────────────────

const CustomerCreditPage = () => (
  <div>
    <h1
      style={{
        fontSize: 22,
        fontWeight: 800,
        color: C.navy,
        marginBottom: 8,
        letterSpacing: "-0.02em",
      }}
    >
      Credit Overview
    </h1>
    <p style={{ color: C.t2, fontSize: 12, marginBottom: 28 }}>
      Outstanding balances · Aging buckets · Payment history
    </p>
    <div
      style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}
    >
      <KpiCard title="Credit Limit" value="₹2,50,000" accent={C.navy} />
      <KpiCard
        title="Utilized"
        value="₹1,87,500"
        sub="75% of limit"
        accent={C.warning}
      />
      <KpiCard
        title="Available"
        value="₹62,500"
        sub="Headroom remaining"
        accent={C.green}
      />
      <KpiCard
        title="Overdue (30d+)"
        value="₹15,600"
        alert="Payment required"
      />
    </div>
    <Card>
      <SectionTitle sub="Outstanding invoices">Payment History</SectionTitle>
      {INVOICES.map((inv) => (
        <div
          key={inv.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 0",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: C.navy,
                fontFamily: "monospace",
              }}
            >
              {inv.id}
            </p>
            <p style={{ fontSize: 11, color: C.t2, marginTop: 2 }}>
              {inv.sku} · {inv.date}
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: C.t1,
                fontFamily: "monospace",
              }}
            >
              ₹{inv.amount.toLocaleString("en-IN")}
            </span>
            <Badge label={inv.status} />
          </div>
        </div>
      ))}
    </Card>
  </div>
);

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [role, setRole] = useState("seller");
  const [sellerPage, setSellerPage] = useState("dashboard");
  const [customerPage, setCustomerPage] = useState("cdashboard");
  const [repPage, setRepPage] = useState("route");

  const renderSeller = () => {
    switch (sellerPage) {
      case "dashboard":
        return <SellerDashboard />;
      case "production":
        return <Production />;
      case "inventory":
        return <Inventory />;
      case "excise":
        return <ExciseReports />;
      case "brewpulse":
        return <BrewPulse />;
      case "finance":
        return <Finance />;
      case "settings":
        return <SettingsPage />;
      default:
        return <SellerDashboard />;
    }
  };

  const renderCustomer = () => {
    switch (customerPage) {
      case "cdashboard":
        return <CustomerDashboard />;
      case "orders":
        return <CustomerOrderPage />;
      case "credit":
        return <CustomerCreditPage />;
      case "invoices":
        return (
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: C.navy,
                marginBottom: 8,
                letterSpacing: "-0.02em",
              }}
            >
              Invoices
            </h1>
            <p style={{ color: C.t2, fontSize: 12, marginBottom: 28 }}>
              All invoices and payment status
            </p>
            <Card>
              {INVOICES.map((inv) => (
                <div
                  key={inv.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.navy,
                        fontFamily: "monospace",
                      }}
                    >
                      {inv.id}
                    </p>
                    <p style={{ fontSize: 11, color: C.t2, marginTop: 2 }}>
                      {inv.sku} · {inv.date}
                    </p>
                  </div>
                  <div
                    style={{ display: "flex", gap: 14, alignItems: "center" }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: C.t1,
                        fontFamily: "monospace",
                      }}
                    >
                      ₹{inv.amount.toLocaleString("en-IN")}
                    </span>
                    <Badge label={inv.status} />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        );
      default:
        return <CustomerDashboard />;
    }
  };

  const renderRep = () => {
    switch (repPage) {
      case "route":
        return <SalesRepRoute />;
      case "outlets":
        return <SalesRepRoute />;
      case "targets":
        return <RepTargets />;
      case "assets":
        return <RepAssets />;
      default:
        return <SalesRepRoute />;
    }
  };

  const getNav = () => {
    if (role === "seller")
      return {
        items: SELLER_NAV,
        active: sellerPage,
        setActive: setSellerPage,
      };
    if (role === "customer")
      return {
        items: CUSTOMER_NAV,
        active: customerPage,
        setActive: setCustomerPage,
      };
    return { items: REP_NAV, active: repPage, setActive: setRepPage };
  };

  const nav = getNav();

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        background: C.bg,
        minHeight: "100vh",
        color: C.t1,
      }}
    >
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=DM+Mono:wght@400;500;700&display=swap');
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus { outline: 2px solid #0B1F3B; outline-offset: 1px; }
        button:focus-visible { outline: 2px solid #0B1F3B; outline-offset: 2px; }
      `}</style>

      <Header role={role} setRole={setRole} />

      <div style={{ display: "flex" }}>
        <Sidebar {...nav} />
        <main
          style={{
            flex: 1,
            padding: "28px 32px",
            minHeight: "calc(100vh - 56px)",
            maxWidth: "calc(100vw - 216px)",
            overflowX: "hidden",
          }}
        >
          {role === "seller" && renderSeller()}
          {role === "customer" && renderCustomer()}
          {role === "rep" && renderRep()}
        </main>
      </div>
    </div>
  );
}
