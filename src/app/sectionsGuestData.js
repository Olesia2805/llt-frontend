import i18n from "../i18n";
import { OFFER_ICONS, REASONS_ICONS } from "./sectionsGuestIcons";

export const CHOOSE_REASONS = () => {
  const reasonsJson = i18n.getResource(
    i18n.language,
    "homeGuest",
    "chooseReasons.items",
  );

  return reasonsJson.map((reason, index) => ({
    id: index,
    title: reason.title,
    description: reason.description,
    Icon: REASONS_ICONS[reason.key],
  }));
};

export const OFFER_FEATURES = () => {
  const featuresJson = i18n.getResource(
    i18n.language,
    "homeGuest",
    "offers.items",
  );

  return featuresJson.map((feature, index) => ({
    id: index,
    title: feature.title,
    description: feature.description,
    Icon: OFFER_ICONS[feature.key],
  }));
};

export const PRICE_PLANS = () => {
  const plansObj = i18n.getResource(
    i18n.language,
    "homeGuest",
    "pricePlans.items",
  );

  const planHrefs = {
    explorer: "/signup",
    nomad: "/signup",
    globetrotter: "/signup",
  };

  if (!plansObj) return [];

  return Object.entries(plansObj).map(([key, plan]) => ({
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
    isPopular: plan.isPopular,
    href: planHrefs[key] || "/",
  }));
};

export const TESTIMONIALS = () => {
  const testimonialsJson = i18n.getResource(
    i18n.language,
    "homeGuest",
    "testimonials.items",
  );

  return testimonialsJson.map((testimonial, index) => ({
    id: index,
    name: testimonial.name,
    role: testimonial.role,
    rating: testimonial.rating,
    text: testimonial.text,
  }));
};
