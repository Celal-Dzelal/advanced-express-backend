//? All commands are intended for local development using mongosh in VSCode or your terminal.

/*//! --------------------------- Setup & Connection --------------------------- */

// https://www.mongodb.com/try/download/community //* Download Community Server
// https://www.mongodb.com/try/download/shell //* Download Mongosh
// https://www.mongodb.com/products/tools/compass //* Create Account or SignIn
// https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode //* Install Extension to VSCode

/*//! --------------------- Connection via VSCode Extension -------------------- */

//? Click MongoDB tab in VSCode

//? Select "Add Connection"

//? Choose "Connect with Connection String"

//? In Compass, copy the local connection string and paste into the search prompt

//? Hit Enter to connect

/*//! ------------------------------ Terminal Test ----------------------------- */

// mongosh --version   //* Check if mongosh is installed
// mongosh             //* Enter Mongo Shell
// cls                 //* Clear terminal
// exit                //* Exit shell

/*//! -------------------- Database & Collection Management -------------------- */

// show dbs                                 //* List all databases
// use test                                 //* Switch to or create 'test' database
// db.createCollection("coll")              //* Create new collection
// show collections                         //* List collections
// db.coll.renameCollection("collection")   //* Rename collection (optional)

/*//! --------------------------- Inserting Documents -------------------------- */

db.coll.insertOne({ firstName: "Dzelal", lastName: "Sokolovic", age: 36 }); //* Insert One

//* Insert Many

db.coll.insertMany([
  { firstName: "Test", age: 10 },
  { firstName: "Test1", age: 11 },
  { firstName: "Test2", age: 12 },
  { firstName: "Test3", age: 13 },
  { firstName: "Test4", age: 14 },
  { firstName: "Test5", age: 15 },
  { firstName: "Test6", age: 16 },
  { firstName: "Test7", age: 17 },
  { firstName: "Test8", age: 18 },
  { firstName: "Test9", age: 19 },
]);

/*//! --------------------------- Querying Documents --------------------------- */

db.coll.find(); //* All documents

//* Filter by Value

db.coll.find({ firstName: "Dzelal" });
db.coll.findOne({ firstName: "Dzelal" });

//* Return Specific Fields

db.coll.find({}, { firstName: true, lastName: true });
db.coll.find({}, { _id: 0, firstName: 1, lastName: 1 });

//* Distinct Values

db.coll.distinct("firstName");

/*//! -------------------------- Comparison Operators -------------------------- */

db.coll.find({ age: { $exists: true } }); //* Documents where 'age' exists
db.coll.find({ age: { $eq: 36 } }); //* Equal to 36
db.coll.find({ age: { $ne: 36 } }); //* Not equal to 36
db.coll.find({ age: { $gt: 17 } }); //* Greater than 17
db.coll.find({ age: { $gte: 17 } }); //* Greater than or equal to 17
db.coll.find({ age: { $lt: 13 } }); //* Less than 13
db.coll.find({ age: { $lte: 13 } }); //* Less than or equal to 13
db.coll.find({ age: { $in: [10, 19, 36] } }); //* Matches any value in array
db.coll.find({ age: { $nin: [10, 19, 36] } }); //* Not in array

/*//! ---------------------------------- Regex --------------------------------- */

db.coll.find({ firstName: { $regex: "zelal" } }); //* Contains "zelal"
db.coll.find({ firstName: /zelal/ }); //* Same as above
db.coll.find({ firstName: /dze/i }); //* Case-insensitive match
db.coll.find({ firstName: /^Dz/ }); //* Starts with "Dz"
db.coll.find({ firstName: /lal$/ }); //* Ends with "lal"

/*//! ---------------------------- Logical Operators --------------------------- */

db.coll.find({ $and: [{ age: { $gt: 15 } }, { firstName: "Test5" }] }); //* and
db.coll.find({ age: { $gt: 15 }, firstName: "Test5" }); //* Short form of and
db.coll.find({ $or: [{ age: 10 }, { firstName: "Dzelal" }] }); //* or
db.coll.find({ age: { $not: { $gt: 19 } } }); //* Not greater than 19
db.coll.find({ $nor: [{ age: 10 }, { firstName: "Test3" }] }); //* Neither

/*//! -------------------------- Limit & Sort & Count -------------------------- */

//? Limit

db.coll.find().limit(3);
db.coll.find().sort({ _id: -1 }).limit(5); //* Last 5 entries

//* It uses for pagination
db.coll
  .find()
  .sort({ age: 1 }) //* sort by age ascending
  .skip(5) //* skip first 5 results
  .limit(5); //* return next 5 results

//? Sort

db.coll.find().sort({ age: 1 }); //* Ascending
db.coll.find().sort({ age: -1 }); //* Descending
db.coll.find().sort({ age: 1, firstName: -1 }); //* Multi-field sort

//? Count

db.coll.countDocuments(); //* Total count
db.coll.countDocuments({ age: { $gte: 15 } }); //* Conditional count
db.coll.estimatedDocumentCount(); //* Approximate count

/*//! ---------------------------- Update Documents ---------------------------- */

//* Update One

db.coll.updateOne({ firstName: "Dzelal" }, { $set: { age: 37 } });

//* Update Many

db.coll.updateMany({ age: { $lt: 15 } }, { $set: { status: "minor" } });

/*//! ---------------------------- Delete Documents ---------------------------- */

//* Delete One

db.coll.deleteOne({ firstName: "Test9" });

//* Delete Many

db.coll.deleteMany({ age: { $lt: 13 } });
