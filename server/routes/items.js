const express = require("express");
const fs = require("fs");
const router = express.Router();

const FILE_PATH = "./data.json";

// GET all items
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  res.json(data);
});

// ADD item
router.post("/", (req, res) => {
  const newItem = req.body;

  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  const nextId = data.length ? Math.max(...data.map(p => p.id)) + 1 : 1;
  newItem.id = nextId;
  data.push(newItem);

  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json(newItem);
});

// UPDATE item
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;

  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  const index = data.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  data[index] = { ...data[index], ...updatedItem };
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// DELETE item
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  const filteredData = data.filter(item => item.id !== id);

  if (filteredData.length === data.length) {
    return res.status(404).json({ error: "Item not found" });
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(filteredData, null, 2));
  res.json({ success: true });
});

module.exports = router;
