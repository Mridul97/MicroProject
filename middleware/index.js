var User = require("../models/user");
var middleware = {};
middleware.isLoggedIn =  function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error" , "Please Login First!")
        res.redirect("/login");
    }
    


middleware.isOwner = function(req , res , next){
    User.findById(req.params.id , function(err , user){
        if(err){
            console.log(err);
        } else {
            if(user._id.equals(req.user._id)){
                return next();
            }
            res.redirect("/");
        }
    })
}

middleware.isFriend = function(req ,res , next){
    User.findById(req.params.id , function(err , user){
        if(err){
            console.log(err);
        } else {
            if(user._id.equals(req.user._id)){
                return next();
            }
            var flag = 0 ;
            user.friends.forEach(function(id){                              /* if logged in user is a friend of the user */
                if(id.equals(req.user._id)){
                    flag = 2 ;
                }
            });
            
            if(flag == 2){
                return next();
            }
            res.redirect("/");
        }
    })
}
module.exports = middleware ;