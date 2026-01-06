import TableOfContents from "../../components/TableOfContents/TableOfContents";
import PolicySection from "../../components/PolicySection/PolicySection";
import { useTranslation } from "react-i18next";
import styles from "./PoliciesPage.module.css";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import { FaHistory } from "react-icons/fa";
import { NAV_ITEMS } from "../../app/sectionPolicyIcons.js";

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
                <h3>{t("terms.acceptanceTitle")}</h3>
                <p>{t("terms.acceptanceText")}</p>
              </div>
              <div className={styles.subSection}>
                <h3>{t("terms.responsibilitiesTitle")}</h3>
                <p>{t("terms.responsibilitiesText")}</p>
              </div>
            </PolicySection>

            {/* 2. Privacy Policy */}
            <PolicySection
              id={NAV_ITEMS.privacy.id}
              title={t(NAV_ITEMS.privacy.title)}
              Icon={NAV_ITEMS.privacy.Icon}
            >
              <p>{t("privacy.intro")}</p>
            </PolicySection>

            {/* 3. Data Collection */}
            <PolicySection
              id={NAV_ITEMS.data.id}
              title={t(NAV_ITEMS.data.title)}
              Icon={NAV_ITEMS.data.Icon}
            >
              <div className={styles.subSection}>
                <h3>{t("dataCollection.cookiesTitle")}</h3>
                <p>{t("dataCollection.cookiesText")}</p>
              </div>
            </PolicySection>

            {/* 4. User Rights */}
            <PolicySection
              id={NAV_ITEMS.rights.id}
              title={t(NAV_ITEMS.rights.title)}
              Icon={NAV_ITEMS.rights.Icon}
            >
              <div className={styles.subSection}></div>
            </PolicySection>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PoliciesPage;
