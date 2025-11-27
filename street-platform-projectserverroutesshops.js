const express = require('express');
const router = express.Router();

let shops = [
  {id:'S1',name:'便利店A',lng:113.629,lat:34.747},
  {id:'S2',name:'药房B',lng:113.618,lat:34.751}
];

router.get('/', (req,res) => res.json(shops));
router.post('/', (req,res) => {
  const s = req.body;
  shops.push(s);
  res.json({ok:true, shop:s});
});
module.exports = router;
