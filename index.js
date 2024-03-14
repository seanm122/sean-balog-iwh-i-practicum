require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
const cObjProps =
  "?properties=pet_name&properties=pet_type&properties=nickname";
// * Code for Route 1 goes here
app.get("/", async (req, res) => {
  const homepage = `https://api.hubspot.com/crm/v3/objects/2-24717581${cObjProps}`;
  const headers = {
    Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    const resp = await axios.get(homepage, { headers });
    const data = resp.data.results;
    res.render("homepage", { data });
    // console.log(data)
  } catch (error) {
    console.error(error);
  }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

app.get("/update-cobj", async (req, res) => {
  // http://localhost:3000/update-cobj
  const updateCObj = `https://api.hubspot.com/crm/v3/objects/2-24717581${cObjProps}`;
  const headers = {
    Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    const resp = await axios.get(updateCObj, { headers });
    const data = resp.data.results;
    res.render("updates", {
      title:
        "Update Custom Object Form | Integrating With HubSpot I Practicum.",
      data,
    });
  } catch (err) {
    console.error(err);
  }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

app.post("/update-cobj", async (req, res) => {
  // const data = req.body;
  const newPet = {
    properties: {
      pet_name: req.body.pet_name,
      pet_type: req.body.pet_type,
      nickname: req.body.nickname,
    },
  };

  const addNewPet = `https://api.hubspot.com/crm/v3/objects/2-24717581`;
  const headers = {
    Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };
  try {
    await axios.post(addNewPet, newPet, { headers });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// * Localhost
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
