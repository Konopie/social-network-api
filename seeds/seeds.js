const db = require('../config/connection');
const { User, Thought} = require('../models');

const userData = require('./userData.json');
const thoughtData = require('./thoughtData.json');

db.once('open', async () => {
  
});
