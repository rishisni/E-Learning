// migrate-mongo-config.cjs
require('dotenv').config();

module.exports = {
  mongodb: {
    url: process.env.DB, // Use your MongoDB connection string

    databaseName: 'ELearning',

    options: {
      useNewUrlParser: true, // Additional options can be specified here
      useUnifiedTopology: true,
    },
  },

  migrationsDir: 'migrations',

  changelogCollectionName: 'changelog',
};
