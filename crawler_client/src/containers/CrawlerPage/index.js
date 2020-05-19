import React, { useState, useEffect, useCallback } from "react";
import { Button, Badge } from "react-bootstrap";
import classNames from "classnames/bind";
import DatePicker from "react-date-picker";
import styles from "./styles.scss";
import Loading from "../../components/Loading";
import {
  availableCrawling,
  executeCrawler,
  fetchLatestCrawlerId,
  fetchCrawlerLog,
} from "../../lib/api";

const cx = classNames.bind(styles);

let tmLog = null;

const CrawlerPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [crawlerId, setCrawlerId] = useState(null);
  const [ready, setReady] = useState(null);
  const [log, setLog] = useState(null);
  const [strLog, setStrLog] = useState("loading...");

  const executeBtnOnClick = useCallback(() => {
    const strStartDate = `${startDate.getFullYear()}.${
      startDate.getMonth() + 1
    }.${startDate.getDate()}`;
    const strEndDate = `${endDate.getFullYear()}.${
      endDate.getMonth() + 1
    }.${endDate.getDate()}`;

    executeCrawler(strStartDate, strEndDate).then((executed) => {
      if (executed) {
        alert("Executed");
      } else {
        alert("there is an error");
      }
    });
  }, [startDate, endDate]);

  // fetch status of crawling
  useEffect(() => {
    availableCrawling().then((available) => {
      setReady(available);
    });
  }, []);

  // fetch latest crawler id
  useEffect(() => {
    fetchLatestCrawlerId().then((latestId) => {
      setCrawlerId(latestId);
    });
  }, []);

  // fetch crawler Log
  useEffect(() => {
    fetchCrawlerLog(crawlerId).then((fetchedLog) => {
      if (fetchedLog !== null) {
        setLog(fetchedLog);
      }
    });
  }, [crawlerId]);

  // api timer
  useEffect(() => {
    if (crawlerId !== null) {
      tmLog = setInterval(async () => {
        try {
          const available = await availableCrawling();

          if (available !== ready) {
            setReady(available);
          }

          const fetchedLog = await fetchCrawlerLog(crawlerId);

          if (fetchedLog !== null && fetchedLog.length !== log.length) {
            setLog(fetchedLog);
          }
        } catch {}
      }, 3000);
    }

    return () => {
      clearInterval(tmLog);
    };
  }, [log, crawlerId, ready]);

  useEffect(() => {}, [tmLog]);

  // print log
  useEffect(() => {
    if (log === null) {
      return;
    }

    let strLog = "";

    for (const l of log) {
      strLog += `[${l.created_at}] : ${l.message}\n`;
    }

    setStrLog(strLog);
  }, [log]);

  // set loading if all of API is loaded.
  useEffect(() => {
    if (crawlerId !== null && ready !== null && log !== null) {
      setLoading(false);
    }
  }, [crawlerId, ready, log]);

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
        <Button
          className={cx("execute-btn")}
          variant="primary"
          onClick={executeBtnOnClick}
          disabled={!ready}
        >
          Execute
        </Button>
      </div>
      <hr />
      <pre className="crawler-log">{strLog}</pre>
    </div>
  );
};

export default CrawlerPage;
