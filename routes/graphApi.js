var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET users listing. */
router.post('/barChart', function(req, res, next) {
  console.log(req.body.indicator);
  var filename="./dataJson/"+req.body.indicator+".json";
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    data=JSON.parse(data);
    var modifiedData=data;
    if(filename=="./dataJson/commercialCrops.json"){
      modifiedData=[];
      data.map(function(d) {
        var date=Number(d.x.split('_')[1]);
        if(date>=req.body.startDate && date<=req.body.endDate){
          modifiedData.push(d);
        }
      });
    }
    res.json(modifiedData);
  });
});
router.get('/lineChart',function(req,res,next) {
  res.json({});
});
router.get('/pieChart',function(req,res,next) {
  res.json({});
});
router.post('/stackChart',function(req,res,next) {
  var filename="./dataJson/"+req.body.indicator+".json";
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    data=JSON.parse(data);
    var modifiedData=data;
    if(filename=="./dataJson/riceSouthernProduction.json"){
      modifiedData=[];
      data.map(function(d) {
        var date=Number(d.x.split('_')[1]);
        if(date>=req.body.startDate && date<=req.body.endDate){
          modifiedData.push(d);
        }
      });
    }
    res.json(modifiedData);
  });
});
module.exports = router;
