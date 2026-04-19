export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  part: string;
  date: string;
  total: string;
  status: OrderStatus;
}

export const mockOrders: Order[] = [
  { id: "ORD-2026-012", customer: "Lior Katz",      part: "Brake Pads (x2)",       date: "2026-04-05", total: "₪240",   status: "Delivered"  },
  { id: "ORD-2026-011", customer: "Guy Manor",       part: "Headlight Assembly",     date: "2026-04-03", total: "₪380",   status: "Shipped"    },
  { id: "ORD-2026-010", customer: "Noa Shapiro",     part: "Oil Filter (x3)",        date: "2026-04-02", total: "₪90",    status: "Delivered"  },
  { id: "ORD-2026-009", customer: "Avi Ben-David",   part: "Alternator 12V",         date: "2026-03-30", total: "₪850",   status: "Delivered"  },
  { id: "ORD-2026-008", customer: "Michal Levi",     part: "Shock Absorber (Rear)",  date: "2026-03-28", total: "₪520",   status: "Processing" },
  { id: "ORD-2026-007", customer: "Ron Friedman",    part: "Timing Belt Kit",        date: "2026-03-25", total: "₪310",   status: "Shipped"    },
  { id: "ORD-2026-006", customer: "Dana Peretz",     part: "Radiator",               date: "2026-03-22", total: "₪640",   status: "Delivered"  },
  { id: "ORD-2026-005", customer: "Yoav Cohen",      part: "Starter Motor",          date: "2026-03-18", total: "₪420",   status: "Cancelled"  },
  { id: "ORD-2026-004", customer: "Shira Goldstein", part: "Air Filter (x2)",        date: "2026-03-15", total: "₪80",    status: "Delivered"  },
  { id: "ORD-2026-003", customer: "Eran Mizrahi",    part: "Spark Plugs Set",        date: "2026-03-10", total: "₪160",   status: "Delivered"  },
];
