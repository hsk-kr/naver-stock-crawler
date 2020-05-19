import axios from "axios";
import qs from "querystring";
import {
  API_CRAWLER_EXECUTION,
  API_FETCH_CRAWLER_LIST,
  API_FETCH_LOG,
} from "../config";

/**
 * Returns whether it's possible to execute or not.
 */
export const availableCrawling = async () => {
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

/**
 * Returns latest crawler id if there is no excuted crawler or occurs an error, returns null.
 */
export const fetchLatestCrawlerId = async () => {
  try {
    const apiRes = await axios.get(API_FETCH_CRAWLER_LIST);

    if (apiRes.status !== 200) {
      throw new Error(`Status: ${apiRes.status}`);
    } else if (apiRes.data.length <= 0) {
      throw new Error("There is no excuted crawler");
    }

    return apiRes.data[0].id;
  } catch {
    return null;
  }
};

/**
 * Returns logs of the crawler if error occurs, returns null.
 * @param {number} crawlerId
 */
export const fetchCrawlerLog = async (crawlerId) => {
  try {
    if (crawlerId === null) {
      throw new Error(`Crawler ID is null.`);
    }

    const apiRes = await axios.get(API_FETCH_LOG, {
      params: {
        ordering: "created_at",
        search: crawlerId,
      },
    });

    if (apiRes.status !== 200) {
      throw new Error(`API Response Status:${apiRes.status}`);
    }

    return apiRes.data;
  } catch {
    return null;
  }
};

/**
 * Returns whether it's successful to execute or not
 * @param {string} startDate
 * @param {string} endDate
 */
export const executeCrawler = async (startDate, endDate) => {
  try {
    const apiRes = await axios.post(
      API_CRAWLER_EXECUTION,
      qs.stringify({
        start_date: startDate,
        end_date: endDate,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (apiRes.status === 202) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
