var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema(
        {
            firstname : String,
            lastname : String,
            username : String,
            password : String,
            email : String,
            image : String,
            friends : [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User"
                        }
                    ],
            friendRequests : [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User"
                        }
                    ],
            pendingRequests : [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "User"
                        }
                    ]
        }
);
    
UserSchema.plugin(passportLocalMongoose);
    
module.exports = mongoose.model("User",UserSchema);