import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NAV_ITEMS } from "../../app/sectionPolicyIcons.js";
import { MdToc, MdArrowForward } from "../../app/sectionPolicyIcons.js";
import Button from "../../components/Button/Button"; // Імпортуємо твій новий компонент
import styles from "./TableOfContents.module.css";

const TableOfContents = () => {
  const { t } = useTranslation("policies");
  const [activeId, setActiveId] = useState("");

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!isDesktop) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-120px 0px -60% 0px`,
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
                <Button
                  variant="ghost"
                  className={styles.link}
                  isActive={activeId === item.id}
                  onClick={() => handleNavClick(item.id)}
                  rightIcon={<MdArrowForward />}
                >
                  {t(item.navTitle)}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default TableOfContents;
