var mongoose = require( 'mongoose' );
var Block     = mongoose.model( 'Block' );
var BlockStat = mongoose.model( 'BlockStat' );
var filters = require('./filters');

var https = require('https');
var async = require('async');

var etherUnits = require(__lib + "etherUnits.js")

module.exports = function(req, res) {

  if (!("action" in req.body))
    res.status(400).send();
  
  else if (req.body.action=="miners") 
    getMinerStats(res)
  
  else if (req.body.action=="hashrate") 
    getHashrate(res);
  
}
/**
  Aggregate miner stats
**/
var getMinerStats = function(res) {
  BlockStat.aggregate([
      { $group: {
        _id: '$miner',  
        count: {$sum: 1} }
      }
  ], function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send();
      } else {
        res.write(JSON.stringify(result));
        res.end();
      }
  });
}
/**
  Get hashrate Diff stuff
**/
var getHashrate = function(res) {
  var blockFind = Block.find({}, "difficulty timestamp number")
                      .lean(true).sort('-number').limit(100);
  blockFind.exec(function (err, docs) {
  var blockTime = (docs[0].timestamp - docs[99].timestamp)/100;
  var hashrate = docs[0].difficulty / blockTime;
    res.write(JSON.stringify({
        "blocks": docs,
        "hashrate": hashrate,
        "blockTime": blockTime,
        "blockHeight": docs[0].number,
        "difficulty": docs[0].difficulty
    }));
    res.end();
  });
}
/**
  OLD CODE DON'T USE
  Swipe ETC ETH data
**/
var getEtcEth = function(res) {
  var options = [{
    host: 'api.minergate.com',
    path: '/1.0/etc/status',
    method: 'GET',
    data: 'etc'
  },{
    host: 'api.minergate.com',
    path: '/1.0/eth/status',
    method: 'GET',
    data: 'eth'
  }];
  
  async.map(options, function(opt, callback) {
    
    https.request(opt, function(mg) {
      mg.on('data', function (data) {
        try {
          var result = JSON.parse(data.toString());
          result.chain = opt.data;
          callback(null, result);
        } catch (e) {
          callback(e);
        }
      })
    }).end();
  }, function(err, results) {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      if (results.length < 2)
        res.status(500).send();
      else {
        var c = ((results[0].chain == "etc") ? 0 : 1);
        var h = 1 - c;
        var etcHashrate = parseInt(results[c].instantHashrate);
        var ethHashrate = parseInt(results[h].instantHashrate);
        var etcDiff = results[c].difficulty.toFixed(2);
        var ethDiff = results[h].difficulty.toFixed(2);
        var etcEthHash = parseInt(100*etcHashrate/ethHashrate);
        var etcEthDiff = parseInt(100*etcDiff/ethDiff);
        res.write(JSON.stringify({
          "etcHashrate": etcHashrate,
          "ethHashrate": ethHashrate,
          "etcDiff": etcDiff,
          "ethDiff": ethDiff,
          "etcEthHash": etcEthHash,
          "etcEthDiff": etcEthDiff
        }));
        res.end();
      } 
    }

  });
}
