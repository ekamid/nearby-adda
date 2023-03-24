const { createClient } = require("redis");

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

client.on("connect", () => {
  console.log("Connected to Redis server");
});

client.on("end", () => {
  console.log("Disconnected from Redis server");
});

module.exports = client;
