const { User, Thought } = require('../models');


module.exports = {
//get all thoughts 
  async getThoughts(req, res) {
    try {
      const newThought = await User.find({});
      res.json(newThought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
  
//get a thought by ID 
  async getThoughtById(req, res) {
    console.log(req.params)
    try {
      const thought = await Thought.findOne({
          _id: req.params.thoughtId
        },
      )
      if (!thought) {
        res.status(400).json({ 
            message: 'Thought not found.',
          }
        );
        return;
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
    //add a new thought to user
  addNewThought({ params, body }, res) {
      console.log(body);
      Thought.create(body)
          .then(({ _id }) => {
              return User.findOneAndUpdate(
                  { _id: params.userId },
                  { $push: { thoughts: _id } },
                  { new: true }
              );
          }) .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });
                  return;
              }res.json(dbUserData);
          })
          .catch(err => res.json(err));
  },

//update a thought 
        async updateThought(req, res) {
            try {
              const updatedThought = await Thought.findOneAndUpdate(
                {
                  _id: req.params.thoughtId,
                },
                req.body,
                { 
                  new: true, 
                },
              ) 
              if (!updatedThought) {
                res.status(404).json({
                  message: 'Thought not found.',
                });
                return;
              }res.json(updatedThought);
            } catch (err) {
              console.log(err);
              res.status(500).json(err);
            }
          },
        //delete a thought 
          async deleteThought(req, res) {
            try {
              const thoughtRemove = await Thought.findByIdAndDelete(req.params.thoughtId);
              if(!thoughtRemove) {
                res.status(404).json({
                  message: 'Thought not found.',
                })
                return;
              }
              const user = await User.findOneAndUpdate(
                { 
                  thoughts: { $eq: req.params.thoughtId },
                }, 
                { $pull : { thoughts: req.params.thoughtId }},
                { 
                }
              )
              res.json(thoughtRemove);
            } catch (err) {
              console.log(err);
              res.status(500).json(err);
            }
          },

          //add a reaction to a thought 
          addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $addToSet: { reactions: body } },
                { new: true, runValidators: true }
            )
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        return res.status(404).json({ message: 'No thought found with this id!' });
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.json(err));
        },

        
      // delete reaction 
          deleteReaction({ params }, res) {
            console.log(params.thoughtId, params.reactionId);
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { runValidators: true, new: true }
            )
                .then(dbUserData => res.json(dbUserData))
                .catch(err => res.json(err));
        }
    };
        
        
        

   
        
