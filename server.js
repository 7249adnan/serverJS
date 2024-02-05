var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
var cors = require("cors");
const { ObjectId } = require("mongodb");

var app = Express();
app.use(bodyParser.json());
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://admin:admin@cluster0.4efljn9.mongodb.net/?retryWrites=true&w=majority";

var DATABASENAME = "todoappdb";
var database;

const PORT = 5000;

app.listen(PORT, () => {
  Mongoclient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASENAME);
    console.log(`Server is Listining on PORT : ${PORT}`);
    console.log(" Mongo DB connection Succesfull  ");
  });
});

app.get("/",(req,res)=>{

  res.send("on Root Folder RESPONSE ");

});

app.post("/submitForm", (req, res) => {
  console.log("Name : " + req.body.firstName + "\n ### Data Inserting ..... ");
  console.log(" ### Data Inserted woo !!!");

  //insert data
  database.collection("myformcollection").insertOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    dateOfBirth: req.body.dateOfBirth,
    language: req.body.language,
    gender: req.body.gender,
    address: req.body.address,
    checkBox: req.body.checkBox,
  });
  res.send("yes");
});

app.post("/updateForm", (req, res) => { 

  database.collection("myformcollection").update(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNumber: req.body.mobileNumber,
        dateOfBirth: req.body.dateOfBirth,
        language: req.body.language,
        gender: req.body.gender,
        address: req.body.address,
        checkBox: req.body.checkBox,
      },
    }
  );

  res.end("yes");
});

app.delete("/deleteData", (request, response) => {
  //Delete data code

  database.collection("myformcollection").deleteOne({
    _id: ObjectId(request.body._id),
  });

  response.end(
    "Full Name : " +
      request.body.firstName +
      " " +
      request.body.lastName +
      " Data Deleted  Succesfully !! "
  );
});

app.post("/getData", (req, res) => {
  //Show data code

  database
    .collection("myformcollection")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        throw err;
      }
      res.json(result);

      console.log("\n ### Data Fetched !! ");
    });
});
