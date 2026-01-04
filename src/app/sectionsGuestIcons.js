import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaRegClock,
  FaCheck,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { MdOutlineAltRoute } from "react-icons/md";
import { LuSprout } from "react-icons/lu";
import { TbMapSearch } from "react-icons/tb";
import { FaListCheck, FaMagnifyingGlassChart } from "react-icons/fa6";
import { RiDoubleQuotesR } from "react-icons/ri";
import { PiMapTrifoldBold } from "react-icons/pi";
import { IoSunny, IoMoon } from "react-icons/io5";

export const SOCIAL_NETWORKS = [
  { link: "https://facebook.com", Icon: FaFacebook, label: "Facebook" },
  { link: "https://instagram.com", Icon: FaInstagram, label: "Instagram" },
  { link: "https://youtube.com", Icon: FaYoutube, label: "YouTube" },
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

export const TESTIMONIAL_ICONS = {
  quotes: RiDoubleQuotesR,
  star: FaStar,
  halfstar: FaStarHalfAlt,
};

export {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaRegClock,
  FaStar,
  FaStarHalfAlt,
  FaCheck,
  FaListCheck,
  FaMagnifyingGlassChart,
  MdOutlineAltRoute,
  LuSprout,
  TbMapSearch,
  RiDoubleQuotesR,
  PiMapTrifoldBold,
  IoSunny,
  IoMoon,
};
