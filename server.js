const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');
const { User, Thought} = require('./models');

const userData = require('./seeds/userData.json');
const thoughtData = require('./seeds/thoughtData.json');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.use(require('./routes'));

db.once('open', async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  // bulk create each model
  const Users = await User.insertMany(userData);
  const Thoughts = await Thought.insertMany(thoughtData);

  for (newThought of Thoughts) {
    for (user of Users) {
      if (newThought.writtenBy === user.userName){
        console.log(user.userName)
        console.log(newThought.writtenBy)
        console.log(newThought._id)
        
        user.thoughts.push(newThought._id)
        await user.save()
        console.log(user.thoughts)
      }
    }
  }

  console.log('all done!')
  app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
});

