import fs from 'fs';
import { fetchPerson, fetchPeople, createPerson } from "../api/people.js";
import FormData from 'form-data';


export const fetchPeopleController = async function (req,res) {
    const name = req.query.name;
    console.log(req.query)
    const peopleData = await fetchPeople(name);
    if (peopleData) {
    res.render('index', { people: peopleData })
    } else {

    res.send("Not authroized.")
    }
}


export const fetchPersonController = function (req,res) {
    const personId = req.params.id;
    const personData = fetchPerson(personId);
    res.render('profile', { person: personData })
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
