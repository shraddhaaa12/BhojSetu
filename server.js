const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// SAVE DONATION
// =========================

app.post("/donate", (req, res) => {
const donation = req.body;


const donationId =
    "BS-" + String(Date.now()).slice(-6);

donation.donationId = donationId;
donation.status = donation.status || "Pending Pickup";

let donations = [];

try {
    donations = JSON.parse(
        fs.readFileSync(
            "./data/donations.json",
            "utf8"
        )
    );
} catch {
    donations = [];
}

donations.push(donation);

fs.writeFileSync(
    "./data/donations.json",
    JSON.stringify(
        donations,
        null,
        2
    )
);

res.json({
    success: true,
    donationId,
    message: "Donation Saved Successfully"
});


});

// =========================
// SAVE NGO
// =========================

app.post("/ngo", (req, res) => {


const ngo = req.body;

let ngos = [];

try {
    ngos = JSON.parse(
        fs.readFileSync(
            "./data/ngos.json",
            "utf8"
        )
    );
} catch {
    ngos = [];
}

ngos.push(ngo);

fs.writeFileSync(
    "./data/ngos.json",
    JSON.stringify(
        ngos,
        null,
        2
    )
);

res.json({
    success: true,
    message: "NGO Registered Successfully"
});


});

// =========================
// GET DONATIONS
// =========================

app.get("/donations", (req, res) => {


let donations = [];

try {
    donations = JSON.parse(
        fs.readFileSync(
            "./data/donations.json",
            "utf8"
        )
    );
} catch {
    donations = [];
}

res.json(donations);


});

// =========================
// GET NGOs
// =========================

app.get("/ngos", (req, res) => {


let ngos = [];

try {
    ngos = JSON.parse(
        fs.readFileSync(
            "./data/ngos.json",
            "utf8"
        )
    );
} catch {
    ngos = [];
}

res.json(ngos);


});

// =========================
// AI RECOMMENDATION
// =========================

app.get("/recommendation", (req, res) => {


let donations = [];
let ngos = [];

try {
    donations = JSON.parse(
        fs.readFileSync(
            "./data/donations.json",
            "utf8"
        )
    );
} catch {
    donations = [];
}

try {
    ngos = JSON.parse(
        fs.readFileSync(
            "./data/ngos.json",
            "utf8"
        )
    );
} catch {
    ngos = [];
}

if (donations.length === 0) {
    return res.json({
        priority: "LOW",
        ngo: "No Donation Available",
        reason: "No donations found"
    });
}

if (ngos.length === 0) {
    return res.json({
        priority: "HIGH",
        ngo: "No NGO Registered",
        reason: "Please register NGOs first"
    });
}

const latestDonation =
    donations[donations.length - 1];

const suggestedNgo =
    ngos[Math.floor(Math.random() * ngos.length)];

res.json({
    priority: "HIGH",
    ngo:
        suggestedNgo.name ||
        suggestedNgo.ngoName ||
        suggestedNgo.organization ||
        "Helping Hands NGO",

    reason:
        `${latestDonation.foodType || "Food"} available at ${
            latestDonation.location || "Unknown Location"
        }
});


});

// =========================
// IMPACT STATS
// =========================

app.get("/impact", (req, res) => {


let donations = [];

try {
    donations = JSON.parse(
        fs.readFileSync(
            "./data/donations.json",
            "utf8"
        )
    );
} catch {
    donations = [];
}

const totalDonations =
    donations.length;

res.json({
    totalDonations,
    mealsServed: totalDonations * 20,
    foodSavedKg: totalDonations * 5,
    co2SavedKg: totalDonations * 2
});


});

// =========================
// SERVER START
// =========================

app.listen(3000, () => {
console.log(
"Server running on http://localhost:3000"
);
});
