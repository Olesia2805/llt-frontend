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
    id: "my_trips",
    label: "my_trips",
    icon: FaRegCompass,
    path: "/mytrips",
  },
  {
    id: "settings",
    label: "settings",
    icon: MdSettings,
    path: "/settings",
  },
];

export { sidebarItems };
