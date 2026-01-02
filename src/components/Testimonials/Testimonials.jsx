import { RiDoubleQuotesR } from "react-icons/ri";
import Section from "../Section/Section";
import Container from "../Container/Container";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <Container>
        <h2>{t("testimonials.title")}</h2>
        <p>{t("testimonials.description")}</p>
      </Container>
    </Section>
  );
};

export default Testimonials;
