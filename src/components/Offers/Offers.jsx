import { useState } from "react";
import styles from "./Offers.module.css";
import forestResolution from "../../assets/img/forest-high-resolution.webp";
import forestDesktop from "../../assets/img/forest-desktop.webp";
import forestMobile from "../../assets/img/forest-mobile.webp";
import Section from "../Section/Section.jsx";
import Container from "../Container/Container.jsx";
import OffersListCard from "../OffersListCard/OffersListCard.jsx";
import { useTranslation } from "react-i18next";
import { OFFER_FEATURES } from "../../app/sectionsGuestData.js";

const Offers = () => {
  const { t } = useTranslation("homeGuest");

  const [firebugs] = useState(() =>
    [...Array(15)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      xMove: Math.random() * 60 - 30,
      yMove: Math.random() * 60 - 30,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      scale: 0.3 + Math.random() * 0.7,
    }))
  );

  return (
    <Section>
      <Container>
        <div className="sectionHeaderWrapper">
          <h2>{t("offers.title")}</h2>
          <p>{t("offers.description")}</p>
        </div>

        <div className={styles.contentWrapper}>
          <figure className={styles.figure}>
            <div className={styles.imageWrapper}>
              <picture>
                <source media="(max-width: 768px)" srcSet={forestMobile} />
                <source
                  srcSet={`${forestDesktop} 1x, ${forestResolution} 2x`}
                />
                <img
                  className={styles.image}
                  src={forestDesktop}
                  alt={t("offers.imageAlt")}
                  width="450"
                  height="570"
                  loading="lazy"
                />
              </picture>
              <div className={styles.overlay} />

              {firebugs.map((f, i) => (
                <span
                  key={i}
                  className={styles.firebug}
                  style={{
                    top: `${f.top}%`,
                    left: `${f.left}%`,
                    "--x": `${f.xMove}vw`,
                    "--y": `${f.yMove}vh`,
                    "--scale": f.scale,
                    animationDuration: `${f.duration}s`,
                    animationDelay: `${f.delay}s`,
                  }}
                />
              ))}
            </div>

            <figcaption className={styles.figcaption}>
              <q className={styles.quote}>{t("offers.quote")}</q>
            </figcaption>
          </figure>

          <ul className={styles.list}>
            {OFFER_FEATURES(t).map((feature) => (
              <OffersListCard key={feature.id} {...feature} />
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
};

export default Offers;
