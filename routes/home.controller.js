const fs = require('fs');

exports.getHomePage = (req, res) => {
    var user =  req.session.user,
    userId = req.session.userId;
    console.log('ddd='+userId);
    if(userId == null){
       res.redirect("/login");
       return;
    }
    let query = "SELECT * FROM `players` ORDER BY id ASC"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
       /*
        res.render('mng_players', {
            title: "Welcome to Socka | View Players",
            players: result
        });
        */
        var sql="SELECT * FROM `userslogin` WHERE `userid`='"+userId+"'";
   db.query(sql, function(err, results){
      
            res.render('mng_players', {title:'Welcome to Socka | View Players', action:'list', data:results, players: result});
            
   });
    });
};
