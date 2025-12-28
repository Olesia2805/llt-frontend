import sectionCSS from "./Section.module.css";

const Section = ({ children }) => {
  return <div className={sectionCSS.section}>{children}</div>;
};

export default Section;
