const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Database connection
const db = mysql.createConnection({
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
        res.json(rows); // Return the filtered results
    } catch (error) {
        console.error('Error fetching concerts:', error.message);
        res.status(500).json({ error: 'Error fetching concerts' });
    }
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
