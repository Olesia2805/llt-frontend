import { MdDashboard, MdPerson, MdFlight, MdSettings } from "react-icons/md";

const sidebarItems = [
  {
    id: "dashboard",
    label: "dashboard",
    icon: MdDashboard,
    path: "/",
  },
  {
    id: "profile",
    label: "profile",
    icon: MdPerson,
    path: "/profile",
  },
  {
    id: "trips",
    label: "trips",
    icon: MdFlight,
    path: "/trips",
  },
  {
    id: "settings",
    label: "settings",
    icon: MdSettings,
    path: "/settings",
  },
];

export { sidebarItems };
