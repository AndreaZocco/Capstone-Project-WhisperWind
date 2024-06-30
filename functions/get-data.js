// functions/get-users.js

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

exports.handler = async function (event, context) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const database = client.db('whisperwind-db'); 
    const collection = database.collection('users');
    const data = await collection.find({}).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  } finally {
    await client.close();
  }
};
