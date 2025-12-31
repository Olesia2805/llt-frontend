import i18n from "../i18n";

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
