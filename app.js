import ytdl from "ytdl-core";
import fs from "fs";
import fetch from "node-fetch";

// https://www.youtube.com/@thejimmydoreshow/streams
// https://www.youtube.com/@coffeerelaxingjazz/streams

async function main() {
  const pageUrl = " https://www.youtube.com/@thejimmydoreshow/streams";
  const response = await fetch(pageUrl);
  const page = await response.text();
  const liveIcon = `"iconType":"LIVE"`;
  const isLive = page.includes(liveIcon);
  if (!isLive) return;
  const regex = /\/watch\?v=.*?(?=")/;
  const suffix = page.match(regex)[0];
  const url = "https://youtube.com" + suffix;
  const date = new Date().toLocaleDateString();

  ytdl(url, {
    filter: (format) =>
      format.hasAudio && format.hasVideo && format.qualityLabel === "720p",
  }).pipe(fs.createWriteStream(date + ".mp4"));
}

main().catch((error) => console.log(error));

// curl https://www.youtube.com/@coffeerelaxingjazz/streams --output streams.html

// REGEX /watch\?v=.*?(?=")
// /watch?v=pg6UhJbFl0A
// https://www.youtube.com/watch?v=pg6UhJbFl0A

// webhook
// return res.status(200).send('OK') before starting download
