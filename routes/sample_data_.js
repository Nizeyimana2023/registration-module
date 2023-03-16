var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("users/mng_users", function(request, response, next){

	var query = "SELECT * FROM userslogin ORDER BY userid DESC";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data', {title:'Node.js MySQL CRUD Application', action:'list', sampleData:data, message:request.flash('success')});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("sample_data", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_sample_data", function(request, response, next){

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var age = request.body.age;

	var gender = request.body.gender;

	var query = `
	INSERT INTO sample_data 
	(first_name, last_name, age, gender) 
	VALUES ("${first_name}", "${last_name}", "${age}", "${gender}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			request.flash('success', 'Sample Data Inserted');
			response.redirect("/sample_data");
		}

	});

});

router.get('edit/:userid', function(request, response, next){

	var userid = request.params.userid;

	var query = `SELECT * FROM userslogin WHERE userid = "${userid}"`;

	database.query(query, function(error, data){
       
		response.render('mng_users', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

});

router.post('/edit/:userid', function(request, response, next){

	var userid = request.params.userid;

	var names = request.body.names;

	var email = request.body.email;

	var username = request.body.username;


	var query = `
	UPDATE userslogin 
	SET names = "${names}", 
	email = "${email}", 
	username = "${username}"
	WHERE userid = "${userid}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Sample Data Updated');
			response.redirect('mng_users');
		}

	});

});

router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM sample_data WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Sample Data Deleted');
			response.redirect("/sample_data");
		}

	});

});

module.exports = router;