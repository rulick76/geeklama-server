var express = require('express');
var router = express.Router();
var client = require("../db");

router.get('/', async function(request, response) {
    try 
    {
      const companies = client.db("geeklama").collection("companies");
      //const query = { date: { $date: { $gte: new Date("2000-08-18").toISOString()}}};
      const top10 = await companies.find({}).skip(0).limit(10).toArray();
      response.json(top10);
    } 
    catch (error) {
      console.log(error);
    }

})

router.post('/', async function(request, response){
  const collection = client.db("geeklama").collection("companies");
  var company= await collection.findOne({ name:request.body.name});
  if (company==null) {
      company= await collection.insertOne({name:request.body.name,field:request.body.field,rank:2.5})
  }

  company.collection("cases").insertOne({date:Date.toString(),title:request.body.title,case:request.body.case,rank:request.body.rank});
  response.end();
});
  
module.exports = router;