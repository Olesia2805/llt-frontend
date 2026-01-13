import { MdDashboard, MdPerson, MdSettings } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";

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
    icon: FaRegCompass,
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
