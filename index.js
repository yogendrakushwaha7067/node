import express from "express";
const app = express();

app.use(express.json()); // Middleware to parse JSON body

// Dummy facility data (Replace with a database query)
const getFacilityDetails = (facilityId) => {
  return {
    name: "Sports Arena",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/bookmysportsaus.firebasestorage.app/o/users%2FN69upg91ifQGh7GuaShQyQbOQnk2%2Fuploads%2F1740549909028357.jpg?alt=media&token=93f6cfbd-ec8a-4578-a63b-2a407de39d01",
    facilityId: facilityId,
  };
};

// ✅ GET request for Open Graph link preview
app.get("/share/facility/:facilityId", async (req, res) => {
  const facilityId = req.params.facilityId;
  const facility = getFacilityDetails(facilityId);

  res.setHeader("Content-Type", "text/html"); // Ensure proper content type

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- Open Graph Tags for Social Media Preview -->
        <meta property="og:title" content="${facility.name}" />
        <meta property="og:description" content="Find the best sports facilities!" />
        <meta property="og:image" content="${facility.imageUrl}" />
        <meta property="og:url" content="https://bookmysport.flutterflow.app/facilityDetailsUser?facilty=${facility.facilityId}" />
        <meta property="og:type" content="website" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${facility.name}">
        <meta name="twitter:description" content="Find the best sports facilities!">
        <meta name="twitter:image" content="${facility.imageUrl}">

        <title>${facility.name} | Book My Sport</title>

        <!-- Force Social Media Refresh -->
        <meta http-equiv="refresh" content="3; url=https://bookmysport.flutterflow.app/facilityDetailsUser?facilty=${facility.facilityId}" />

    </head>
    <body>
        <h1>Redirecting to Facility Details...</h1>
        <p>If not redirected, <a href="https://bookmysport.flutterflow.app/facilityDetailsUser?facilty=${facility.facilityId}">click here</a>.</p>

        <script>
            setTimeout(() => {
                window.location.href = "https://bookmysport.flutterflow.app/facilityDetailsUser?facilty=${facility.facilityId}";
            }, 3000);
        </script>
    </body>
    </html>
  `);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
