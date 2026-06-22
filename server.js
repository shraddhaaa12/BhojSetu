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

    let donations = [];

    try {

        donations = JSON.parse(
            fs.readFileSync(
                "./data/donations.json",
                "utf8"
            )
        );

    } catch (error) {

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
        message:
            "Donation Saved Successfully",
        donationId:
            donationId
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

    } catch (error) {

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
        message:
            "NGO Registered Successfully"
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

    } catch (error) {

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

    } catch (error) {

        ngos = [];

    }

    res.json(ngos);

});


// =========================
// SERVER START
// =========================

app.listen(3000, () => {

    console.log(
        "Server running on http://localhost:3000"
    );

});

