require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "pug");

app.use(express.static(__dirname + "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const properties = '?properties=name&properties=niickname&properties=favorite_song'

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
const cObjProps =
  "?properties=name&properties=nickname&properties=favorite_song";
// * Code for Route 1 goes here
app.get("/", async (req, res) => {
  const homepage = `https://api.hubspot.com/crm/v3/objects/2-21293069${cObjProps}`;
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

// app.get("/update-cobj", (req, res) => {
//   // const updates = {
//   //   properties: {
//   //     name: req.body.name,
//   //     nickname: req.body.nickname,
//   //     favorite_song: req.body.favorite_song,
//   //   },
//   // };

//   res.render("updates", {
//     title: "Update Custom Object Form | Integrating With HubSpot I Practicum.",
//   });
//   console.log(req.body);
// });

app.get("/update-cobj", async (req, res) => {
  const updates = {
    name: req.body.name,
    nickname: req.body.nickname,
    favorite_song: req.body.favorite_song,
  };
  const getPet = `https://api.hubspot.com/crm/v3/objects/2-21293069${cObjProps}`;
  const headers = {
    Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
    "Content-Type": "application/json",
  };

  try {
    const resp = await axios.get(getPet, { headers });
    const data = resp.data;

    // res.json(data);
    // res.render(updates, {
    //   name: data.properties.name,
    //   nickname: data.properties.nickname,
    //   favoriteSong: data.properties.favorite_song,
    // });

    res.render("updates", {
      title:
        "Update Custom Object Form | Integrating With HubSpot I Practicum.",
      petName: data.name,
      nickname: data.nickname,
      favoriteSong: data.favorite_song,
    });
    console.log(req.body);
  } catch (err) {
    console.error(err);
  }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

// postman

let newPet = JSON.stringify({
  properties: {
    name: "",
    nickname: "",
    favorite_song: "",
  },
});

let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://api.hubapi.com/crm/v3/objects/2-21293069",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
  },
  data: newPet,
};

axios
  .request(config)
  .then((response) => {
    console.log(JSON.stringify(response.newPet), "here");
  })
  .catch((error) => {
    console.log(error);
  });

// * Localhost
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
