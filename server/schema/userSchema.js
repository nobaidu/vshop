// 文档模式匹配
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 5;

let ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = mongoose.Schema({
    userId: ObjectId,
    username: {
        type: String,
        unique: true
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastLoginAt: {
        type: Date,
        default: Date.now()
    }

});

// userSchema.pre('save', (next) => {
//     var user = this;
//     if (!user.isModified('password')) return next();
//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//         if (err) {
//             return next(err);
//         }
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         })
//     })
// })

// userSchema.methods.comparePassword = (candidatePassword, cb) => {
//     bcrypt.compare(candidatePassword, this.password, (err, isMath) => {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMath);
//     })
// }

module.exports = userSchema;
