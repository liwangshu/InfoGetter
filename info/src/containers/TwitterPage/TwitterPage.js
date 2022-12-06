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
      })
      .backgroundColor("white")
      .width(600)
      .height(600)
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

  function getTrends(id) {
    // console.log(finalTrends[id][0]);
    const trendsSet = finalTrends[id];
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

  // function getTrend(id) {
  //   let fetchUrl = "https://api.twitter.com/1.1/trends/place.json?id=" + id;
  //   const options = {
  //     headers: {
  //       Authorization:
  //         "Bearer AAAAAAAAAAAAAAAAAAAAAMH5bAEAAAAAvL7SamHwHKTjNT5OFvRor5s68X0%3DDQo6Lhbziqa3F21NwTGP1JuPxJQnG66Rv9kooCv5F2u7FgEot6",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   };

  //   axios
  //     .get(fetchUrl, options)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   // fetch(fetchUrl, options, {
  //   //   mode: "no-cors",
  //   // })
  //   //   .then(function (response) {
  //   //     return response.json();
  //   //   })
  //   //   .then(function (data) {
  //   //     console.log(data[0].trends[0]);
  //   //   });
  // }

  function showCountry(str) {
    let con = document.getElementById("countryTitle");
    con.innerHTML = "Country: " + str;
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
  return (
    <div class="float-container">
      <div id="leftPart" class="float-child">
        <div id="positionBoard">
          <p id="countryTitle">Country: Please select a country ☞</p>
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
        </div>
      </div>
    </div>
  );
};

export default TwitterPage;
