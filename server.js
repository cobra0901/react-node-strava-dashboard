var express = require('express');
var app = express();
var strava = require('strava-v3');
var Users = require('./models/UserSchema.js');

// --bodyParser-- to read POST data
var bodyParser = require('body-parser');
app.use(bodyParser.json());


// --Mongo declaration--
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/my_database'; //<--dbname
var connection = mongoose.connect(mongoDB, {
  useMongoClient: true
});


mongoose.Promise = global.Promise;

var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// to list all collection
db.on('open', function(){
    // clear db?
    //connection.db.dropCollection('kayouhusers');
    connection.db.listCollections().toArray(function(err, names){
        console.log(names);
    });
})

//--== Mongo done ==--


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT"); // tambahan untuk preflight error -> AXIOS request from Front (dia nembak OPTIONS dulu awalnya, ngecek domain eligible or not..)
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // INI IMPORTANT JUGA VRO!!

    if(process.argv.indexOf("delayresponse")>-1) {
        setTimeout(function(){
			console.log('next data....')
            next();
        }, 5000);
    } else {
        next();
    }
});

app.get('/tickets/urgent', function (req, res) {
    res.json({
        min: 0,
        max: 24,
        value: Math.floor(Math.random() * 5)
    })
});


app.get('/users/', function(req,res,next) {
    Users.find(function(err, users){
        if(err)
            return next(err);
        res.json(users);
    })
});

app.get('/user/:id', function(req,res,next) {
    Users.findById(req.params.id, function(err, user){
        if(err)
            return next(err);
        res.json(user);
    })
});

app.post('/user/', function(req,res,next) {
    console.log(req.body);
    
    Users.create(req.body, function(err, result){ //'body', due to POST
        if(err)
            return next(err);
        res.json(result);
    })
});


app.get('/strava/profile', function (req,res) {
	strava.athlete.get({access_token: req.query._id}, function(err,payload,limits){
		if(!err){
			res.json(payload)
			console.log(limits)
		}
		else
			res.json(err)
	})
});


app.get('/strava/stats', function (req,res) {
	strava.athletes.stats({id: req.query.athlete_id, access_token: req.query._id}, function(err,payload,limits){
		if(!err){
			res.json(payload)
			console.log(limits)
		}
		else
			res.json(err)
	})
});

app.get('/strava/activities', function (req,res) {
    console.log(req.query);
	//strava.athlete.listActivities({id: 2802131}, function(err,payload,limits){
    strava.athlete.listActivities({access_token: req.query._id}, function(err,payload,limits){
		if(!err){
			res.json(payload)
			console.log(limits)
		}
		else
			res.json(err)
	})
})

app.get('/strava/speed', function (req,res) {
    var promises = []
    console.log(req.query);

    //strava.athlete.listActivities({id: 2802131}, function(err,payload,limits){
    strava.athlete.listActivities({access_token: req.query._id, metric:req.query.metric}, function(err,activities,limits){
        var data_count = activities.length;
        var total_avg_speed = 0;

        if(!err){
            console.log(limits)

            for (var activity of activities){  // not 'in' activities --> will return index only
                promises.push(fetchAllAvg (activity.id))
                //total_avg_speed += activity.average_speed
            }

            Promise.all(promises).then(function(result) {
                for (var each_avg of result) {
                    total_avg_speed += each_avg
                }

                var avg_speed = total_avg_speed / data_count;
                console.log(`total_avg_speed = ${total_avg_speed}`)
                console.log(`data_count =  ${data_count}`)

                // check what do you want to return (kph / mph)
                if (req.query.metric == 'kph')
                    res.json({'avg': Math.ceil(convertToKPH(avg_speed))}) 
                else if (req.query.metric == 'mph')
                    res.json({'avg': Math.ceil(convertToMPH(avg_speed))}) 
                else 
                    res.json({'err': 'Please define metric to use.'})

            })
            
        }
        else
            res.json(err)
    })

    var fetchAllAvg = function(id){
        return new Promise(function (resolve,reject){
            strava.activities.get({id: id}, function(err, payload, limits){
                if(!err){
                    console.log('got one avg: ' + payload.average_speed)
                    resolve(payload.average_speed);
                }
                else
                    reject (err)
            });
        })
    }

    var convertToKPH = function (mps){
        return mps * 3.6;
    }
    var convertToMPH = function (mps){
        return (convertToKPH(mps) / 1.6);
    }

});

app.get('/strava/activity/:id', function (req,res) {
	strava.activities.get({id: req.params.id}, function(err,payload,limits){
		if(!err){
			res.json(payload)
			console.log(limits)
		}
		else
			res.json(err)
	})
});

app.get('/strava/calories/', function (req,res) {
	var promises = [];
    
    // try to limit activities only to current month:
    var today = new Date();
    
    var startOfYear = today.getFullYear() + '-01-01T00:00:00Z';
    var startOfMonth = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).substr(-2) + '-' + '01T00:00:00Z';
    //var startOfWeek = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).substr(-2) + '-' + (today.getDate() + (today.getDay() == 0?-6:1)-today.getDay())  + 'T00:00:00Z'

    today.setDate(today.getDate()-7)
    var startOfWeek = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).substr(-2) + '-' + today.getDate() + 'T00:00:00Z';

    // seconds after UNIX epoch (required format by Strava API)
    var startOfMonthUNIX = new Date(startOfMonth).getTime() / 1000
    var startOfWeekUNIX = new Date(startOfWeek).getTime() / 1000
    var startOfYearUNIX = new Date(startOfYear).getTime() / 1000

    if(req.query.period == 'week')
        start_date = startOfWeekUNIX
    else if(req.query.period == 'month')
        start_date = startOfMonthUNIX
    else if(req.query.period == 'year')
        start_date = startOfYearUNIX

    console.log(startOfMonth + " // " + startOfWeek)

    strava.athlete.listActivities({after:start_date, access_token: req.query._id}, function(err,activities,limits){
		if(!err){
            //console.log(activities);

			for (var activity of activities){  // not 'in' activities --> will return index only
				promises.push (fetchCalories (activity.id));
			}

			//collect all promises..
			Promise.all(promises).then(function(results) {
				var total_cal = 0;
				for (calories of results){
					total_cal += calories;
				}
				res.json({'total_cal': Math.ceil(total_cal)});

			}, function(err) {
				console.log('error on Promise') ;
				console.log(calories);
				res.json({'status': 400});
			});
		}

		// res.json({'total_cal': 20891});
	});

	var fetchCalories = function(id) {
			console.log('fetching activites: ' + id);
			return new Promise( function(resolve,reject) {
				strava.activities.get({id: id}, function(err,payloadd,limits){
					if(!err){
						//pool.push ({'id': payloadd.id, 'calories':payloadd.calories})
						resolve(payloadd.calories);
					}
					else
						reject(err);
				});
			});
	}	
});

app.get('/tickets/progression', function (req, res) {
    var labels = ["Opened Tickets", "Closed Tickets"];
    var colors = ["#e74c3c", "#27ae60"];
    var values = [];

    labels.forEach((label, index) => {
        var data = [];
        for(var i = 0; i < 7; i++) {
            data.push(Math.floor(Math.random() * 10) + i);
        }

        values.push({
            label,
            data,
            color: colors[index]
        });
    });

    res.json(values);
});

app.get('/tickets/*', function (req, res) {
    res.json({
        value: Math.floor(Math.random() * 10) + 1
    })
});

app.get('/stats/top', function (req, res) {
    res.json([
        {
            label: "Lauren",
            value: Math.floor(Math.random() * 5) + 26
        },
        {
            label: "Dave",
            value: Math.floor(Math.random() * 5) + 13
        },
        {
            label: "John",
            value: Math.floor(Math.random() * 5) + 18
        },
        {
            label: "Gregg",
            value: Math.floor(Math.random() * 5) + 19
        },
        {
            label: "Matt",
            value: Math.floor(Math.random() * 5) + 4
        },
        {
            label: "Jaral",
            value: Math.floor(Math.random() * 5) + 12
        },
        {
            label: "Bridget",
            value: Math.floor(Math.random() * 5) + 18
        },
        {
            label: "Rob",
            value: Math.floor(Math.random() * 5) + 7
        }
    ]);    
});

app.get('/stats/*', function (req, res) {
    res.json({
        min: 0,
        max: 100,
        value: Math.floor(Math.random() * 25) + 50
    });
});

app.listen(3001, function () {
    console.log('Data being served from http://localhost:3001');
});