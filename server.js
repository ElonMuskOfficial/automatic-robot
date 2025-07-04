const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/scrape", async (req, res) => {
  const targetUrl = req.query.url; // Get the URL from the 'url' query parameter

  // Check if a URL was provided
  if (!targetUrl) {
    return res.status(400).send("Please provide a 'url' query parameter.");
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.7",
        "cache-control": "no-cache",
        pragma: "no-cache",
        priority: "u=0, i",
        "sec-ch-ua": '"Not)A;Brand";v="8", "Chromium";v="138", "Brave";v="138"',
        "sec-ch-ua-arch": '"x86"',
        "sec-ch-ua-bitness": '"64"',
        "sec-ch-ua-full-version-list":
          '"Not)A;Brand";v="8.0.0.0", "Chromium";v="138.0.0.0", "Brave";v="138.0.0.0"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": '""',
        "sec-ch-ua-platform": '"Windows"',
        "sec-ch-ua-platform-version": '"19.0.0"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "cross-site",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
      },
      body: null,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} for URL: ${targetUrl}`,
      );
    }

    const data = await response.text();
    console.log(`Scraped data from ${targetUrl}`); // Log the data on the server
    res.send(data); // Send the scraped data as the response to the client
  } catch (err) {
    console.error(`Error during fetch for ${targetUrl}:`, err); // Log the error on the server
    res
      .status(500)
      .send(`Error scraping data from ${targetUrl}: ${err.message}`); // Send an error response to the client
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
