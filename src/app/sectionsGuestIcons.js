import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { LuSplit } from "react-icons/lu";
import { MdOutlineAltRoute } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { RiFlowerFill } from "react-icons/ri";
import { TbMapSearch } from "react-icons/tb";
import { FaListCheck, FaMagnifyingGlassChart } from "react-icons/fa6";

export const SOCIAL_NETWORKS = [
  { link: "https://facebook.com", Icon: FaFacebook },
  { link: "https://instagram.com", Icon: FaInstagram },
  { link: "https://youtube.com", Icon: FaYoutube },
];

export const OFFER_ICONS = {
  packing: FaListCheck,
  routes: TbMapSearch,
  statistic: FaMagnifyingGlassChart,
};
