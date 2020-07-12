const net = require('net');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const mqttModule = require('mqtt');

const mqtt = require('./mqtt.js')
const arduino = require('./arduino.js')
const dataBase = require('./dataBase');

const today = new Date().toLocaleDateString();

console.log('today is the: ', today);


(async() => {
  const socketArduino = await arduino.connexionArduino(net);
 
  const mqttClient =  await mqtt.connexionMqtt(mqttModule);
  
  const DB = await dataBase.mongoConnexion(url, MongoClient);
  
  mqttClient.on('message',(topic, message) => mqtt.handleMessage(topic, message, socketArduino, DB, mqttClient,dataBase))
  
  socketArduino.on('data',(data) => arduino.handleMessage(data, DB, mqttClient, dataBase));

})();


