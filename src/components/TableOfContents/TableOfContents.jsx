import { useTranslation } from "react-i18next";
import styles from "./TableOfContents.module.css";
import { MdToc, MdArrowForward } from "react-icons/md";
import { NAV_ITEMS } from "../../app/sectionPolicyIcons.js";
import { useEffect, useState } from "react";

const TableOfContents = () => {
  const { t } = useTranslation("policies");
  const [activeId, setActiveId] = useState("");

  const getHeaderOffset = () => {
    if (window.innerWidth < 768) return 72; // mobile
    return 120; // desktop
  };

  useEffect(() => {
    const headerOffset = getHeaderOffset();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${headerOffset}px 0px -60% 0px`,
        threshold: 0.1,
      }
    );

    Object.values(NAV_ITEMS).forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className={styles.wrapper}>
      <div className={styles.card}>
        <h3 className={styles.title}>
          <MdToc className={styles.icon} />
          {t("sidebar.tocTitle")}
        </h3>
        <hr className={styles.divider} />
        <nav>
          <ul className={styles.navList}>
            {Object.values(NAV_ITEMS).map((item) => (
              <li key={item.id} className={styles.navItem}>
                <a
                  href={`#${item.id}`}
                  className={`${styles.link} ${
                    activeId === item.id ? styles.active : ""
                  }`}
                >
                  <span>{t(item.title)}</span>
                  <MdArrowForward className={styles.arrow} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default TableOfContents;
