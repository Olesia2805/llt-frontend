import styles from "./Offer.module.css";
import forestImg from "../../assets/img/forest.jpg";
import Section from "../Section/Section";
import OfferListCard from "../OfferListCard/OfferListCard";
import { useTranslation } from "react-i18next";
import { OFFER_FEATURES } from "../../app/sectionsGuestData.js";

const Offer = () => {
  const { t } = useTranslation("homeGuest");

  return (
    <Section>
      <h2>{t("offer.title")}</h2>
      <p>{t("offer.description")}</p>

      <figure>
        <img src={forestImg} alt="forest" />
        <figcaption>
          <q className={styles.quote}>{t("offer.quote")}</q>
        </figcaption>
      </figure>

      <ul>
        {OFFER_FEATURES(t).map((feature) => (
          <OfferListCard key={feature.id} {...feature} />
        ))}
      </ul>
    </Section>
  );
};

export default Offer;
