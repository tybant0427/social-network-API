const { User, Thought } = require('../models');

module.exports = {

async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

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

  async addNewUser(req, res) {
    try {
      const newUser = await User.create(req.body)
      res.json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

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

  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { 
          _id: req.params.id,
          friends: { $ne: req.params.friendId },
        }, 
        { $push : { friends: req.params.friendId }},
        { 
          new: true,
          unique: true,
        }
      )
      res.json({message: 'Friend added to user.'});

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

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
      res.json({message: 'Friend deletd from user.'});

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

}

}