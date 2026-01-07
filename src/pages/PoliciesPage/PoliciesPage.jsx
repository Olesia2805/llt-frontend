import TableOfContents from "../../components/TableOfContents/TableOfContents";
import PolicySection from "../../components/PolicySection/PolicySection";
import { useTranslation } from "react-i18next";
import styles from "./PoliciesPage.module.css";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import { NAV_ITEMS } from "../../app/sectionPolicyIcons.js";
import {
  FaHistory,
  FaCheckCircle,
  IoShieldCheckmark,
  MdLock,
  GoDotFill,
} from "../../app/sectionPolicyIcons.js";

const PoliciesPage = () => {
  const { t } = useTranslation("policies");

  return (
    <>
      <Section>
        <Container>
          <div className={styles.headerWrapper}>
            <h1>{t("hero.title")}</h1>
            <p>{t("hero.description")}</p>
            <div className={styles.lastUpdated}>
              <FaHistory /> <span>{t("hero.lastUpdated").toUpperCase()}</span>
            </div>
          </div>
        </Container>
      </Section>

      <hr className={styles.divider} />

      <Container>
        <div className={styles.pageBody}>
          <TableOfContents />

          <div className={styles.contentWrapper}>
            <p className={styles.welcomeText}>{t("welcomeText")}</p>

            {/* 1. Terms of Service */}
            <PolicySection
              id={NAV_ITEMS.terms.id}
              title={t(NAV_ITEMS.terms.title)}
              Icon={NAV_ITEMS.terms.Icon}
            >
              <div className={styles.subSection}>
                <h3 className={styles.subTitle}>
                  {t("terms.acceptanceTitle")}
                </h3>
                <p className={styles.subText}>{t("terms.acceptanceText")}</p>
              </div>

              <div className={styles.subSection}>
                <h3 className={styles.subTitle}>
                  {t("terms.responsibilitiesTitle")}
                </h3>
                <p className={styles.subText}>
                  {t("terms.responsibilitiesText")}
                </p>

                <ul className={styles.responsibilities}>
                  {t("terms.responsibilitiesList", { returnObjects: true }).map(
                    (item, index) => (
                      <li key={index} className={styles.responsibilityItem}>
                        <FaCheckCircle className={styles.icon} />
                        <p>{item}</p>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className={styles.subSection}>
                <h3 className={styles.subTitle}>{t("terms.bookingTitle")}</h3>
                <p className={styles.subText}>{t("terms.bookingText")}</p>
              </div>
            </PolicySection>

            {/* 2. Privacy Policy */}
            <PolicySection
              id={NAV_ITEMS.privacy.id}
              title={t(NAV_ITEMS.privacy.title)}
              Icon={NAV_ITEMS.privacy.Icon}
            >
              <p className={styles.subText}>{t("privacy.intro")}</p>

              <div className={styles.privacyGrid}>
                <div className={styles.privacyCard}>
                  <div className={styles.privacyCardHeader}>
                    <IoShieldCheckmark className={styles.icon} />
                    <h4>{t("privacy.minimalData.title")}</h4>
                  </div>
                  <p>{t("privacy.minimalData.text")}</p>
                </div>
                <div className={styles.privacyCard}>
                  <div className={styles.privacyCardHeader}>
                    <MdLock className={styles.icon} />
                    <h4>{t("privacy.fairUsage.title")}</h4>
                  </div>
                  <p>{t("privacy.fairUsage.text")}</p>
                </div>
              </div>

              <div className={styles.subSection}>
                <h3 className={styles.subTitle}>{t("privacy.collectTitle")}</h3>
                <p className={styles.subText}>{t("privacy.collectText")}</p>
              </div>
            </PolicySection>

            {/* 3. Data Collection */}
            <PolicySection
              id={NAV_ITEMS.data.id}
              title={t(NAV_ITEMS.data.title)}
              Icon={NAV_ITEMS.data.Icon}
            >
              <div className={styles.subSection}>
                <h3 className={styles.subTitle}>
                  {t("dataCollection.cookiesTitle")}
                </h3>
                <p className={styles.subText}>
                  {t("dataCollection.cookiesText")}
                </p>
              </div>

              <div className={styles.subSection}>
                <h3 className={styles.subTitle}>
                  {t("dataCollection.locationTitle")}
                </h3>
                <p className={styles.subText}>
                  {t("dataCollection.locationText")}
                </p>
              </div>
            </PolicySection>

            {/* 4. User Rights */}
            <PolicySection
              id={NAV_ITEMS.rights.id}
              title={t(NAV_ITEMS.rights.title)}
              Icon={NAV_ITEMS.rights.Icon}
            >
              <div className={styles.subSection}>
                <p className={styles.subText}>{t("rights.intro")}</p>

                <div className={styles.rightsGrid}>
                  {t("rights.rightsList", { returnObjects: true }).map(
                    (right, index) => (
                      <div key={index} className={styles.rightItem}>
                        <GoDotFill className={styles.icon} />

                        <div className={styles.rightContent}>
                          <h4 className={styles.rightTitle}>{right.title}</h4>
                          <p>{right.description}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className={styles.contactFooter}>
                  <p className={styles.contactText}>
                    {t("rights.contactDPO")}{" "}
                    <a
                      href="mailto:privacy@litelifetrip.com"
                      className={styles.mailLink}
                    >
                      privacy@litelifetrip.com
                    </a>
                  </p>
                </div>
              </div>
            </PolicySection>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PoliciesPage;
