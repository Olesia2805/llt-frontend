import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18next";

import Layout from "./components/Layout/Layout.jsx";
//TODO: Loader
import Loader from "./components/Loader/Loader.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import { ROUTER } from "./app/routes.jsx";
import "/src/assets/styles/global.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "../src/app/toasterConfig.js";

import { refreshTokens } from "./store/authSlice.js";
import { getPreferences } from "./store/preferencesSlice.js";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const PoliciesPage = lazy(
  () => import("./pages/PoliciesPage/PoliciesPage.jsx"),
);
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"));
const MyTripsPage = lazy(() => import("./pages/MyTripsPage/MyTripsPage.jsx"));
const SettingsPage = lazy(
  () => import("./pages/SettingsPage/SettingsPage.jsx"),
);
const NotFoundPage = lazy(
  () => import("./pages/NotFoundPage/NotFoundPage.jsx"),
);
const LogInPage = lazy(() => import("./pages/LogInPage/LogInPage.jsx"));

const App = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.preferences.data);
  const isAuthenticated = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getPreferences());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (preferences) {
      document.documentElement.setAttribute(
        "data-theme",
        preferences.theme || "dark",
      );
      i18n.changeLanguage(preferences.language || "uk");
    }
  }, [preferences]);

  useEffect(() => {
    dispatch(refreshTokens());
  }, [dispatch]);

  return (
    <>
      {/* TODO: Loader */}
      <Suspense fallback={<Loader />}>
        <ScrollToTop />
        <Routes>
          <Route path={ROUTER.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={`${ROUTER.POLICIES}`} element={<PoliciesPage />} />
            <Route path={`${ROUTER.LOGIN}`} element={<LogInPage />} />
            <Route path={`${ROUTER.SIGNUP}`} element={<SignUpPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTER.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTER.MYTRIPS} element={<MyTripsPage />} />
              <Route path={ROUTER.SETTINGS} element={<SettingsPage />} />
            </Route>
            <Route path={ROUTER.ALL} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-right" toastOptions={toastConfig} />
    </>
  );
};

export default App;
