const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactSchema = new Schema(
  {
    // set custom id to avoid confusion with parent thought _id
    reactId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactBody: {
      type: String,
      required: true
    },
    writtenBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const thoughtSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: true
    },
    thoughtText: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    // use reactSchema to validate data for a react
    reactions: [reactSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactCount').get(function() {
  return this.reactions.length;
});

const thought = model('Thought', thoughtSchema);

module.exports = thought;
