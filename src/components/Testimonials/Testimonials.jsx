import Section from "../Section/Section";
import Container from "../Container/Container";
import { useTranslation } from "react-i18next";
import { TESTIMONIALS } from "../../app/sectionsGuestData.js";
import styles from "./Testimonials.module.css";
import TestimonialsCard from "../TestimonialsCard/TestimonialsCard.jsx";
import { useState, useEffect } from "react";
import Button from "../Button/Button.jsx";

const Testimonials = () => {
  const { t } = useTranslation("homeGuest");
  const testimonialsArray = TESTIMONIALS(t);

  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 3;
  const totalDots = Math.ceil(testimonialsArray.length / itemsPerPage);
  const activeDotIndex = Math.floor(startIndex / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + itemsPerPage) % testimonialsArray.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonialsArray.length]);

  const handleDotClick = (index) => {
    setStartIndex(index * itemsPerPage);
  };

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

        <div className={styles.dotsWrapper}>
          {Array.from({ length: totalDots }).map((_, index) => {
            return (
              <Button
                key={index}
                variant="dot"
                isActive={index === activeDotIndex}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to page ${index + 1}`}
              />
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;
