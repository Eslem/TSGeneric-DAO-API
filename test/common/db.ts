var dbJson = require('./db.json');

export var setupMongoose = (mongoose) => {
  mongoose.Promise = global.Promise;

    mongoose.connect(dbJson.db.test.url);
    console.log('Connecting to ', dbJson.db.test.url);
    mongoose.connection.on('error', (err) => {
        console.error('Error conection MongoDB', err);
    });
}
