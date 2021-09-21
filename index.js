import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import dotenv from 'dotenv';
import { pool } from './db.js';
import peopleRouter from './routes/people.js';
import userRouter from './routes/users.js';

dotenv.config();

const app = express();


app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.json());

app.use(
    session({
        store: new (connectPgSimple(session))({
            createTableIfMissing: true,
            pool: pool,
        }),
        secret: process.env.COOKIE_SECRET,
        resave: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(async function (username, password, done) {
        let result;
        try {
            const sql = 'SELECT * FROM users WHERE username = $1';
            const values = [username];
            result = await pool.query(sql, values);
        } catch (error) {
            return done(error);
        }
        if (!result) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        const match = await bcrypt.compare(password,result.rows[0].password);
        if (match) {
            return done(null, result);
    }
        return done(null, false, { message: 'Incorrect password.' });
    })
);

passport.serializeUser(function (user, done) {
    let userObject = {
        id: user.rows[0].id,
        username: user.rows[0].username,
    };
    done(null, userObject);
});

passport.deserializeUser(async function (user, done) {
    const sql = 'SELECT * FROM users WHERE username = $1';
    const values = [user.username];
    let result;
    try {
        result = await pool.query(sql, values);
        done(null, result);
    } catch (error) {
        done(err, result);
    }
});

app.use(express.static('static'));
app.set('view engine', 'ejs');
app.set('views', './views/pages/');

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started!');
});

// app.get('/', (req, res) => {
//     console.log(peopleData);
//     //res.send('Hello world...');
//     res.render('index', { people: peopleData });
// });

// app.get('/profile/:id', (req, res) => {
//     let personId = req.params.id;
//     let person;
//     peopleData.every((personData) => {
//     if (personData.id == personId) {
//         person = personData;
//         return false;
//     }
//     });
//     res.render('profile', { person: person });
// });

app.use('/', peopleRouter);
app.use('/', userRouter);