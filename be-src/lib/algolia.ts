import algoliasearch from "algoliasearch";

// Connect and authenticate with your Algolia app
const client = algoliasearch("SX3L5ZO0OC", "6a135faf3c2167db91d8d4e293addac8");

// Create a new index and add a record
const index = client.initIndex("products");
// const record = { objectID: 1, name: "test_record" };

// index
//   .setSettings({
//     searchableAttributes: ["nombre", "rubro", "lat", "lng"],
//     customRanking: ["desc(links_count)"],
//   })
//   .then(() => {
//     // done
//   });

export { index };
