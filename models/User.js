const { Schema, model, Types } = require('mongoose');

const validateEmail = function(email) {
    const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailRegex.test(email)
}

// insert date format later

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            // valid email address
            validate: [validateEmail, 'Please enter a valid email address'],
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
        },
        thoughts: [

        ],
        friends: [

        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    // return this.friends.reduce(
    //     (total, friend) => total + friend.length + 1,
    // );

    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;
