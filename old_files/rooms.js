const handleRooms = (socket, memory, socketArduino) => {
    socket.on('/kitchen',(address, value) => {
        console.log(address, value);
        memory[address] = value
        socketArduino.write(value.toString())
    })

    socket.on('/polling',(data) => {
        console.log('bedroom');
        //socketArduino.write(data)
    })
}

module.exports = {
    handleRooms: handleRooms
}