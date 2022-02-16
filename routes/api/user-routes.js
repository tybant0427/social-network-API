const router = require('express').Router();

const { get } = require('https');
const {
    getUsers,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

router
.route('/')
.get(getUsers)
.post(addNewUser)

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router
.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

router
.route('/')
.get()
.post();
