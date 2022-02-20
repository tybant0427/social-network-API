const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (created) => moment(created).format('LLLL')

        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;