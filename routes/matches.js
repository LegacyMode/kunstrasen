const express = require('express')

const app = express()

let matchesCollection = []

app.get('/:id', (req, res) => {
	// find match with :id from Database
	// return view with match object
	
	return res.send(req.params.id)
})

app.post('/', function (req, res) {
	// create empty match object
	// fill with request body
	// save in database

	//matchesCollection.push('neues match')
})

//edit

//delete


module.exports = app