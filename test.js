import fetch from "node-fetch";

async function main() {
  const url = "https://www.youtube.com/@RegularCars/streams";
  const response = await fetch(url);
  const body = await response.text();
  const liveIcon = `"iconType":"LIVE"`;
  const isLive = body.includes(liveIcon);
  console.log(isLive);
}

main().catch((error) => console.log(error));
