const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .then((users) => {
                console.log(users)
                
                return res.json(users)}
            )
            .catch((err) => res.status(500).json(err));
    },

    // get one user by id
    getOneUser({ params }, res) {
        User.findOne({ _id: params.id })
            // .populate({
            //     path: 'thoughts',
            //     select: '-_v'
            // })
            .select('-_v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with this ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new user
    createUser({ body }, res) {
        console.log(body);
        User.create(body)
            .then(user => res.json(user))
            .catch(err => res.json(err));
    },

    // update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
        .then((user) => {
            if (!user) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(user);
        })
        .catch((err) => res.json(err));
    },

    // delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Friend.deleteMany({ _id: { $in: user.friends } })
            )
            .then(() => res.json({ message: 'User deleted!' }))
            .catch((err) => res.status(500).json(err));
    }
};

module.exports = userController;

