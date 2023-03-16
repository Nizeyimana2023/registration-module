var express = require('express');
var router = express.Router();
exports.signup = function(req, res){
   
   message = '';

   passwordMatchError ='';
   confirmPasswordError ='';
   namesEmptyError='';
   emailEmptyError='';
   repassEmptyError='';
   PasswordEmptyError='';
   usernameEmptyError='';
   username_='';
   username__='';
   usernameExistError='';
   emailExistError='';
   usernameCheck='';
   emailCheck='';
   if(req.method == "POST"){
      var post  = req.body;
      var username = post.username;
      var password = post.password;
      var names = post.names;
      var email= post.email;
      var userTitle=post.userTitle;
      var repass=post.repass;
      var usernamecheck;
      var emailcheck;

      
   
/*
      var sqlcheckemail="SELECT username FROM `userslogin` WHERE `email`='"+email+"'";                           
      db.query(sqlcheckemail, function(err, resultsCheckEmail){       
         if(resultsCheckEmail.length){
            emailcheck = resultsCheckEmail[2].email;
            /*
            messageemail = "Error Email Already Exist.";
         res.render('signup.ejs',{messageemailerror: messageemail});
        
         message = "Error Email Already Exist.";
			 res.render('signup.ejs',{message: message});
           
         }
                 
      });
       

      var sqlcheckusername="SELECT username FROM `userslogin` WHERE `username`='"+username+"'";                           
      db.query(sqlcheckusername, function(err, resultsCheckUsername){       
         if(resultsCheckUsername.length){
            usernamecheck = resultsCheckUsername[0].username;
            /*
            messageusername = "Error Username Already Exist.";
         res.render('signup.ejs',{messageusernameerror: messageusername});
         
         message = "Error Username Already Exist.";
			 res.render('signup.ejs',{message: message});
          
        
         }
                 
      });
      */
      //var sqlcheckusername="SELECT username,email FROM `userslogin` WHERE `username`='"+username+"' OR `email`='"+email+"'"; 
     
     /* var sqlcheckusername="SELECT username FROM `userslogin` WHERE `username`='"+username+"'";                          
      db.query(sqlcheckusername, function(err, resultscheckavailable){       
         if(resultscheckavailable.length){
            usernamecheck = resultscheckavailable[0].username;
            emailcheck = resultscheckavailable[0].email;
            
            messageusername = "Error username or email Already Exist.";
         res.render('signup.ejs',{messageusernameerror: messageusername});
         
         message = "Error Username Already Exist.";
			 res.render('signup.ejs',{message: message});
         
          
        
         }
                 
      });
      */
     /*
      var sqltwo="SELECT * FROM `userslogin` WHERE `username`='"+username+"'";

      db.query(sqltwo, function(err, results){

         usernamecheck="check username";

         messageusername = "Error username or email Already Exist.";
         res.render('signup.ejs',{messageusernameerror: messageusername});
        
      });   
     
      db.query("SELECT * FROM `userslogin` WHERE `username`='"+username+"'", function (err, result, fields) {
         // if any error while executing above query, throw error
         if (err) throw err;
         // if there is no error, you have the result
         usernamecheck=console.log(result);
       });

       */
     
      
     if(repass !=password){
      //return signup.reject('Password not match');
   
          passwordMatchError= "Password not matched";
    
     }
     if(username === ''){
      usernameEmptyError= "Username is required";
     }
     if(names ===''){
      namesEmptyError='Names is required';
     }
     if(email === ''){
      emailEmptyError= "Email is required";
     }
     if(password === ''){
      PasswordEmptyError='Password is required';
     }
     if(repass === ''){
      repassEmptyError='Confirm Password is required';
     }
     
    
   

	  if(username !='' && password!='' && repass==password && names!='' && repass!='' && email!='') {
   //if(username !='' && password!='' && repass==password && names!='' && repass!='' && email!='') {
		  
      let usernameQuery = "SELECT * FROM `userslogin` WHERE username = '" + username + "'";

      db.query(usernameQuery, (err, result) => {
          
          if (result.length > 0) {
            usernameExistError='Username Already exist';
            
            
          }
         });

      let emailQuery = "SELECT * FROM `userslogin` WHERE email = '" + email + "'";
      db.query(emailQuery, (err, result) => {
          
          if (result.length > 0) {
            emailExistError='Email Already exist';

           
          }
         });
         

         let usernameEmailQueryCheck = "SELECT * FROM `userslogin` WHERE username = '" + username + "' OR email = '" + email + "'";
         db.query(usernameEmailQueryCheck, (err, result) => {
          
            if (result.length > 0) {
              //usernameExistError='Username Already exist';
              //res.render('signup.ejs');
              res.render('signup.ejs');
            }
            else{
               var sql = "INSERT INTO `userslogin`(`names`,`email`,`username`,`password`, `userTitle`) VALUES ('" + names + "','" + email + "','" + username + "','" + password + "','" + userTitle + "')";

               var query = db.query(sql, function(err, result) {
                 message = "Your account has been created succesfully.";
                 res.render('signup.ejs',{message: message});
               });
            }
           });
           

         }
      
   
	  
     else{
      res.render('signup.ejs');
     }
     /*else {
        
      //
      if(repass !=password){

         messagepassword = "Error Password and Re-Password not Match.";
         res.render('signup.ejs',{messagepasserror: messagepassword});

     }
		  //message = "Username and password is mandatory field.";
		  //res.render('signup.ejs',{message: message});
	  }
     */

   } else {
      res.render('signup');
   }
};
 
exports.studentregister = function(req, res){
   res.render('online_student_register');

}
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var userid = post.userid;
      var username = post.username;
      var password= post.password;
     
      var sql="SELECT userid, names, email, username, password, userTitle  FROM `userslogin` WHERE `username`='"+username+"' and password = '"+password+"'";                           
      db.query(sql, function(err, results){       
         if(results.length){
            req.session.userId = results[0].userid;
            req.session.user = results[0];
            console.log(results[0].userid);
            res.redirect('/users/dashboard');
         }
         else{
            message = 'You have entered invalid username or password.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};



           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `userslogin` WHERE `userid`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {data:results});    
   });       
};

exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `userslogin` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};
exports.department = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `department` WHERE `u_id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('department.ejs',{data:result});
   });
};

exports.mngUsers = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   
      var query = "SELECT * FROM userslogin ORDER BY userid DESC";
   
      db.query(query, function(error, data){

         
   
         if(error)
         {
            throw error; 
         }
         else
         {
            var sql="SELECT * FROM `userslogin` WHERE `userid`='"+userId+"'";
   db.query(sql, function(err, results){
      
            res.render('mng_users', {title:'Node.js MySQL CRUD Application', action:'list', data:results, sampleData:data});
            
   });
         }
   
      });
   
};
exports.attendance = function(req, res){
   var message = '';
   usersnotExistError='';
   usersUpdateSuccess='';
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   if(req.method == "POST"){
      var post  = req.body;
      var search = post.search;
   
      var query = "SELECT * FROM userslogin where userid='"+search+"'";
   
      db.query(query, function(error, result){

         
   
         if (result.length < 0) {
            var sql="SELECT * FROM `userslogin` WHERE `userid`='"+userId+"'";
            db.query(sql, function(err, results){
            usersnotExistError='User not Exist';
            res.render('attendance', {title:'Node.js MySQL CRUD Application',action:'list', data:results});
            
         });
          }
         else
         {
            let date_ob = new Date();
         // adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

let time= hours + ":" + minutes;

// current seconds
let seconds = date_ob.getSeconds();
   //    
   let updateQueryCheckOut = "SELECT * FROM `attendance` WHERE userId = '"+search+"' && attEnt_day = '" + date + "' && attEnt_month ='" + month + "' && attEnt_year = '" + year + "' && attEx_day = '" + date + "' &&	attEx_month ='" + month + "' &&	attEx_year='" + year + "'";
   db.query(updateQueryCheckOut, (err, result) => {
    
      if (result.length > 0) {
         var sql="SELECT * FROM `userslogin` WHERE `userid`='"+search+"'";
         db.query(sql, function(err, results){
                message = "Exit Already Recorded Successfully.";
                res.render('attendance', {title:'Node.js MySQL CRUD Application', message: message,action:'list', data:results});
                            
               });

            }
   else{
     
 
      
   
let updateQueryCheck = "SELECT * FROM `attendance` WHERE userId = '"+search+"' && attEnt_day = '" + date + "' && attEnt_month ='" + month + "' && attEnt_year = '" + year + "' && attEx_day = '' && attEx_month ='' &&	attEx_year=''";
db.query(updateQueryCheck, (err, result) => {
 
   if (result.length > 0) {
      var sql="SELECT * FROM `userslogin` WHERE `userid`='"+search+"'";
      db.query(sql, function(err, results){
         
         var query = "UPDATE `attendance` SET attEx_day = '" + date + "', attEx_month ='" + month + "', attEx_year = '" + year + "',attEx_time='" + time + "' WHERE userId = '"+search+"' && attEnt_day = '" + date + "' && attEnt_month ='" + month + "' && attEnt_year = '" + year + "'";
         db.query(query, (err, result) => {
             if (err) {
                 return res.status(500).send(err);
             }
             message = "Exit Recorded Successfully.";
   
               res.render('attendance', {title:'Node.js MySQL CRUD Application', message: message,action:'list', data:results});
         });
   });
   }

   else{
      
      var queryies = "SELECT * FROM userslogin where userid='"+search+"'";
   
      db.query(queryies, function(error, resultb){
         if (resultb.length > 0) {

            var sql="SELECT * FROM `userslogin` WHERE `userid`='"+search+"'";
            db.query(sql, function(err, results){
      var sql = "INSERT INTO `attendance`(`userId`, `attEnt_day`, `attEnt_month`, `attEnt_year`, `attEnt_time`, `attEx_day`, `attEx_month`, `attEx_year`, `attEx_time`) VALUES ('"+search+"','" + date + "','" + month + "','" + year + "','" + time + "','','','','')";
   
         var query = db.query(sql, function(err, result) {
           message = "Entrance Attendance Recorded Successfully.";
   
               res.render('attendance', {title:'Node.js MySQL CRUD Application', message: message, data:results});
               
      });
   });
   }
   else{
      var sql="SELECT * FROM `userslogin` WHERE `userid`='"+userId+"'";
            db.query(sql, function(err, results){
             message = "";
            usersnotExistError='User not Exists';
            res.render('attendance', {title:'Node.js MySQL CRUD Application', message: message,action:'list', data:results});
            
         });
   }
   });
   }
  });
   }
});
  //        
               

           
   
         }
   
      });


   }
   else{
      var sql="SELECT * FROM `userslogin` WHERE `userid`='"+userId+"'";
      db.query(sql, function(err, results){
      res.render('attendance', {title:'Node.js MySQL CRUD Application', message: message, data:results});
      
   });  
   }
   
};
exports.editUsers = function(req, res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
   var userid = req.params.userid;

	var query = `SELECT * FROM userslogin WHERE userid = "${userid}"`;

	db.query(query, function(error, data){
       
		res.render('mng_users', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});

};

//router.get('/edit/:id', function(request, response, next){
//exports.editUsers = function(req, res){
/*
exports.editUsers.get('/edit/:id', function(request, response, next){

   exports.editUsers = function(req, res){

	var id = request.params.id;

	var query = `SELECT * FROM userslogin WHERE userid = "${id}"`;

	db.query(query, function(error, data){

		response.render('mng_users', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	});


};

*/

/*
router.post('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var age = request.body.age;

	var gender = request.body.gender;

	var query = `
	UPDATE sample_data 
	SET first_name = "${first_name}", 
	last_name = "${last_name}", 
	age = "${age}", 
	gender = "${gender}" 
	WHERE id = "${id}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			request.flash('success', 'Sample Data Updated');
			response.redirect('/sample_data');
		}

	});

});
*/
exports.viewUsers = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }
      var query = "SELECT * FROM userslogin ORDER BY userid DESC";
   
      db.query(query, function(error, data){
   
         if(error)
         {
            throw error; 
         }
         else
         {
            var sql="SELECT * FROM `userslogin` WHERE `userid`='"+userId+"'";
   db.query(sql, function(err, results){
      
            res.render('view_users', {title:'Node.js MySQL CRUD Application', action:'list', data:results, sampleData:data});
            
   });
         }
   
      });
      
      
   
};
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
