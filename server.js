
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/details', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  EmpId: String,
  date: String,
  Time : String
});

const User = mongoose.model('User', UserSchema);

// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { EmpId, date, Time,} = req.body;

    const user = new User({ EmpId, date, Time,});
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// api to get user details
app.get('/getAllUser', async (req, res)=> {
  try {
    const allUser = await User.find({});
    res.send({status: 'ok', data: allUser});
  } catch (error) {
    console.log(error);
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
