const express = require('express');
var bodyParser = require('body-parser');
const { db } = require('./firebaseSetup');

const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use(bodyParser.json());

app.get('/api', async (req, res) => {
  const projectsRef = db.collection('projects');
  const snapshot = await projectsRef.get();
  const result = [];

  snapshot.forEach(doc => {
    result.push({id: doc.id, ...doc.data()})
  })
  
  res.json(result)
})

app.post('/api/posts', async (req, res) => {
  console.log(req.body, typeof req.body)
  const { name, description, redirrect, imgURL } = req.body; 
  const projectsRef = db.collection('projects');

  await projectsRef.add({
    name,
    description,
    redirrect,
    imgURL,
  });
})

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`)
})