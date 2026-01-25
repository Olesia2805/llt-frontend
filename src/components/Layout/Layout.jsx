import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

import Header from "../Header/Header";
import HeaderForm from "../Header/HeaderForm";
import SideBar from "../SideBar/SideBar";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalOurTeam from "../ModalOurTeam/ModalOurTeam";
import HeaderUser from "../Header/HeaderUser";

import styles from "./Layout.module.css";

const Layout = () => {
  const location = useLocation();

  const { user, isAuthenticated, isRefreshing } = useSelector(
    (state) => state.userData,
  );
  const userId = user?.id;

  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSidebarOpen]);

  const formPages = ["/signup", "/login"];
  const isFormPage = formPages.includes(location.pathname);

  if (isRefreshing) return null; //! Loader

  return (
    <div className={styles.layout}>
      {isFormPage ? (
        <HeaderForm />
      ) : !isAuthenticated && !isFormPage ? (
        <Header />
      ) : null}

      <div className={styles.content}>
        {isAuthenticated && (
          <>
            <aside
              className={`${styles.sidebarWrapper} ${
                isSidebarOpen ? styles.active : ""
              }`}
            >
              <SideBar onClose={() => setIsSidebarOpen(false)} />
            </aside>
          </>
        )}

        <div className={styles.mainWrapper}>
          {isAuthenticated && (
            <HeaderUser
              onBurgerClick={() => setIsSidebarOpen(!isSidebarOpen)}
              isSidebarOpen={isSidebarOpen}
            />
          )}
          <Main className={styles.mainContent}>
            <Outlet key={userId} />
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
