import express from 'express';
import { peopleData } from './fixtures/people.js';

const app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', './views/');

app.listen(3000, () => {
    console.log('Server started!');
});

app.get('/', (req, res) => {
    console.log(peopleData);
    //res.send('Hello world...');
    res.render('index', { people: peopleData });
});

app.get('/profile/:id', (req, res) => {
    let personId = req.params.id;
    let person;
    peopleData.every((personData) => {
    if (personData.id == personId) {
        person = personData;
        return false;
    }
    });
    res.render('profile', { person: person });
});