import i18n from "../i18n";
import { DNA_ICONS, TRANSPORT_ICONS } from "./sectionProfileIcons";

export const TRAVELER_DNA = () => {
  const featuresJson = i18n.getResource(i18n.language, "profile", "dna");

  return Object.keys(featuresJson).map((key, index) => ({
    id: index,
    key,
    title: featuresJson[key],
    Icon: DNA_ICONS[key],
  }));
};

export const TRANSPORT = () => {
  const featuresJson = i18n.getResource(
    i18n.language,
    "profile",
    "transportOptions",
  );

  return Object.keys(featuresJson).map((key, index) => ({
    id: index,
    key,
    title: featuresJson[key],
    Icon: TRANSPORT_ICONS[key],
  }));
};
