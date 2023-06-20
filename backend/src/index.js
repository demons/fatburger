const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let groups = [
  { id: "1", title: "Завтрак", groupItems: [] },
  { id: "2", title: "Обед", groupItems: [] },
];

app.get("/groups", (req, res) => {
  return res.send(groups);
});

app.post("/groups", (req, res) => {
  const { title } = req.body;

  const newGroup = {
    id: groups.length + 1,
    title,
    groupItems: [],
  };
  groups.push(newGroup);
  return res.send(newGroup);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
