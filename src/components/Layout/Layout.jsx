import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalContainer from "../ModalContainer/ModalContainer";

const Layout = () => {
  return (
    <>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />

      <ModalContainer />
    </>
  );
};

export default Layout;
