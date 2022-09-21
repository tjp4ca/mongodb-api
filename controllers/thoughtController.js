const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get one thought by id
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-_v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new thought
    // createThought({ body }, res) {
    //     console.log(body);
    //     Thought.create(body)
    //         .then(thought => res.json(thought))
    //         .catch(err => res.json(err));
    // },

    // update a thought by id

    // delete a thought by id

    // add a thought to user
    addThought({ params, body }, res) {
        console.log('hello world')
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                  }
                  res.json(thought);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;