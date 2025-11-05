"use client";
import React from "react";
import styles from "./styleStatus.module.scss";
interface IProps {
  status: string;
  color?: string;
  backgroundColor?: string;
}

export function StatusComponent({ backgroundColor, color, status }: IProps) {
  return (
    <div className={styles.status}>
      <span
        className={`${
          status === "PENDENTE" ||
          status == "ESTORNADO" ||
          status == "CANCELADO"
            ? styles.statusPending
            : styles.statusCompleted
        }`}
      >
        {status}
      </span>
    </div>
  );
}
