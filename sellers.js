import { Router } from "express";
import { initFromFile, autoIncrementId } from "./init.js";
import fs from 'fs'
const sellerRouter = Router();

const DB_NAME = "sellers";

const db = initFromFile();

function saveToDb(dbName, obj) {
  const newId = autoIncrementId(db.data[dbName]);
  db.data[dbName][newId.toString()] = obj;
  const dbData = JSON.stringify(db.data);
  fs.writeFile("db.json", dbData, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
  });
  return obj
}

function getAll(dbName) {
  return db.data[dbName];
}

function getById(dbName, id) {
  return db.data[dbName][id];
}
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}
function search(dbName, fieldName, value = "#!$@#$XCVZXCf@$!@$") {
  const r = [];
  for (const [key, item] of entries(db.data[dbName])) {
    if (
      item[fieldName] &&
      item[fieldName]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase())
    ) {
      console.log(
        item[fieldName].toString().toLowerCase(),
        value.toString().toLowerCase()
      );
      r.push(item);
    }
  }
  return r;
}

sellerRouter.get("/", function (req, res) {
  res.json(getAll(DB_NAME));
});

sellerRouter.get("/:id", function (req, res) {
  const { id } = req.params;
  res.json(getById(DB_NAME, id));
});

sellerRouter.post("/", function (req, res) {
  const body = req.body;
  const dataToSave = {};
  const fields = ["name", "address"];
  for (const item of fields) {
    if (!body[item]) {
      res.json({ error: true, reason: "must include " + item });
      return;
    }
    dataToSave[item] = body[item];
  }

  res.json(saveToDb(DB_NAME, dataToSave));
});

sellerRouter.post("/search-name/", function (req, res) {
  const { name } = req.body;

  res.json(search(DB_NAME, "name", name));
});

export { sellerRouter };
