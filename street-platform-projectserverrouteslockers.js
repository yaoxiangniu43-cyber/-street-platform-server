const express = require('express');
const router = express.Router();

let lockers = [
  {id:'L1',shopId:'S1',lng:113.63,lat:34.746,slots:12,status:'free'},
  {id:'L2',shopId:'S2',lng:113.617,lat:34.752,slots:4,status:'occupied'}
];

router.get('/', (req,res) => res.json(lockers));
router.post('/', (req,res) => {
  const l = req.body;
  lockers.push(l);
  res.json({ok:true, locker:l});
});

module.exports = router;
