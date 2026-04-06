const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Your keys
const keys = [
    "CORNY-H2M8-Z4C6","CORNY-J9P1-A7S3","CORNY-K6T2-Y8U4","CORNY-L3V7-B1N9","CORNY-M8X4-C5D2",
    "CORNY-N1Z9-E6R7","CORNY-P5Q2-W3E8","CORNY-Q7A6-S4D1","CORNY-R2F8-G9H3","CORNY-S9J1-K6L4",
    "CORNY-T4O7-P2L8","CORNY-U6I3-O9K5","CORNY-V1B8-N7M2","CORNY-W3E5-R2T9","CORNY-X8C6-V4B1",
    "CORNY-Y2U9-I7O3","CORNY-Z7X1-C8V4","CORNY-A5S3-D9F6","CORNY-B9N2-M4V7","CORNY-C1K8-L3J5",
    "CORNY-D7W4-Q6E2","CORNY-E3R1-T8Y9","CORNY-F8H6-J2K7","CORNY-G4P9-O1L3","CORNY-H6Z2-X7C8",
    "CORNY-I9A5-S3D4","CORNY-J1F7-G8H2","CORNY-K7L2-O4P6","CORNY-L2M9-N8B3","CORNY-M6Q4-W1E7",
    "CORNY-N8V5-B2C1","CORNY-O3P7-L9K4","CORNY-P1T6-Y3U8","CORNY-Q4E2-R7W5","CORNY-R8G6-H1J9",
    "CORNY-S3D5-F2A7","CORNY-T9Y1-U4I6","CORNY-U2O7-P8L3","CORNY-V7B1-N6M5","CORNY-W1R9-Q4E2",
    "CORNY-X5C2-Z8V7","CORNY-Y8T6-U1I4","CORNY-Z2X7-C3V9","CORNY-A9S1-D4F8","CORNY-B4N6-M2V1",
    "CORNY-C6K3-L7J8","CORNY-D1W8-Q5E4","CORNY-E7R2-T3Y6","CORNY-F2H9-J4K1","CORNY-G9P6-O2L7",
    "CORNY-H3Z8-X1C5","CORNY-I4A7-S9D2","CORNY-J8F1-G3H6","CORNY-K5L9-O7P2","CORNY-L7M2-N1B8",
    "CORNY-M1Q8-W6E3","CORNY-N5V4-B7C9","CORNY-O9P3-L6K1","CORNY-P6T8-Y2U5","CORNY-Q2E7-R9W1",
    "CORNY-R5G3-H7J4","CORNY-S8D6-F1A9","CORNY-T3Y4-U7I2","CORNY-U9O1-P5L6","CORNY-V4B7-N3M8",
    "CORNY-W7R1-Q2E6","CORNY-X2C9-Z4V3","CORNY-Y6T3-U8I1","CORNY-Z8X5-C2V7","CORNY-A3S7-D1F9",
    "CORNY-B1N4-M8V2","CORNY-C5K7-L2J6","CORNY-D9W3-Q1E8","CORNY-E1R6-T7Y2","CORNY-F4H2-J9K3",
    "CORNY-G2P8-O6L1","CORNY-H8Z4-X3C7","CORNY-I7A2-S6D5","CORNY-J6F9-G1H8","CORNY-K2L4-O8P3",
    "CORNY-L9M1-N5B7","CORNY-M4Q3-W7E8","CORNY-N7V2-B1C6","CORNY-O6P5-L4K9","CORNY-P3T1-Y9U7",
    "CORNY-Q9E6-R3W2","CORNY-R1G7-H8J5","CORNY-S6D2-F4A3","CORNY-T2Y9-U6I8","CORNY-U8O3-P7L2",
    "CORNY-V3B9-N4M1","CORNY-W6R8-Q5E7","CORNY-X1C4-Z9V6","CORNY-Y4T2-U3I7","CORNY-Z5X9-C1V8"
];

// Track key expiration
const keyExpiry = {};

// Generate key
app.get('/generate', (req, res) => {
    if (keys.length === 0) return res.json({ error: "No keys left" });

    const randomIndex = Math.floor(Math.random() * keys.length);
    const key = keys[randomIndex];

    // 24-hour expiration
    keyExpiry[key] = Date.now() + (24 * 60 * 60 * 1000);

    res.json({ key: key });
});

// Validate key
app.get('/validate/:key', (req, res) => {
    const key = req.params.key;

    if (!keys.includes(key)) {
        return res.json({ valid: false, message: "Invalid key" });
    }

    const expiry = keyExpiry[key];
    if (!expiry || Date.now() > expiry) {
        return res.json({ valid: false, message: "Key expired" });
    }

    res.json({ valid: true, message: "Key is valid" });
});

// Start server
app.listen(port, () => {
    console.log(`Key generator running at http://localhost:${port}`);
});