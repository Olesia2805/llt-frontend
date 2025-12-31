import { useTranslation } from "react-i18next";
import Section from "../Section/Section";
import heroCardImg from "../../assets/img/hero-card.jpg";
// import Button from "../Button/Button";

const Hero = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <h1 dangerouslySetInnerHTML={{ __html: t("hero.title") }} />
      <p>{t("hero.description")}</p>
      <img src={heroCardImg} alt={t("hero.imageAlt")} />
    </Section>
  );
};

export default Hero;
