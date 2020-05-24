import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import styles from "./styles.scss";
import Loading from "../../components/Loading";
import { fetchCrawlerList } from "../../lib/api";
import { convertStringToLocalDateString } from "../../lib/date";

const cx = classNames.bind(styles);

const CrawlerPage = () => {
  const [loading, setLoading] = useState(true);
  const [crawlerData, setCrawlerData] = useState(null);
  const { page } = useParams();

  useEffect(() => {
    fetchCrawlerList(page).then((data) => {
      setCrawlerData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={cx("crawlerlist-container")}>
      <h1>Crawler List</h1>
      <hr />
      <div className="crawlerlist-box">
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="crawlerlist-table"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {crawlerData &&
              crawlerData.results.map((crawlerInfo, idx) => (
                <tr key={idx}>
                  <td>{crawlerInfo.id}</td>
                  <td>
                    {convertStringToLocalDateString(crawlerInfo.created_at)}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="pagination-box">
          {crawlerData.previous && <a href={Number(page) - 1}>Prev</a>}
          <a href={page}>{page}</a>
          {crawlerData.next && <a href={Number(page) + 1}>Next</a>}
        </div>
      </div>
    </div>
  );
};

export default CrawlerPage;
