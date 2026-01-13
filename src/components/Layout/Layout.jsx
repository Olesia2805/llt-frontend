import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Header from "../Header/Header";
import HeaderForm from "../Header/HeaderForm";
import SideBar from "../SideBar/SideBar";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalContainer from "../ModalContainer/ModalContainer";

import styles from "./Layout.module.css";

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const formPages = ["/signup", "/login"];
  const isFormPage = formPages.includes(location.pathname);

  return (
    <div className={styles.layout}>
      {isFormPage ? <HeaderForm /> : !isAuthenticated && <Header />}

      <div className={styles.content}>
        {isAuthenticated && (
          <div className={styles.sidebarWrapper}>
            <SideBar />
          </div>
        )}

        <div className={styles.mainWrapper}>
          <Main className={styles.mainContent}>
            <Outlet />
          </Main>

          {!isFormPage && <Footer />}
        </div>
      </div>

      <ModalContainer />
    </div>
  );
};

export default Layout;
