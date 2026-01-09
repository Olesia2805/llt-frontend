// [
//   {
//     id: "dashboard",
//     label: "sidebar.dashboard",
//     icon: "MdDashboard",
//     path: "/dashboard",
//   },
//   {
//     id: "profile",
//     label: "sidebar.profile",
//     icon: "MdPerson",
//     path: "/profile",
//   },
//   {
//     id: "trips",
//     label: "sidebar.trips",
//     icon: "MdFlight",
//     path: "/trips",
//   },
//   {
//     id: "settings",
//     label: "sidebar.settings",
//     icon: "MdSettings",
//     path: "/settings",
//   },
// ];

import { MdDashboard, MdPerson, MdFlight, MdSettings } from "react-icons/md";

const sidebarItems = [
  { id: "dashboard", icon: MdDashboard, path: "/" },
  { id: "profile", icon: MdPerson, path: "/profile" },
  { id: "trips", icon: MdFlight, path: "/trips" },
  { id: "settings", icon: MdSettings, path: "/settings" },
];

export { sidebarItems };
