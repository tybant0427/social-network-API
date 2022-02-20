const { User, Thought } = require('../models');

module.exports = {

  //get all users
async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  //get user by ID 
  async getUserById(req, res) {
    try {
      const user = await User.findOne({
          _id: req.params.id
        },
      )
      if (!user) {
        res.status(400).json({ 
            message: 'User not found.',
          }
        );
        return;
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

//create user 
  async addNewUser(req, res) {
    try {
      const newUser = await User.create(req.body)
      res.json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //update user
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { 
          new: true, 
        },
      )
      if (!updatedUser) {
        res.status(404).json({
          message: 'User not found.',
        });
        return;
      }
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //delete user
  async deleteUser(req, res) {
    try {
      const userRemove = await User.findByIdAndDelete(req.params.id);
      if(!userRemove) {
        res.status(404).json({
          message: 'User not found.',
        })
        return;
      }
      res.json(userRemove);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //add friend to user friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
},

 //delete friend from user friend list 
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { 
          _id: req.params.id,
        }, 
        { $pull : { friends: req.params.friendId }},
        { 
          new: true,
        }
      )
      res.json({message: 'Friend deleted'});

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

}

}