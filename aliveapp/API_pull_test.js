

const fetchSetlist = async () => {
    const baseUrl = "https://api.setlist.fm/rest/1.0/search/setlists";
    const apiKey = "B5lJa2tqhLW0kpqvDKStipLxUBYP10R9p1i7";
    const artistName = "Radiohead"; // Example artist
    const params = new URLSearchParams({
      artistName,
      p: 1 // Page number for pagination
    });
