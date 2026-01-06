import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./components/Layout/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { ROUTER } from "./app/routes.jsx";
import "/src/assets/styles/global.css";

//TODO: Toaster
// import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const PoliciesPage = lazy(() =>
  import("./pages/PoliciesPage/PoliciesPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={ROUTER.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={`${ROUTER.POLICIES}`} element={<PoliciesPage />} />
            <Route path={ROUTER.ALL} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      {/* <Toaster position="bottom-right" toastOptions={toastConfig} /> */}
    </>
  );
};

export default App;
