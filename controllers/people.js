import { fetchPerson, fetchPeople } from "../api/people.js";


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