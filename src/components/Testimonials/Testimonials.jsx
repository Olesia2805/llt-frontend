import Section from "../Section/Section";
import Container from "../Container/Container";
import { useTranslation } from "react-i18next";
import { TESTIMONIALS } from "../../app/sectionsGuestData.js";
import styles from "./Testimonials.module.css";
import TestimonialsCard from "../TestimonialsCard/TestimonialsCard.jsx";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const { t } = useTranslation("homeGuest");
  const testimonialsArray = TESTIMONIALS(t);

  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % testimonialsArray.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonialsArray.length]);

  const visibleItems = [];
  for (let i = 0; i < 3; i++) {
    visibleItems.push(
      testimonialsArray[(startIndex + i) % testimonialsArray.length]
    );
  }

  return (
    <Section>
      <Container>
        <div className="sectionHeaderWrapper">
          <h2>{t("testimonials.title")}</h2>
          <p>{t("testimonials.description")}</p>
        </div>

        <ul className={styles.list}>
          {visibleItems.map((testimonial) => (
            <TestimonialsCard key={testimonial.id} {...testimonial} />
          ))}
        </ul>
      </Container>
    </Section>
  );
};

export default Testimonials;
