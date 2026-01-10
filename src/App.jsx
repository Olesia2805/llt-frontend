import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./components/Layout/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import { ROUTER } from "./app/routes.jsx";
import "/src/assets/styles/global.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

//TODO: Toaster
// import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const PoliciesPage = lazy(() =>
  import("./pages/PoliciesPage/PoliciesPage.jsx")
);
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"));
const TripsPage = lazy(() => import("./pages/TripsPage/TripsPage.jsx"));
const SettingsPage = lazy(() =>
  import("./pages/SettingsPage/SettingsPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

const App = () => {
  return (
    <>
      {/* TODO: Loader */}
      <Suspense fallback={<Loader />}>
        <ScrollToTop />
        <Routes>
          <Route path={ROUTER.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={`${ROUTER.POLICIES}`} element={<PoliciesPage />} />
            <Route path={`${ROUTER.SIGNUP}`} element={<SignUpPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTER.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTER.TRIPS} element={<TripsPage />} />
              <Route path={ROUTER.SETTINGS} element={<SettingsPage />} />
            </Route>
            <Route path={ROUTER.ALL} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      {/* <Toaster position="bottom-right" toastOptions={toastConfig} /> */}
    </>
  );
};

export default App;
