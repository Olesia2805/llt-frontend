import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Layout from "./components/Layout/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { ROUTER } from "./app/routes.jsx";
// import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={ROUTER.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
      {/* <Toaster position="bottom-right" toastOptions={toastConfig} /> */}
    </>
  );
}

export default App;
