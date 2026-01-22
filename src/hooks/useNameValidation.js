import { useMemo } from "react";
import { nameRegex } from "../app/validation.js";

export const useNameValidation = (name, t) => {
  const error = useMemo(() => {
    if (!name) return null;

    const trimmed = name.trim();

    if (trimmed.length < 2) {
      return t("errors.name_short");
    }

    if (trimmed.length > 30) {
      return t("errors.name_too_long");
    }

    if (!nameRegex.test(trimmed)) {
      return t("errors.name_invalid");
    }

    return null;
  }, [name, t]);

  return {
    error,
    isValid: !error,
  };
};
