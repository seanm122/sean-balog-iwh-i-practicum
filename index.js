require('dotenv').config();


const express = require('express');
const axios = require('axios');
const app = express();


app.set('view engine', 'pug');
app.use(express.static(__dirname + '/homepage.pug'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// const properties = '?properties=name&properties=niickname&properties=favorite_song'

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.


// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
app.get ( '/', async (req,res) => {
    const homepage = 'https://api.hubspot.com/crm/v3/objects/2-21293069?properties=name&properties=nicknname&properties=favorite_song';
    const headers = {
        Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const resp = await axios.get(homepage, { headers });
        const data = resp.data.results;
        const pets = JSON.stringify(data);
        res.render('homepage', { pets });   
        console.log(pets)

        // console.log(JSON.stringify(data));
    } catch (error) {
        console.error(error);

     
    }    
    }); 

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here


// app.get('/update-cobj', (req, res) => {
//     res.render("updates", {
//       title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
//     });

//   });



// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here


//postman 

// let data = JSON.stringify({
//   "properties": {
//     "name": "Reef",
//     "nickname": "Riri",
//     "favorite_song": "Work"
//   }
// //   td = object.properties.name
// //   td = data.properties.nickname
// //   td = data.properties.favorite_song

// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://api.hubapi.com/crm/v3/objects/2-21293069',
//   headers: { 
//     'Content-Type': 'application/json', 
//     Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });



//       // Make a POST request to create or update the custom object data
//       await axios.post(createOrUpdateEndpoint, formData, { headers });
  
//       // Redirect the user to the homepage after form submission
//       res.redirect('/');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  

// app.post('/update', async (req, res) => {
//     const update = {
//         properties: {
//             "favorite_book": req.body.newVal
//         }
//     }

//     const email = req.query.email;
//     const updatePet = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
//     const headers = {
//         Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
//         'Content-Type': 'application/json'
//     };

//     try { 
//         await axios.patch(updatePet, update, { headers } );
//         res.redirect('back');
//     } catch(err) {
//         console.error(err);
//     }

// });






/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/



// {
//     "properties": {
//       "name": "Louie",
//       "nickname": "Lulu",
//       "favorite_song": "Dreams"
//     }
//   }

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));