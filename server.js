const express = require('express');
const bcrypt = require('bcryptjs');
//Must be installed to link frontend to backend
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'admin',
		database: 'smartbrain'
	}
});

const app = express();
//Allows you to read json values (needed in every project)
app.use(express.json());


app.use(cors());

app.get('/', (req, res) => {
	
	res.json(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) } );

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => { image.handleImage(req, res, db)});





// var hash = bcrypt.hashSync('bacon', 8);

app.listen(3000, () => {
	console.log('App is running on port 3000')
});



/*
PROJECT GUIDE

/ 					--> res = this is working
/signin 			--> POST = success/fail
/register 			--> POST = user
/profile/:userId 	--> GET = user
/image 				--> PUT = user (rank)
*/