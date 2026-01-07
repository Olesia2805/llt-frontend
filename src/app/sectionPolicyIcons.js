import {
  MdGavel,
  MdSecurity,
  MdAccessibilityNew,
  MdLock,
  MdToc,
  MdArrowForward,
} from "react-icons/md";
import { RiDatabase2Fill } from "react-icons/ri";
import { FaHistory, FaCheckCircle } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

export const NAV_ITEMS = {
  terms: {
    id: "terms-of-service",
    navTitle: "sidebar.navTerms",
    title: "terms.title",
    Icon: MdGavel,
  },
  privacy: {
    id: "privacy-policy",
    navTitle: "sidebar.navPrivacy",
    title: "privacy.title",
    Icon: MdSecurity,
  },
  data: {
    id: "data-collection",
    navTitle: "sidebar.navData",
    title: "dataCollection.title",
    Icon: RiDatabase2Fill,
  },
  rights: {
    id: "user-rights",
    navTitle: "sidebar.navRights",
    title: "rights.title",
    Icon: MdAccessibilityNew,
  },
};

export {
  FaHistory,
  FaCheckCircle,
  IoShieldCheckmark,
  MdLock,
  GoDotFill,
  MdToc,
  MdArrowForward,
};
