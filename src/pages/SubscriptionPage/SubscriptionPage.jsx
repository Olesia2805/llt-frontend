import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateCurrentUser } from "../../store/userSlice";
import { nameRegex } from "../../app/validation";
import styles from "./SubscriptionPage.module.css";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";
import InputField from "../../components/InputField/InputField";

const SubscriptionPage = () => {
  const { t } = useTranslation("subscription");
  const [plan, setPlan] = useState("monthly");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: false,
    number: false,
    expiry: false,
  });

  const maskCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const maskExpiry = (value) =>
    value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(\d{2})(\d{0,2})/, "$1/$2");

  const isValidExpiry = (value) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return false;

    const [mm, yy] = value.split("/").map(Number);

    if (mm < 1 || mm > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (yy < currentYear || yy > currentYear + 10) return false;
    if (yy === currentYear && mm < currentMonth) return false;

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      e.target.value = maskCardNumber(value);
    }

    if (name === "expiry") {
      e.target.value = maskExpiry(value);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = form.name.value.trim();
    const number = form.number.value.replace(/\s/g, "");
    const expiry = form.expiry.value;

    const nextErrors = {
      name: !nameRegex.test(name),
      number: number.length !== 16,
      expiry: !isValidExpiry(expiry),
    };

    setErrors(nextErrors);

    const isValid = !Object.values(nextErrors).some(Boolean);
    if (!isValid) return;

    const selectedPlan = plan === "monthly" ? "Nomad" : "Globetrotter";

    try {
      dispatch(updateCurrentUser({ plan: selectedPlan }));
      toast.success(t("subscriptionSuccess", { plan: selectedPlan }));
      navigate("/");
    } catch {
      toast.error(t("subscriptionError"));
    }
  };

  return (
    <Section>
      <Container>
        <div className={styles.headerWrapper}>
          <h2>{t("title")}</h2>
          <p>{t("text")}</p>
        </div>
        <div className={styles.page}>
          <div className={styles.card}>
            <div className={styles.switcher}>
              <Button
                variant={plan === "monthly" ? "primary" : "secondary"}
                onClick={() => setPlan("monthly")}
                text={t("monthly")}
              />
              <Button
                variant={plan === "yearly" ? "primary" : "secondary"}
                onClick={() => setPlan("yearly")}
                text={t("yearly")}
              />
            </div>

            {plan === "monthly" && (
              <div className={styles.planBox}>
                <p className={styles.price}>
                  <span>$9.99</span> / {t("month")}
                </p>
                <p className={styles.description}>{t("monthlyDesc")}</p>
              </div>
            )}

            {plan === "yearly" && (
              <div className={styles.planBox}>
                <p className={styles.price}>
                  <span>$99.99</span> / {t("year")}
                </p>
                <p className={styles.description}>{t("yearlyDesc")}</p>
              </div>
            )}
          </div>

          <div className={styles.card}>
            <h2 className={styles.title}>{t("paymentTitle")}</h2>

            <form className={styles.form} onSubmit={handleSubscribe}>
              <InputField
                label={t("cardName")}
                name="name"
                type="text"
                placeholder={t("cardNamePlaceholder")}
                onChange={handleChange}
                error={errors.name ? t("cardNameError") : ""}
              />

              <InputField
                label={t("cardNumber")}
                name="number"
                type="text"
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                onChange={handleChange}
                error={errors.number ? t("cardNumberError") : ""}
              />

              <InputField
                label={t("expiry")}
                name="expiry"
                type="text"
                placeholder="MM/YY"
                inputMode="numeric"
                onChange={handleChange}
                error={errors.expiry ? t("expiryError") : ""}
              />

              <Button type="submit" className={styles.submitBtn}>
                {t("subscribe")}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default SubscriptionPage;
