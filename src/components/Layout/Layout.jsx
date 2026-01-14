import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Header from "../Header/Header";
import HeaderForm from "../Header/HeaderForm";
import SideBar from "../SideBar/SideBar";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalOurTeam from "../ModalOurTeam/ModalOurTeam";
import { useState } from "react";

import styles from "./Layout.module.css";

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const formPages = ["/signup", "/login"];
  const isFormPage = formPages.includes(location.pathname);

  const [isTeamOpen, setIsTeamOpen] = useState(false);

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

          {!isFormPage && <Footer setIsTeamOpen={setIsTeamOpen} />}
        </div>
      </div>

      <div className={styles.modalRoot}>
        <ModalOurTeam
          isOpen={isTeamOpen}
          onClose={() => setIsTeamOpen(false)}
        />

        {/* {isAuthenticated && (
          <ExclusiveModal
            isOpen={isExclusiveOpen}
            onClose={() => setIsExclusiveOpen(false)}
          />
        )} */}
      </div>
    </div>
  );
};

export default Layout;
