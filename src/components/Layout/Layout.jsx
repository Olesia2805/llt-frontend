import { Outlet } from "react-router-dom";

import Container from "../Container/Container";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalContainer from "../ModalContainer/ModalContainer";

const Layout = () => {
  return (
    <Container>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />

      <ModalContainer />
    </Container>
  );
};

export default Layout;
