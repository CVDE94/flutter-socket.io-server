const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band('Z23f'));
bands.addBand( new Band('Likin Park'));
bands.addBand( new Band('Evanences'));
bands.addBand( new Band('Mana'));

console.log(bands);

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado')

  
    client.emit('active-bands', bands.getBands());
  client.on('disconnect', () => {console.log('Cliente desconectado')});

  client.on('mensaje', (payload)=>{
    console.log('Mensaje!!!',payload);
    io.emit('mensaje',{admin: 'Nuevo mensaje'});
  });
  client.on('vote-band', (payload) =>{
    bands.voteBand(payload.id);
    //Notifica a todos los que estan en el servidor para que escuchen, en este caso io es el servidor
    io.emit('active-bands', bands.getBands());
  });

  client.on('add-band', (payload) =>{
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    //Notifica a todos los que estan en el servidor para que escuchen, en este caso io es el servidor
    io.emit('active-bands', bands.getBands());
  });

  client.on('delete-band', (payload) =>{
    bands.deleteBand(payload.id);
    //Notifica a todos los que estan en el servidor para que escuchen, en este caso io es el servidor
    io.emit('active-bands', bands.getBands());
  });
});
