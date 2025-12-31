import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import tripPreviewCard from "../../assets/img/trip-preview-card.jpg";
// import Button from "../Button/Button";

const Hero = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <h1 dangerouslySetInnerHTML={{ __html: t("hero.title") }} />
      <p>{t("hero.description")}</p>
      <img src={tripPreviewCard} alt={t("hero.imageAlt")} />
    </Section>
  );
};

export default Hero;
