export interface Service {
  id: string;
  title: string;
  desc: string;
  iconName: string; // lucide icon name used in ServicesBento
  gradient: string; // Tailwind gradient classes for hover bg
}

export const SERVICES: Service[] = [
  {
    id: "domestic",
    title: "Domestic Cargo",
    desc: "Fast, reliable ground delivery across every city in Saudi Arabia.",
    iconName: "Truck",
    gradient: "from-red-50 to-white",
  },
  {
    id: "international",
    title: "International Cargo",
    desc: "Sea & Air freight solutions connecting KSA to the world.",
    iconName: "Globe",
    gradient: "from-sky-50 to-white",
  },
  {
    id: "airport",
    title: "Airport to Airport",
    desc: "Worldwide airport-to-airport service for time-critical cargo.",
    iconName: "Plane",
    gradient: "from-blue-50 to-white",
  },
  {
    id: "import",
    title: "Import to KSA",
    desc: "From any country, delivered to all KSA cities door-to-door.",
    iconName: "PackageOpen",
    gradient: "from-amber-50 to-white",
  },
  {
    id: "secure",
    title: "Safe & Secure",
    desc: "Full-coverage protection and insurance on every shipment.",
    iconName: "ShieldCheck",
    gradient: "from-emerald-50 to-white",
  },
  {
    id: "ontime",
    title: "On-Time Delivery",
    desc: "Same-day and next-day options — we guarantee your timeline.",
    iconName: "Clock",
    gradient: "from-orange-50 to-white",
  },
  {
    id: "door",
    title: "Door-to-Door",
    desc: "We pick up from your door and deliver to theirs, every time.",
    iconName: "Home",
    gradient: "from-rose-50 to-white",
  },
  {
    id: "support",
    title: "24/7 Support",
    desc: "Dedicated customer service — always here when you need us.",
    iconName: "Headphones",
    gradient: "from-purple-50 to-white",
  },
];
