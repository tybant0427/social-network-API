const router = require('express').Router();

const { route } = require('./user-routes');
const {
    getThoughts,
    getThoughtById,
    addNewThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getThoughts)

router
.route('/:userid')
.post(addNewThought)

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought);

router
.route('/:userId/:thoughtId')
.delete(deleteThought);

router
.route('/:thoughtId/reactions')
.post(addReaction);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;