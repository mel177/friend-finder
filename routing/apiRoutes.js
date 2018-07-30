// require the friends data
var friends = require('../data/friends');


// Routes
module.exports = function(app){

    app.get('/api/friends', function(req, res){
        res.json(friends);
    });


    app.post('/api/friends', function(req, res){


        var friendMatch = {
            name: "",
            photo: "",		
            friendDifference: 1000
		};

		// Here we take the result of the user's survey POST and parse it.
		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;

		var totalDifference = 0;

		// Loop through all the friend possibilities in the database. 
		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// Loop through all the scores of each friend
			for (var f=0; f< friends[i].scores[f]; f++){

				// We calculate the difference between the scores and sum them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[f]) - parseInt(friends[i].scores[f]));

				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= friendMatch.friendDifference){

					// Reset the friendMatch to be the new friend. 
					friendMatch.name = friends[i].name;
					friendMatch.photo = friends[i].photo;
					friendMatch.friendDifference = totalDifference;
				}
			}
		}

		// save the user's data to the database happens AFTER the check.
		friends.push(userData);

		// Return a JSON with the user's bestMatch. 
		res.json(friendMatch);

	});

};