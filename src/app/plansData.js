import i18n from "../i18n";

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
