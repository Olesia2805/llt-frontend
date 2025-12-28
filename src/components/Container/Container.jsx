import containerCSS from "./Container.module.css";

const Container = ({ children }) => {
  return <div className={containerCSS.container}>{children}</div>;
};

export default Container;
