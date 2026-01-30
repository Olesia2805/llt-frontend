import i18n from "../i18n";
import { DNA_ICONS, TRANSPORT_ICONS } from "./sectionPreferencesIcons";

export const TRAVELER_DNA = () => {
  const featuresJson = i18n.getResource(i18n.language, "tagPreferences", "dna");

  return Object.keys(featuresJson).map((key) => ({
    id: key,
    key,
    title: featuresJson[key],
    Icon: DNA_ICONS[key],
  }));
};

export const TRANSPORT = () => {
  const featuresJson = i18n.getResource(
    i18n.language,
    "tagPreferences",
    "transportOptions",
  );

  return Object.keys(featuresJson).map((key) => ({
    id: key,
    key,
    title: featuresJson[key],
    Icon: TRANSPORT_ICONS[key],
  }));
};
