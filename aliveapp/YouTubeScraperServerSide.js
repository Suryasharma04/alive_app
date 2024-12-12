import express from "express";
import { launch } from "puppeteer";
import './databaseAPI.js';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(express.json());

app.post("/getVideos", async (req, res) => {
  const { artistName, songName, date } = req.body;

  if (!artistName || !songName || !date) {
    return res.status(400).json({ error: "Missing artistName, songName, or date" });
  }

  const formattedArtistName = artistName.replace(/ /g, "+");
  const formattedSongName = songName.replace(/ /g, "+");
  const query = encodeURI(`${formattedArtistName}+${formattedSongName}+live+${date}`);

  try {
    const browser = await launch({
      headless: true, // No browser UI
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/results?search_query=${query}`);
    await page.waitForSelector("div#contents");

    const firstVideoUrl = await page.evaluate(() => {
      const videoElement = document.querySelector("ytd-video-renderer a#video-title");
      return videoElement
        ? "https://www.youtube.com" + videoElement.getAttribute("href")
        : null; // Return null if no video is found
    });

    console.log(firstVideoUrl);
    await browser.close();

    if (firstVideoUrl) {
      res.status(200).json({ videoUrl: firstVideoUrl });
    } else {
      res.status(404).json({ error: "No video found for the given search query" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://172.20.10.1:${PORT}`);
});

//getVideos("Sleep Token", "The Night Does Not Belong To God", "5.12.2024");
//export default getVideos;

//Function works, need to figure out how to not return a video if a video from that data does not come up
//also export getVideos and implement it into ArtistName.js