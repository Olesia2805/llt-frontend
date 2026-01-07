import { Outlet, useLocation } from "react-router-dom";

import Header from "../Header/Header";
import HeaderForm from "../Header/HeaderForm";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalContainer from "../ModalContainer/ModalContainer";

const Layout = () => {
  const location = useLocation();
  const isSignUpPage = location.pathname === "/signup";
  //TODO: SideBar
  //   const { isAuthenticated } = useAuth();
  //   return isAuthenticated ? <Header /> : <SideBar />;

  return (
    <>
      {isSignUpPage ? <HeaderForm /> : <Header />}

      <Main>
        <Outlet />
      </Main>

      {!isSignUpPage && <Footer />}

      <ModalContainer />
    </>
  );
};

export default Layout;
