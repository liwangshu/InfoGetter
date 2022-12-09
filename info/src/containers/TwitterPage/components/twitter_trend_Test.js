// import { TwitterClient } from "twitter-api-client";
// var TwitterClient = require("twitter-api-client");
const TwitterClient = require("twitter-api-client").TwitterClient;
const jsonText = require("./geo.json");
const fs = require("fs");
// const testJsonText = require("./trendsData.json");

// let url = "https://api.twitter.com/1.1/trends/place.json?id=23424856";
let url = "https://api.twitter.com/1.1/trends/place.json?id=";

const options = {
  headers: {
    Authorization:
      "Bearer AAAAAAAAAAAAAAAAAAAAAMH5bAEAAAAAvL7SamHwHKTjNT5OFvRor5s68X0%3DDQo6Lhbziqa3F21NwTGP1JuPxJQnG66Rv9kooCv5F2u7FgEot6",
  },
};

const twitterClient = new TwitterClient({
  apiKey: "NVPCuxJm3yJ6pXHEIfvR8W6TJ",
  apiSecret: "BMIXNWN1AdKOTlH5wILS1vh7P36tQMo3GYTz2Gfgu5vY2n6UTq",
  accessToken: "1512137997810077700-jtQqyBfCnh6oEhVy17JglOYceqIBvR",
  accessTokenSecret: "A9hO1FbUgYZHRSMqICP72MAnKT4LltvajSA402AOe5PEd",
});

async function testfun() {
  const data = await twitterClient.trends.trendsPlace({ id: 23424856 });
  console.log(data[0].trends);
}

async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

async function getTrend1() {
  // japan: 23424856
  // afhan: 23424739

  let errorCount = 0;
  const numOfCountries = jsonText.features.length;
  let jsonArr = {};
  for (let i = 0; i < 176; i++) {
    let curWoeid = jsonText.features[i].properties.WOE_ID;
    await sleep(15000);
    console.log("!!!");

    let trendsObjArr = [];
    try {
      const data = await twitterClient.trends.trendsPlace({ id: curWoeid });
      for (let j = 0; j < 10; j++) {
        // curWoeid = 23424739;
        console.log(data[0].trends[j]);
        trendsObjArr.push(data[0].trends[j]);
      }
    } catch (error) {
      errorCount++;
      console.log(errorCount);
    }

    jsonArr[curWoeid] = trendsObjArr;
  }

  fs.writeFileSync(
    "./exportTrends.js",
    "export default " + JSON.stringify(jsonArr)
  );
}

getTrend1();
