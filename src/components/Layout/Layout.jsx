import { Outlet } from "react-router-dom";

import Container from "../Container/Container.jsx";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalContainer from "../ModalContainer/ModalContainer.jsx";

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
