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
        Thought.findOne({ _id: params.thoughtId })
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
                )
            .populate({
                path: 'thoughts',
                select: '-__v'
                });
            })
            .then(thought => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                  }
                  res.json(thought);
            })
            .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(thought => {
            if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(user => {
            if (!user) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(user);
          })
          .catch(err => res.json(err));
      },






};

module.exports = thoughtController;