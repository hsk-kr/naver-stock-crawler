import React from "react";
import { Spinner } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./styles.scss";

const cx = classNames.bind(styles);

const Loading = () => {
  return (
    <div className={cx("loading-container")}>
      <Spinner animation="grow" />
    </div>
  );
};

export default Loading;
