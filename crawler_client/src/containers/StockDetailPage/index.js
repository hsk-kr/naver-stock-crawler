import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import styles from "./styles.scss";
import Loading from "../../components/Loading";
import { fetchStock } from "../../lib/api";

const cx = classNames.bind(styles);

const StockDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [stockInfo, setStockInfo] = useState(null);
  const [tradingTrendMode, setTradingTrendMode] = useState(true);
  const { stockid } = useParams();

  useEffect(() => {
    fetchStock(stockid).then((stock) => {
      setStockInfo(stock);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={cx("stock-detail-container")}>
      <h1>Stock Detail</h1>
      <hr />
      <div className={cx("stock-detail-box")}>
        <div className={cx("stock-detail-info")}>
          <div>
            <label className={cx("label")}>NAME</label>
            <label className={cx("info")}>{stockInfo.name}</label>
          </div>
          <div>
            <label className={cx("label")}>CODE</label>
            <label className={cx("info")}>{stockInfo.code}</label>
          </div>
          <div>
            <label className={cx("label")}>Link</label>
            <a className={cx("info")} href={stockInfo.link} target="_blank">OPEN</a>
          </div>
          <div>
            <label className={cx("label")}>Number of rise</label>
            <label className={cx("info")}>{stockInfo.analyzed_data_probability.rise}</label>
          </div>
          <div>
            <label className={cx("label")}>Number of fall</label>
            <label className={cx("info")}>{stockInfo.analyzed_data_probability.fall}</label>
          </div>
          <div>
            <label className={cx("label")}>Rise probability</label>
            <label className={cx("info")}>{stockInfo.analyzed_data_probability.rise_probability}%</label>
          </div>
          <div>
            <label className={cx("label")}>Fall probability</label>
            <label className={cx("info")}>{stockInfo.analyzed_data_probability.fall_probability}%</label>
          </div>
          <div>
            <label className={cx("label")}>Number of rise</label>
            <label className={cx("info")}>{stockInfo.analyzed_data_probability.rise}</label>
          </div>
          <Button variant="success" onClick={() => setTradingTrendMode(!tradingTrendMode)}>Switch</Button>
        </div>
        {tradingTrendMode && <Table
          striped
          bordered
          hover
          variant="dark"
          className={cx("trading_trend_table")}
        >
          <thead>
            <tr>
              <th>Volumn</th>
              <th>Foreigner</th>
              <th>Institution</th>
              <th>Closing Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {stockInfo &&
              stockInfo.trading_trend.map((tardingTrend, idx) => (
                <tr key={idx}>
                  <td>{tardingTrend.volumn}</td>
                  <td className={cx(tardingTrend.foreigner > 0 ? 'rise' : (tardingTrend.foreigner < 0 ? 'fall' : ''))}>{tardingTrend.foreigner}</td>
                  <td className={cx(tardingTrend.institution > 0 ? 'rise' : (tardingTrend.institution < 0 ? 'fall' : ''))}>{tardingTrend.institution}</td>
                  <td>{tardingTrend.closing_price}</td>
                  <td>{tardingTrend.date}</td>
                </tr>
              ))}
          </tbody>
        </Table>}
        {(!tradingTrendMode && stockInfo) && (
          <div className={cx('analyzed-data-list')}>
            {
              stockInfo.analyzed_data.map((data) => (
                <div className={cx('analyzed-data-card')}>
                  {
                    data.result && (
                      <>
                        <div>
                          <h2>RESULT</h2>
                          <label className={cx('result', (data.result.type) ? 'rise' : 'fall')}>{data.result.type}</label>
                        </div>
                        <div>
                          <h2>Next day</h2>
                          <div>
                            <label className={cx("label")}>date</label>
                            <label className={cx("info")}>{data.result.date}</label>
                          </div>
                          <div>
                            <label className={cx("label")}>foreigner</label>
                            <label className={cx("info", data.result.foreigner > 0 ? 'rise' : (data.result.foreigner < 0 ? 'fall' : ''))}>{data.result.foreigner}</label>
                          </div>
                          <div>
                            <label className={cx("label")}>institution</label>
                            <label className={cx("info", data.result.institution > 0 ? 'rise' : (data.result.institution < 0 ? 'fall' : ''))}>{data.result.institution}</label>
                          </div>
                          <div>
                            <label className={cx("label")}>closing price</label>
                            <label className={cx("info")}>{data.result.closing_price}</label>
                          </div>
                        </div>
                      </>
                    )
                  }
                  <div>
                    <h2>Previous day</h2>
                    <div>
                      <label className={cx("label")}>date</label>
                      <label className={cx("info")}>{data.date}</label>
                    </div>
                    <div>
                      <label className={cx("label")}>foreigner</label>
                      <label className={cx("info", data.foreigner > 0 ? 'rise' : (data.foreigner < 0 ? 'fall' : ''))}>{data.foreigner}</label>
                    </div>
                    <div>
                      <label className={cx("label")}>institution</label>
                      <label className={cx("info", data.institution > 0 ? 'rise' : (data.institution < 0 ? 'fall' : ''))}>{data.institution}</label>
                    </div>
                    <div>
                      <label className={cx("label")}>closing price</label>
                      <label className={cx("info")}>{data.closing_price}</label>
                    </div>
                  </div>
                </div>
              )
              )}
            }
          </div>
        )}
      </div>
    </div >
  );
};

export default StockDetailPage;
