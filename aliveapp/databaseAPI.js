import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json()); // Parse JSON requests

// Database connection
const db = createConnection({
    host: "istanbul.mysql.database.azure.com",
    user: "bailey",
    password: "705147320",
    database: "prj_music",
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database.');
    }
});

// Define API routes
app.get('/setlists', async (req, res) => {
    const { artistName, date } = req.query; // Read query params
    //console.log("called app.get/setlists");

    let query = `
        SELECT 
            s.id AS setlist_id,
            a.name AS artist_name,
            v.name AS venue_name,
            v.address AS venue_address,
            s.date,
            GROUP_CONCAT(sg.title ORDER BY ss.order_num ASC) AS setlist_songs,
            GROUP_CONCAT(DISTINCT vds.url) AS videos
        FROM Setlists s
        JOIN Artist a ON s.artist_id = a.id
        JOIN Venue v ON s.venue_id = v.id
        LEFT JOIN SetlistSongs ss ON s.id = ss.setlist_id
        LEFT JOIN Songs sg ON ss.song_id = sg.id
        LEFT JOIN Videos vds ON vds.setlist_id = s.id
        WHERE 1=1
    `;

    const queryParams = [];

    // Add conditions for filters
    if (artistName) {
        query += ' AND a.name = ?';
        queryParams.push(artistName);
    }
    if (date) {
        query += ' AND s.date = ?';
        queryParams.push(date);
    }

    query += `
        GROUP BY s.id
        ORDER BY s.date ASC
    `;

    try {
        const [rows] = await db.promise().query(query, queryParams);
        //console.log("node got query result: " + rows[0])
        res.json(rows); // Return the filtered results
    } catch (error) {
        console.log('Error fetching concerts:', error.message);
        res.status(500).json({ error: 'Error fetching concerts' });
    }
});

app.get('/upcomingShows', async (req, res) => {
    const { artistName, venue, date } = req.query; // Read query params
    console.log("Venue:", venue);

    let query = `
        SELECT 
            UpcomingShows.id AS show_id,
            Artist.name AS artist_name,
            Artist.imageLink AS artist_image,
            Venue.name AS venue_name,
            Venue.address AS venue_address,
            Venue.capacity AS venue_capacity,
            UpcomingShows.date AS show_date
        FROM UpcomingShows
        INNER JOIN Artist ON UpcomingShows.artist_id = Artist.id
        INNER JOIN Venue ON UpcomingShows.venue_id = Venue.id
        WHERE 1 = 1
    `;

    const queryParams = [];

    // Add conditions for filters dynamically
    if (artistName) {
        query += ' AND Artist.name = ?';
        queryParams.push(artistName);
    }
    if (venue) {
        query += ' AND Venue.name = ?';
        queryParams.push(venue);
    }
    if (date) {
        query += ' AND UpcomingShows.date = ?';
        queryParams.push(date);
    }

    query += `
        ORDER BY UpcomingShows.date;
    `;

    try {
        const [rows] = await db.promise().query(query, queryParams);
        res.json(rows); // Return the filtered results
    } catch (error) {
        console.error('Error fetching upcoming shows:', error.message);
        res.status(500).json({ error: 'Error fetching upcoming shows' });
    }
});




// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
