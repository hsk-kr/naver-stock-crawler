import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import axios from "axios";
import classNames from "classnames/bind";
import DatePicker from "react-date-picker";
import styles from "./styles.scss";
import Loading from "../../components/Loading";

import { API_CRAWLER_EXECUTION } from "../../config";

const cx = classNames.bind(styles);

const availableCrawling = async () => {
  try {
    const apiRes = await axios.get(API_CRAWLER_EXECUTION);

    if (apiRes.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

const CrawlerPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    availableCrawling()
      .then((available) => {
        setReady(available);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={cx("crawler-container")}>
      <h1>Crawler</h1>
      <hr />
      <div className={cx("status-box")}>
        <label className={cx("status-label")}>Status:</label>
        <Badge variant={`${ready ? "success" : "info"}`}>{`${
          ready ? "READY" : "CRAWLING"
        }`}</Badge>
      </div>
      <div className={cx("crawler-execution-box")}>
        <label className={cx("start-date-label")}>Start Date:</label>
        <DatePicker
          className={cx("date-picker")}
          value={startDate}
          onChange={(v) => setStartDate(v)}
        />
        <label className={cx("end-date-label")}>End Date:</label>
        <DatePicker
          className={cx("date-picker")}
          value={endDate}
          onChange={(v) => setEndDate(v)}
        />
        <Button className={cx("execute-btn")} variant="primary">
          Execute
        </Button>
      </div>
      <hr />
      <pre className="crawler-log">message...</pre>
    </div>
  );
};

export default CrawlerPage;
