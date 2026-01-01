import { FaFacebook, FaInstagram, FaYoutube, FaRegClock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { LuSplit } from "react-icons/lu";
import { MdOutlineAltRoute } from "react-icons/md";
import { LuSprout } from "react-icons/lu";
import { TbMapSearch } from "react-icons/tb";
import { FaListCheck, FaMagnifyingGlassChart } from "react-icons/fa6";

export const SOCIAL_NETWORKS = [
  { link: "https://facebook.com", Icon: FaFacebook },
  { link: "https://instagram.com", Icon: FaInstagram },
  { link: "https://youtube.com", Icon: FaYoutube },
];

export const REASONS_ICONS = {
  time: FaRegClock,
  relief: LuSprout,
  itineraries: MdOutlineAltRoute,
};

export const OFFER_ICONS = {
  packing: FaListCheck,
  routes: TbMapSearch,
  statistic: FaMagnifyingGlassChart,
};
