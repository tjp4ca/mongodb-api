const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    // createThought,
    // updateThought,
    // deleteThought,
    // addReaction,
    // removeReaction,

    addThought

} = require('../../controllers/thoughtController')

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    // .post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getOneThought)
    // .put(updateThought)
    // .delete(deleteThought);

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
// router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// /api/thoughts/:thoughtId/reactions

module.exports = router;