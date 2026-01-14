import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

export const toastConfig = {
  style: {
    background: "var(--bg-alt)",
    color: "var(--text-main)",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid rgb(var(--border-color-rgb))",
    boxShadow: "0 4px 8px rgba(var(--primary-light-rgb), 0.4)",
  },

  success: {
    duration: 3000,
    icon: React.createElement(FaRegCheckCircle, {
      style: {
        color: "rgb(var(--green-color-rgb))",
        fontSize: "20px",
      },
    }),
    style: {
      background: "var(--bg-alt)",
      border: "1px solid rgb(var(--green-color-rgb))",
    },
  },

  error: {
    duration: 5000,
    icon: React.createElement(RxCrossCircled, {
      style: {
        color: "rgb(var(--red-color-rgb))",
        fontSize: "34px",
      },
    }),
    style: {
      background: "var(--bg-alt)",
      border: "1px solid rgb(var(--red-color-rgb))",
    },
  },
};
