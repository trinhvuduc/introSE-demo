require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const expertRouter = require('./routes/expert');
const postRouter = require('./routes/post');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/expert', expertRouter);
app.use('/api/post', postRouter);

const port = process.env.DB_PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
