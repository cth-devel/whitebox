export interface AppFeature {
  id: string;
  label: string;
  desc: string;
  iconName: string; // lucide icon name
}

export const APP_FEATURES: AppFeature[] = [
  {
    id: "schedule",
    label: "Schedule Pickup",
    desc: "Book a collection at your door in seconds.",
    iconName: "CalendarCheck",
  },
  {
    id: "redirect",
    label: "Redirect Package",
    desc: "Change delivery address mid-transit, hassle-free.",
    iconName: "Navigation",
  },
  {
    id: "track",
    label: "Track Locations",
    desc: "Real-time updates from pickup to doorstep.",
    iconName: "MapPin",
  },
];

export const HEADLINE_LINE1 = "One tap,";
export const HEADLINE_LINE2 = "and we're on the way";
