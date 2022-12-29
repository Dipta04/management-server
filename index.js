const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// manageUser
// y4wNj8pKFhhEHZIp


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fvm1pth.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {

    const taskCollection = client.db('managementCollection').collection('managementOptions');

    app.post('/addtasks', async (req, res) => {
      const addTask = req.body;
      const result = await taskCollection.insertOne(addTask);
      res.send(result);
    })

    app.get('/addtasks', async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const mytasks = await taskCollection.find(query).toArray();
      res.send(mytasks);
    })

    app.delete('/addtasks/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await taskCollection.deleteOne(filter);
      res.send(result);
    })

    app.put('/addtasks/complete/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) }
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          complete: 'complete'
        }
      }
      const result = await taskCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    })

    app.put('/addtasks/notcomplete/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) }
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          notcomplete: 'notcomplete'
        }
      }
      const result = await taskCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    })

  }
  finally {

  }
}
run().catch(console.log);

app.get('/', async (req, res) => {
  res.send('management server is running');
})

app.listen(port, () => console.log(`Management server running on ${port}`))

