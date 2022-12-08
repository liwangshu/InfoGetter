import React, { useState, Component, useEffect } from "react";
import Globe from "globe.gl";
import geoInfo from "./components/geoInfo";
import finalTrends from "./components/finalTrends";
import "./TwitterPage.css";

const TwitterPage = () => {
  useEffect(() => {
    initialRender();

    let countries = geoInfo;
    const world = Globe()
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
      .onGlobeClick(({ lat, lng }, event) => {
        // showPosition(lat, lng);
        showCountry("----");
        initialRender();
        noDataRender();
      })
      .backgroundColor("white")
      .width(600)
      .height(600)
      .pointOfView({ lat: 47.7, lng: -120.7, altitude: 2.5 })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0)
      .onHexPolygonClick((polygon, event, { lat, lng, altitude }) => {
        // showPosition(lat, lng);
        showCountry(polygon.properties.ADMIN);
        getTrends(polygon.properties.WOE_ID);

        // console.log(polygon.properties.WOE_ID);
      })
      .hexPolygonColor(
        () =>
          `#${Math.round(Math.random() * Math.pow(2, 24))
            .toString(16)
            .padStart(6, "0")}`
      )
      .hexPolygonLabel(
        ({ properties: d }) => `
            <b>${d.ADMIN} (${d.ISO_A2})</b> <br />      `
      )(document.getElementById("globeViz"));
  });

  async function getTrends(id) {
    // console.log(finalTrends[id][0]);
    let countryCode = 1500;
    await fetchTrends(countryCode);
    const trendsSet = finalTrends[id];
    if (trendsSet.length === 0) {
      console.log("empty!!");
      initialRender();
      noDataRender();
      return;
    }
    haveDataRender();
    let leftTrendsBoard = document.getElementById("leftTrends");
    let rightTrendsBoard = document.getElementById("rightTrends");
    let leftHtml = "";
    let rightHtml = "";
    for (let i = 0; i < 5; i++) {
      let curName = trendsSet[i].name;
      let curUrl = trendsSet[i].url;
      // console.log(curUrl);
      leftHtml += `<div class="perTrend"><a href="${curUrl}" target="_blank" rel="noopener noreferrer">${curName}</a></div>`;
    }
    for (let i = 5; i < 10; i++) {
      let curName = trendsSet[i].name;
      let curUrl = trendsSet[i].url;
      // console.log(curUrl);
      rightHtml += `<div class="perTrend"><a href="${curUrl}" target="_blank" rel="noopener noreferrer">${curName}</a></div>`;
    }

    leftTrendsBoard.innerHTML = leftHtml;
    rightTrendsBoard.innerHTML = rightHtml;
  }

  function fetchTrends(delay) {
    console.log("Trends fetched");
    return new Promise((res) => setTimeout(res, delay));
  }

  function showCountry(str) {
    let con = document.getElementById("countryTitle");
    con.innerHTML = "Country : " + str;
  }

  function initialRender() {
    let leftTrendsBoard = document.getElementById("leftTrends");
    let rightTrendsBoard = document.getElementById("rightTrends");
    let leftHtml = "";
    let rightHtml = "";
    for (let i = 0; i < 5; i++) {
      // console.log(curUrl);
      leftHtml += `<div class="perTrend"><a >No data</a></div>`;
    }
    for (let i = 5; i < 10; i++) {
      // console.log(curUrl);
      rightHtml += `<div class="perTrend"><a >No data</a></div>`;
    }
    leftTrendsBoard.innerHTML = leftHtml;
    rightTrendsBoard.innerHTML = rightHtml;
  }

  function noDataRender() {
    let globeTitle = document.getElementById("globeTitle");
    globeTitle.innerHTML =
      "No data for this country... Please try another one~";
  }
  function haveDataRender() {
    let globeTitle = document.getElementById("globeTitle");
    globeTitle.innerHTML = "Successfully fetched local trends~";
  }

  return (
    <div class="float-container">
      <div id="leftPart" class="float-child">
        <div id="pageTitle">
          <span id="twitterIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="#1da1f2"
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
              />
            </svg>
          </span>
          <span> Trends from Twitter</span>
        </div>
        <div id="positionBoard">
          <p id="countryTitle">Click to select a country ☞</p>
        </div>
        <div id="localTrendsBoard">
          <p id="localTrendsTitle">Top 10 Local Trends</p>
          <div id="trendsContainer">
            <div class="leftTrends" id="leftTrends"></div>
            <div class="rightTrends" id="rightTrends"></div>
          </div>
        </div>
      </div>
      <div id="rightPart" class="float-child">
        <div id="earthWrapper">
          <div id="globeViz"></div>
          <div id="globeTitle">You can rotate and zoom the 3D globe~</div>
        </div>
      </div>
    </div>
  );
};

export default TwitterPage;
