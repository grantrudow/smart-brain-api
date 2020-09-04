const express = require('express');
const bcrypt = require('bcryptjs');
//Must be installed to link frontend to backend
const cors = require('cors');

const app = express();
//Allows you to read json values (needed in every project)
app.use(express.json());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}

app.use(cors());

app.get('/', (req, res) => {
	res.json(database.users);
})

app.post('/signin', (req, res)=> {
	// Load hash from your password DB.
	bcrypt.compare("apples", '$2a$10$W2bmwBTPlFubg4zE/k3HEuO8khymQ6.OXEQOHfIJ1oV3/wSAIxEh.', function(err, res) {
		// res === true
		console.log('first guess', res)
	});
	bcrypt.compare("not_bacon", '$2a$10$W2bmwBTPlFubg4zE/k3HEuO8khymQ6.OXEQOHfIJ1oV3/wSAIxEh.', function(err, res) {
		// res === false
		console.log('second guess', res)
	});

	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('Error logging in')
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync("B4c0/\/", salt);
	console.log(hash);
	// Store hash in your password DB.
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(404).json('No such user')
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(404).json('No such user')
	}
})





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