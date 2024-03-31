const express = require("express"); // IMPORT EXPRESS PACKAGE
const mongoose = require('mongoose'); // FOR DATABASE
const User = require('./db_models/users'); // MONGODB TABLE NAME
// MONGODB-URL-STRING TO CONNECT YOUR PROJECT WITH REALTIME DATABASE
const MONGODB_URI = ``;

const bodyParser = require('body-parser');

// CREATE AN INSTANCE OF EXPRESS SERVER
const app = express();

// DEFINING PORT FOR DYNAMIC ROUTING AFTER DEPLOYMENT
const PORT = 8000;

// USING BODY PARSER FOR TO PARSE THE INCOMING JSON BODY IN THE REQUEST
app.use(bodyParser.json())


// DEFINE YOUR ROUTES HERE

// GET ALL USERS
app.get('/users', (req, res) => {
    // FETCHING DATA FROM USER TABLE
    User.find()
        .then((users) => {
            res.status(200).json({
                statusCode: 200,
                message: "Users fetched Successfully",
                users: users,
            })
        }).catch(err => {
            if (!err.statusCode) {
                const error = new Error({ message: err.message, code: 401 });
                error.statusCode = 500;
                throw error
            }
        })
});


//GET USER BY ID
app.get('/users/:id', (req, res, next) => {
    // GETTING id FROM req (REQUEST)
    const id = req.params.id
    User.findById(id)
        .then((user) => {
            if (!user) {
                const error = new Error("No User Found..!");
                error.statusCode = 400;
                throw error
            }
            res.status(200).json({
                statusCode: 200,
                message: "User fetched.",
                user: user
            })
        }).catch(err => {
            next(err)
        })

});



//CREATE NEW USER
app.post('/users', (req, res, next) => {
    console.log(req)
    const user = new User({
        name: req.body.name,
        age: req.body.age,
    })
    user.save().then((result) => {
        res.status(201).json({
            message: "User Created Successfully",
            user: result
        })
    }).catch(err => {
        next(err);
    })
});





// UPDATE A USER
app.put('/users/:id', (req, res, next) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            if (!user) {
                const error = new Error("Could not find post");
                error.statusCode = 404;
                throw error
            }
            // user.name = req.body.name || user.name;
            // user.age = req.body.age || user.age;

            const keys = ['name', 'age'];

            keys.forEach(key => {
                if (req.body.hasOwnProperty(key)) {
                    user[key] = req.body[key];
                }
            });

            return user.save();
        }).then(response => {
            res.status(200).json({
                 statusCode: 200, 
                 message: "User Updated Successfully", 
                 user: response 
                })
        }). catch(err => {
            next(err);
        });
});




// DELETE A USER
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({
                statusCode: 200,
                message: "User Deleted Successfully"
            })
        }).catch(err => {
            if (!err.statusCode) {
                const error = new Error({ message: err.message, code: 401 });
                error.statusCode = 500;
                throw error
            }
        })
});




// SENDING REQUEST TO MONGODB TO GET CONNECTED
mongoose.connect(MONGODB_URI).then(() => {
    console.log("DB Connection Established.")
    // FINALLY RUNNING THE SERVER
    app.listen(PORT, (req, res) => {
        console.log(`Server is Running at PORT ${PORT}`);
    })

}).catch(err => {
    console.log(err)
});