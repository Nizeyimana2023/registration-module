const fs = require('fs');
exports.addPlayerPage = (req, res) => {
    res.render('add-player.ejs', {
        title: "Welcome to Socka | Add a new player",
        message: ''
    });
};

exports.addPlayer = (req, res) => {
  
    var user =  req.session.user,
    userId = req.session.userId;
    console.log('ddd='+userId);
    if(userId == null){
       res.redirect("/login");
       return;
    }
    if (!req.files) {
        // ...
        return res.status(400).send("No files were uploaded.");
       }

    let message = '';
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;
    let username = req.body.username;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    image_name = username + '.' + fileExtension;
    

    let usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Username already exists';
            res.render('add-player.ejs', {
                message,
                title: "Welcome to Socka | Add a new player"
            });
        } else {
            
            // check the filetype before uploading it
            if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                // upload the file to the /public/assets/img directory
               
                uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the player's details to the database
                    let query = "INSERT INTO `players` (first_name, last_name, position, number, image, user_name) VALUES ('" +
                        first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/users/mng_players');
                    });
                });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('add-player.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new player"
                });
            }
        }
    });
}

exports.editPlayerPage = (req, res) => {
    var user =  req.session.user,
    userId = req.session.userId;
    console.log('ddd='+userId);
    if(userId == null){
       res.redirect("/login");
       return;
    }

    let playerId = req.params.id;
    let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        /*
        res.render('edit-player', {
            title: "Edit  Player",
            player: result[0],
            message: ''
        });
        */
        var sql="SELECT * FROM `userslogin` WHERE `userid`='"+userId+"'";
   db.query(sql, function(err, results){
      
            res.render('edit-player', {title:'Edit  Player', action:'list', data:results, player: result[0], message: ''});
            
   });
    });
}

exports.editPlayer = (req, res) => {
 
    var user =  req.session.user,
    userId = req.session.userId;
    console.log('ddd='+userId);
    if(userId == null){
       res.redirect("/login");
       return;
    }
    
    let playerId = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number = req.body.number;
   
    /*
        var post  = req.body;
        var playerId = post.playerId;
        var first_name = post.first_name;
        var last_name = post.last_name;
        var position= post.position;
        var number= post.number;
    */   

    var query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/users/mng_players');
    });
}


exports.deletePlayer = (req, res) => {
    let playerId = req.params.id;
    let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
    let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let image = result[0].image;

        fs.unlink(`public/assets/img/${image}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/users/mng_players');
            });
        });
    });
}
