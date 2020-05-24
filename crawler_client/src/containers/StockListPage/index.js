import React, { useState, useEffect, useCallback } from "react";
import { Badge } from "react-bootstrap";
import classNames from "classnames/bind";
import { useParams, useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
import styles from "./styles.scss";
import Loading from "../../components/Loading";
import { fetchStockList } from "../../lib/api";

const cx = classNames.bind(styles);

const StockListPage = () => {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [numOrder, setNumOrder] = useState(true);
  const [lengthOrder, setLengthOrder] = useState(true);
  const [resultOrder, setResultOrder] = useState(true);
  const { crawlerid } = useParams();
  const history = useHistory();

  const navigateUrl = useCallback((stockid) => {
    history.push(`/stock/${stockid}`);
  }, []);

  const orderById = useCallback(() => {
    const newStocks = [...stocks];
    newStocks.sort((a, b) => (numOrder ? a.id - b.id : b.id - a.id));
    setStocks(newStocks);
    setNumOrder(!numOrder);
  }, [stocks, numOrder]);

  const orderByAnalyzedDataLength = useCallback(() => {
    const newStocks = [...stocks];
    newStocks.sort((a, b) =>
      lengthOrder
        ? a.analyzed_data.length - b.analyzed_data.length
        : b.analyzed_data.length - a.analyzed_data.length
    );
    setStocks(newStocks);
    setLengthOrder(!lengthOrder);
  }, [stocks, lengthOrder]);

  const orderByResult = useCallback(() => {
    const newStocks = [...stocks];
    newStocks.sort((a, b) =>
      resultOrder
        ? a.result_order_value - b.result_order_value
        : b.result_order_value - a.result_order_value
    );
    setStocks(newStocks);
    setResultOrder(!resultOrder);
  }, [stocks, resultOrder]);

  useEffect(() => {
    fetchStockList(crawlerid).then((stocks) => {
      stocks.map((stock) => {
        stock.result_order_value =
          stock.analyzed_data.length > 0 &&
          stock.analyzed_data[0].result === null
            ? 1
            : 0;
      });
      setStocks(stocks);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={cx("stocklist-container")}>
      <h1>StockList Of {crawlerid}</h1>
      <hr />
      <div className="stocklist-box">
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="stocklist-table"
        >
          <thead>
            <tr>
              <th className="order-column" onClick={orderById}>
                Num
              </th>
              <th>Name</th>
              <th>Code</th>
              <th className="order-column" onClick={orderByAnalyzedDataLength}>
                Analyzed Data Length
              </th>
              <th className="order-column" onClick={orderByResult}>
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {stocks &&
              stocks.map((stock, idx) => (
                <tr key={idx} onClick={() => navigateUrl(stock.id)}>
                  <td>{stock.id}</td>
                  <td>{stock.name}</td>
                  <td>{stock.code}</td>
                  <td>{stock.analyzed_data.length}</td>
                  <td>
                    {stock.analyzed_data.length > 0 &&
                    stock.analyzed_data[0].result === null ? (
                      <Badge variant="success">O</Badge>
                    ) : (
                      <Badge variant="danger">X</Badge>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default StockListPage;
