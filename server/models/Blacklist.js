/**
 * logout functionality
 * store blacklisted token 
 */

const mongoose = require('mongoose');
const BlaxklistSchema = new mongoose.Schema(
    {
        token:{
            type:String,
            required:true,
            ref:"Admin",
        },
    },
    {timestamps:true},
);

module.exports = mongoose.model('blacklist', BlaxklistSchema);