const express = require('express');
const router = express.Router();

let drivers = [
  {id:'D1',name:'司机1',lng:113.628,lat:34.749,status:'idle'},
  {id:'D2',name:'司机2',lng:113.632,lat:34.748,status:'busy'}
];

router.get('/', (req,res) => res.json(drivers));
router.post('/:id/location', (req,res) => {
  const id = req.params.id;
  const {lng, lat} = req.body;
  const d = drivers.find(x=>x.id===id);
  if(d){ d.lng = lng; d.lat = lat; d.lastSeen = Date.now(); }
  res.json({ok:true, driver:d});
});

module.exports = router;
