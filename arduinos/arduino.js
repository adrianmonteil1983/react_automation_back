
const connexionArduino = async (net) => {
  try{
    console.log('try to connect to arduino...'); 
    const socketArduino = await net.connect(8888, '10.0.0.28');
      socketArduino.on('connect', () => {
        console.log('Arduino connected'); 
      })
      socketArduino.on('ready', () => {
        console.log('Arduino ready')
        socketArduino.write('graph');
        setInterval(() => socketArduino.write('graph'),1800000);
      })
      socketArduino.on('error', () => {
        console.log('pb connexion Arduino');
        socketArduino.destroy();
      })
    return socketArduino;  
  }catch(err){
    console.log("cannot connect to Arduino");
  }   
}

const handleMessage = (data, DB, mqttClient, dataBase) => {
  console.log(data[0],data[1]);
  //test byte zero to know what type of data we receive (temperature or status) to avoid surcharging the DB
  switch(data[0]){
    case 0:
      mqttClient.publish('reactAutomation/memory', data[1].toString(2).padStart(8,'0'));
      break;
    case 1:
      dataBase.handleData(DB,data);
      break;
    default:
  }
}

module.exports = {
  connexionArduino: connexionArduino,
  handleMessage: handleMessage
}