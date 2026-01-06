import { MdGavel, MdSecurity, MdAccessibilityNew } from "react-icons/md";
import { RiDatabase2Fill } from "react-icons/ri";

export const NAV_ITEMS = {
  terms: {
    id: "terms-of-service",
    title: "sidebar.navTerms",
    Icon: MdGavel,
  },
  privacy: {
    id: "privacy-policy",
    title: "sidebar.navPrivacy",
    Icon: MdSecurity,
  },
  data: {
    id: "data-collection",
    title: "sidebar.navData",
    Icon: RiDatabase2Fill,
  },
  rights: {
    id: "user-rights",
    title: "sidebar.navRights",
    Icon: MdAccessibilityNew,
  },
};
