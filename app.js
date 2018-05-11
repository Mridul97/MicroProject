var express = require("express");
var app = express();
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var middleware = require("./middleware");
var passportLocalMongoose = require("passport-local-mongoose");
var session = require("express-session");
var bodyParser = require("body-parser");


mongoose.connect(process.env.DATABASEURL);

app.use(session({
    secret : "Love to code",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.use(flash());
//app.use("/", indexRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine','ejs');


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

// Landing Page
app.get("/", function(req , res){
    res.render("home");
});

// PROFILE PAGE
app.get("/users/:id", middleware.isLoggedIn, function(req , res){
  User.findById(req.params.id , function(err , foundUser){
      if(err){
          console.log(err);
      }else {
          res.render("profile" , {
                                    user : foundUser,
                                });
            }
    });
});

// Show suggested friends
app.get("/users/:id/addfriends" ,middleware.isLoggedIn, middleware.isOwner , function(req ,res){
 User.find({}, function(err , users){
     if(err){
         console.log(err);
     } else {
         var suggestions = [];
         var flag ;
         users.forEach(function(user){
                flag = 0;
                req.user.pendingRequests.forEach(function(id){
                    console.log(id.equals(user._id));
                    if(id.equals(user._id)){
                        flag = 1 ;
                    }
                });
                
                req.user.friends.forEach(function(id){
                    console.log(id.equals(user._id));
                    if(id.equals(user._id)){
                        flag = 2 ;
                    }
                });
                
                req.user.friendRequests.forEach(function(id){
                    console.log(id.equals(user._id));
                    if(id.equals(user._id)){
                        flag = 3 ;
                    }
                });
    
                if(user._id.equals(req.user._id)){                                  // if the user is logged in user
                    console.log("user is the logged in user itself");
                }else if(flag == 2){                                                // if already a friend
                    console.log(req.user.friends.includes(user._id));
                    console.log("user is a friend");
                }else if (flag == 1) {                                              // if already sent a request
                    console.log(req.user.pendingRequests.includes(user._id));
                    console.log("already sent a request to the user");
                }else if (flag == 3)  {                                             // if already got a request
                    console.log(req.user.friendRequests.includes(user._id));
                    console.log("already got a request from the user");
                }else {
                 suggestions.push(user);
                 console.log("user added to suggestions");
                }
         });
         res.render("findFriends" , {
                                        suggestions : suggestions
                                    });
     }
 });
});

// Sending friend requests
app.get("/users/:id/addfriends/:suggestionid" ,middleware.isLoggedIn,middleware.isOwner, function(req , res){
   User.findById(req.params.suggestionid , function(err,user){
       if(err){
           console.log(err);
       }else {
           user.friendRequests.push(req.user);           // adding the req.user into friend requests array of the suggested user
           user.save();
           req.user.pendingRequests.push(user);                  // adding the suggested user to the sent request array of the req.user
           req.user.save();
           req.flash("success", "Friend Request Sent!!");
           res.redirect("/users/"+ req.params.id +"/addfriends");
       }
   });
});

// Show friend requests
app.get("/users/:id/friendrequests" ,middleware.isLoggedIn,middleware.isOwner, function(req,res){
   User.findById(req.params.id).populate("friendRequests").exec( function(err , user){
       if(err){
           console.log(err);
       }else {
           res.render("friendRequests" , {
                                            friendRequests : user.friendRequests
                                        });
       }
   });
});

//Accepting requests
app.get("/users/:id/friendRequests/:requestid",middleware.isLoggedIn,middleware.isOwner,function(req, res) {
  var acceptinguser = req.user;
  User.findById(req.params.requestid , function(err,user){
      if(err){
          console.log(err);
      }else {
          user.friends.push(req.user);                          // Add req.user in friends array of requesting user
          remove(user.pendingRequests , acceptinguser.id);      // Delete req.user from pending requests array of requesting user
          user.save();
          acceptinguser.friends.push(user);                     // Add requesting user in friends array of req.user
          remove (acceptinguser.friendRequests , user._id );    // Delete requesting user from friend requests array of req.user
          acceptinguser.save();
          req.flash("success", "You are now friends!!");
          res.redirect("/users/" + req.params.id);
        }
  });
});

function remove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

// Show friends
app.get("/users/:id/friends" ,middleware.isLoggedIn, middleware.isFriend, function(req , res){
    User.findById(req.params.id).populate("friends").exec( function(err , user){
       if(err){
           console.log(err);
       }else {
           res.render("friends" , {
                                            friends : user.friends
                                        });
       }
   });
});

//Show pending requests
app.get("/users/:id/pendingrequests" , middleware.isLoggedIn , middleware.isFriend , function(req, res) {
    User.findById(req.params.id).populate("pendingRequests").exec( function(err , user){
       if(err){
           console.log(err);
       }else {
           res.render("pendingRequests" , {
                                            pendingRequests : user.pendingRequests
                                        });
       }
   });
});

//Search Results
app.get("/users/:id/search" ,middleware.isLoggedIn, function(req, res) {
  const regex = new RegExp(escapeRegex(req.query.search), 'gi');
  if(req.query.searchby == 'username'){
        User.find({username : regex}, function(err , users){
            if(err){
                console.log(err);
            } else {
                    console.log(users);
                    
                    res.render("searchResult" , {
                                            users : users
                                        });
                    }
        });
  }else if (req.query.searchby == 'firstname'){
        User.find({firstname : regex}, function(err , users){
            if(err){
                console.log(err);
            } else {
                    console.log(users);
                    
                    res.render("searchResult" , {
                                            users : users
                                        });
                    }
        }); 
  } else if (req.query.searchby == 'lastname'){
      User.find({lastname : regex}, function(err , users){
            if(err){
                console.log(err);
            } else {
                    console.log(users);
                    
                    res.render("searchResult" , {
                                            users : users
                                        });
                    }
        });
  } else {
      req.flash("error", "No option was selected from the toggle buttons, Try Again");
      res.redirect("/");
  }    
});



function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//Auth Routes
//Register Routes

app.get("/register", function(req,res){
   res.render("register"); 
});

app.post("/register", function(req, res){
   
   
   User.register(new User({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            username : req.body.username,
            image : req.body.image,
            email : req.body.email,
            friends : [],
            friendRequests : [],
            pendingRequests : [] }), req.body.password , function(err,user){
       if(err){
           console.log(err);
            req.flash("error", err.message);
           return res.render('register'); 
       }
       passport.authenticate("local")(req, res, function(){
          req.flash("success", "You signed up successfully, " + user.firstname );
          res.redirect("/users/" + user._id); 
       });
           
   });
});

// Login Routes

app.get("/login" , function(req , res){
    res.render('login');
});


app.post("/login" ,passport.authenticate('local', { 
        failureRedirect : "/login"
    }),
    function(req,res){
    req.flash("success", "Welcome back " + req.user.firstname);
    res.redirect("/users/" + req.user._id);
    
});

// Logout Route

app.get("/logout" ,middleware.isLoggedIn, function(req ,res){
    req.logout();
    req.flash("success", "Logged You Out!!");
    res.redirect("/");
});

app.get("/search" ,middleware.isLoggedIn, function(req, res) {
    if(req.query.q.length == 0){
        res.json({});
    }else {
    User.find({ "username" : { $regex: req.query.q, $options: 'i' } },function(err, users) {
        res.json(users); 
    })
    }
 });


app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Server is listening...");
});

