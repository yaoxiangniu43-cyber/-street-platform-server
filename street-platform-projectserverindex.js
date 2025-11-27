require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { WebSocketServer } = require('ws');

const shopsRoute = require('./routes/shops');
const driversRoute = require('./routes/drivers');
const lockersRoute = require('./routes/lockers');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/shops', shopsRoute);
app.use('/api/drivers', driversRoute);
app.use('/api/lockers', lockersRoute);

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

let clients = new Set();
wss.on('connection', ws => {
  clients.add(ws);
  console.log('WS connected, total:', clients.size);
  ws.on('message', msg => {
    try {
      const data = JSON.parse(msg.toString());
      if(data.type === 'location'){
        const out = JSON.stringify({ type: 'driver_location', payload: data });
        clients.forEach(c => { if(c.readyState === 1) c.send(out); });
      } else if(data.type === 'order_event') {
        const out = JSON.stringify({ type: 'order_event', payload: data });
        clients.forEach(c => { if(c.readyState === 1) c.send(out); });
      }
    } catch(e){
      console.error('ws parse error', e);
    }
  });
  ws.on('close', ()=>clients.delete(ws));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=>console.log('Server listening on', PORT));
