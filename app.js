const express = require("express");
const cors = require('cors');
const {MongoClient} = require('mongodb');
const app = express();

async function main (){
  const uri = 'mongodb+srv://FriendFrie77:a6fLzfKCsYZrdnjX@period-tracker.tem1jaw.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try{
    await client.connect();
    await listDatabases(client)
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
test
main().catch(console.error);
// app.use('/login', (req, res)=> {
//   res.send({
//     token: 'test123'
//   });
// });
async function listDatabases(client){
  const databaseList = await client.db().admin().listDatabases();
  console.log("Databases:")
  databaseList.databases.forEach(db =>{
    console.log(`- ${db.name}`);
  })
};

// async function addlogin
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get('/signup', function (req, res){
  res.console.log('test')
  listDatabases(client)
})