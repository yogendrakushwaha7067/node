import express from 'express';
const app =express();


app.use(express.json()); // Middleware to parse JSON body (useful for other routes)

// Dummy facility data (Replace with database call)
const getFacilityDetails = (facilityId) => {
  return {
    name: "Sports Arena",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/bookmysportsaus.firebasestorage.app/o/users%2FN69upg91ifQGh7GuaShQyQbOQnk2%2Fuploads%2F1740549909028357.jpg?alt=media&token=93f6cfbd-ec8a-4578-a63b-2a407de39d01",
    facilityId: facilityId,
  };
};

// ✅ Change POST to GET so social media can crawl the URL
app.get("/share/facility/:facilityId", async (req, res) => {
  const facilityId = req.params.facilityId;

  // Fetch facility details (Replace this with a database query)
  const facility = getFacilityDetails(facilityId);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta property="og:title" content="${facility.name}" />
        <meta property="og:description" content="Find the best sports facilities!" />
        <meta property="og:image" content="${facility.imageUrl}" />
        <meta property="og:url" content="https://bookmysport.flutterflow.app/facilityDetailsUser?facilty=${facility.facilityId}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image">
    </head>
    <body>
        <script>
            window.location.href = "https://bookmysport.flutterflow.app/facilityDetailsUser?facilty=${facility.facilityId}";
        </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});