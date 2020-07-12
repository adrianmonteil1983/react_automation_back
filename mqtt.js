
const connexionMqtt = (mqtt) => {
  console.log('MQTT client is connecting...')
  const Client  = mqtt.connect('mqtt://test.mosquitto.org');

  Client.on('connect', () => {
    console.log('MQTT connected');
    Client.subscribe([
      'reactAutomation/sendCommand',
      'reactAutomation/getDataGraph',
      'reactAutomation/getDataMemory',
    ]);
  })
  Client.on('error', () => {
    console.log('error MQTT');
    return(false);
  })
  return Client;
}
  
const handleMessage = (topic, message, socketArduino, DB, mqttClient, dataBase) => {
  console.log(topic.toString())
  switch(topic){
    case 'reactAutomation/sendCommand':
      socketArduino ? socketArduino.write(message) : null;
        break;
    case 'reactAutomation/getDataGraph':
      dataBase.retriveDataDB(DB, mqttClient);
        break;
    case 'reactAutomation/getDataMemory':
      socketArduino.write('data');
        break;
    default:
  }
}

module.exports = {
  connexionMqtt: connexionMqtt,
  handleMessage: handleMessage
}