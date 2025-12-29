const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "./data.json";

const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
