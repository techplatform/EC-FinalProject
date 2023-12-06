const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// store users
const registeredUsers = [];

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { name, occupation, purpose } = req.body;

  // add users
  registeredUsers.push({ name, occupation, purpose });

  res.json({ message: 'User registered successfully' });
});

app.post('/users', (req, res) => {
    res.json(registeredUsers);
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
