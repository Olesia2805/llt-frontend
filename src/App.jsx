import Section from "./components/Section/Section";
import Container from "./components/Container/Container";

// import appCSS from "./App.module.css";
// import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import { useState, useEffect } from "react";
import { PiMapTrifoldBold } from "react-icons/pi";

function App() {
  const [lang, setLang] = useState("ua");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div>
      <h1>Start your adventure with LiteLifeTrip</h1>

      {/* Language toggle */}
      <button onClick={() => setLang(lang === "ua" ? "en" : "ua")}>
        Switch to {lang === "ua" ? "en" : "ua"}
      </button>

      {/* Icon */}
      <div style={{ marginTop: "20px" }}>
        <PiMapTrifoldBold size={48} color="teal" />
      </div>
    </div>
  );
}

export default App;
