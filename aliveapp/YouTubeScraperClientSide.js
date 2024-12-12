import axios from "axios";

const getVideos = async (artistName, songName, date) => {
  try {
    const response = await axios.post("http://172.20.10.1:3001/getVideos", {
      artistName,
      songName,
      date,
    });

    if (response.data.videoUrl) {
      console.log(`First video URL: ${response.data.videoUrl}`);
      return response.data.videoUrl;
    } else {
      console.log("No video found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching video:", error.response?.data || error.message);
    return null;
  }
};

// Example usage
getVideos("Sleep Token", "The Night Does Not Belong To God", "5.12.2024");
export default getVideos;
