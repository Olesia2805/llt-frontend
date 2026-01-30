import {
  MdDashboard,
  MdSettings,
  MdOutlinePersonPinCircle,
} from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

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
    icon: MdOutlinePersonPinCircle,
    path: "/profile",
  },
  {
    id: "myTrips",
    label: "myTrips",
    icon: FaRegCompass,
    path: "/my-trips",
  },
  {
    id: "recommendedTrips",
    label: "recommendedTrips",
    icon: AiOutlineLike,
    path: "/recommended-trips",
  },
  {
    id: "settings",
    label: "settings",
    icon: MdSettings,
    path: "/settings",
  },
];

export { sidebarItems };
