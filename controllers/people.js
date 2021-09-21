import { fetchPerson, fetchPeople, createPerson } from "../api/people.js";
import fs from 'fs';
import FormData from 'form-data';


export const fetchPeopleController = async function (req,res) {
    const name = req.query.name;
    console.log(req.query)
    let user;
    if (req.isAuthenticated()) {
        user = {
            id: req.user.rows[0].id,
            username: req.user.rows[0].username,
        };
    } else {
        user = null;
    }
    const peopleData = await fetchPeople(name);
    if (peopleData) {
        res.render('index', { 
            people: peopleData,
            user: user, 
        });
    } else {

    res.send("Not authroized.")
    }
}


export const fetchPersonController = async function (req,res) {
    // const personId = req.params.id;
    // const personData = await fetchPerson(personId);
    // res.render('profile', { person: personData })
    let personId = req.params.id;
    const personData = await fetchPerson(personId);
    console.log(personData)
    if (personData) {
        res.render('profile', { person: personData });
    } else {
        res.send('Not authorized.');
    }
}

export const createPersonFromController = function (req, res) {
    res.render('newProfile')
}

export const createPersonController = async function (req, res) {
    let personData = req.body;
    const form = new FormData();
    form.append('name', personData.name);
    form.append('tagline', personData.tagline);
    form.append('bio', personData.bio);
    const fileStream = fs.createReadStream(req.file.path);
    form.append('photo', fileStream, req.file.originalname);

    let newPerson;
    try {
          newPerson = await createPerson(form);
    } catch (err) {
          console.log(err);
    }
    if (newPerson) {
          res.render('profile', { person: newPerson });
    } else {
          res.send('Error.');
    }
};
