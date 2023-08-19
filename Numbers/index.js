const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000; 

app.get('/api/numbers', async (req, res) => {
    const urlList = req.query.url;

    if (!urlList || !Array.isArray(urlList)) {
        return res.status(400).json({ error: 'Invalid or missing "url" query parameter' });
    }

    const numbers = [];

    for (const url of urlList) {
        try {
            const response = await axios.get(url);
            if (response.status === 200 && response.data.numbers) {
                numbers.push(...response.data.numbers);
            }
        } catch (error) {
            console.error(`Error fetching data from ${url}: ${error.message}`);
        }
    }

    res.json({ numbers });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
