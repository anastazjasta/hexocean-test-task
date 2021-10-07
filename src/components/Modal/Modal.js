import React from "react";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";

const Modal = (props) => {
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <Button>close</Button>
        </footer>
      </div>
    </>
  );
};

export default Modal;
