
const mongoConnexion = async(url, MongoClient) => {
  try{
    console.log('mongoDB is connecting....')
    const DB = await MongoClient.connect(url)
    console.log('Mongo connected');
    return DB
  }catch(err){
    console.log('problem connection database')
    return(false)
  } 
}

const handleData = (DB, data,mqttClient) => {
  const today = new Date().toLocaleDateString();
  const now = new Date().toLocaleTimeString()
  console.log(data)
  const dbo = DB.db('tempDB');
  dbo.collection('temperature').insertOne({value: data[1], date: today, time: now });
}

const retriveDataDB = (DB, mqttClient) => {
  const today = new Date().toLocaleDateString();
  const dbo = DB.db('tempDB');
  dbo.collection('temperature').find({date: today}).toArray((err, doc) => {
    mqttClient.publish('reactAutomation/retrive',JSON.stringify(doc));
  });
}

module.exports = {
    handleData: handleData,
    retriveDataDB: retriveDataDB,
    mongoConnexion: mongoConnexion
}