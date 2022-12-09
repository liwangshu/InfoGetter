import { React, useState, useRef, useEffect } from "react";
import axios from "axios";

const getName = require("simple-country-iso");
const countries = [
  "us",
  "cn",
  "in",
  "ae",
  "ar",
  "at",
  "au",
  "be",
  "bg",
  "br",
  "ca",
  "ch",
  "co",
  "cu",
  "cz",
  "de",
  "eg",
  "fr",
  "gb",
  "gr",
  "hu",
  "id",
  "ie",
  "il",
  "it",
  "jp",
  "kr",
  "lt",
  "lv",
  "ma",
  "mx",
  "my",
  "ng",
  "nl",
  "no",
  "nz",
  "ph",
  "pl",
  "pt",
  "ro",
  "rs",
  "ru",
  "sa",
  "se",
  "sg",
  "si",
  "th",
  "tr",
  "ua",
  "ve",
  "za",
];
const apiKey = process.env.REACT_APP_NEWS_API_KEY;

function News() {
  const buttonRef = useRef(null);
  const [newsData, setNewsData] = useState([]);
  const [country, setCountry] = useState(countries[0]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    buttonRef.current.click();
  }, []);

  const getTopNewsFromCountry = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&sortBy=popularity&pageSize=100&apiKey=${apiKey}`
      )
      .then((response) => {
        setNewsData(response.data.articles);
      });
  };

  const getTopNewsFromKeyword = () => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&apiKey=${apiKey}`
      )
      .then((response) => {
        setNewsData(response.data.articles);
      });
  };

  const getUrlToImage = (news) => {
    if (news.urlToImage) {
      return news.urlToImage;
    } else {
      return "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg";
    }
  };

  return (
    <>
      <div className="container my-5">
        <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
          <li className="nav-item">
            <button
              className="nav-link active"
              id="FetchByCountry-tab"
              data-bs-toggle="tab"
              data-bs-target="#FetchByCountry"
              role="tab"
              aria-controls="FetchByCountry"
              aria-selected="true"
            >
              Fetch By Country
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              id="FetchByKeyword-tab"
              data-bs-toggle="tab"
              data-bs-target="#FetchByKeyword"
              role="tab"
              aria-controls="Fetch ByKeyword"
              aria-selected="false"
            >
              Fetch By Keyword
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="FetchByCountry"
            role="tabpanel"
            aria-labelledby="FetchByCountry-tab"
          >
            <select
              className="form-select d-inline"
              aria-label="Select Country"
              style={{ width: "230px", marginRight: "50px" }}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((c) => {
                return <option value={c}>{getName(c)}</option>;
              })}
            </select>
            <button
              ref={buttonRef}
              className="btn btn-primary"
              onClick={getTopNewsFromCountry}
            >
              Fetch Top News By Country
            </button>
          </div>
          <div
            className="tab-pane fade"
            id="FetchByKeyword"
            role="tabpanel"
            aria-labelledby="FetchByKeyword-tab"
          >
            <input
              className="form-control d-inline"
              type="text"
              placeholder="Input Keyword"
              style={{ width: "230px", marginRight: "50px" }}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button className="btn btn-primary" onClick={getTopNewsFromKeyword}>
              Fetch Top News By Keyword
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {newsData.map((news) => {
            return (
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="card mb-3">
                  <a target="_blank" rel="noopener noreferrer" href={news.url}>
                    <img
                      className="card-img-top"
                      src={getUrlToImage(news)}
                      alt="Card image cap"
                    />
                  </a>
                  <div className="card-body">
                    <h5 className="card-title">{news.title}</h5>
                    <p className="card-text">{news.description}</p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={news.url}
                      className="btn btn-primary"
                    >
                      Go to News Main Page
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default News;
