import i18n from "../i18n";
import { OFFER_ICONS } from "./sectionsGuestIcons";

export const CHOOSE_REASONS = () => {
  const reasonsJson = i18n.getResource(
    i18n.language,
    "homeGuest",
    "chooseReasons.items"
  );

  return reasonsJson.map((item, index) => ({
    id: index,
    title: item.title,
    description: item.description,
  }));
};

export const OFFER_FEATURES = () => {
  const featuresJson = i18n.getResource(
    i18n.language,
    "homeGuest",
    "offer.features"
  );

  return featuresJson.map((feature, index) => ({
    id: index,
    title: feature.title,
    description: feature.description,
    Icon: OFFER_ICONS[feature.key],
  }));
};

export const PRICE_PLANS = () => {
  const plansJson = i18n.getResource(i18n.language, "homeGuest", "pricePlans");

  return Object.keys(plansJson)
    .filter((key) => key !== "title" && key !== "description")
    .map((key) => {
      const plan = plansJson[key];
      return {
        id: key,
        title: plan.title,
        description: plan.description,
        price: plan.price,
        period: plan.period,
        features: (plan.features || []).map((text, index) => ({
          id: index + 1,
          text,
        })),
        buttonText: plan.button,
        popular: plan.popular,
      };
    });
};
