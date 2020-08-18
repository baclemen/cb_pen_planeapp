'use strict';

var jsondata = []

var start = new Date()
var end = new Date()
end.setMonth(start.getMonth() + 3)

for(var i = 0; i < 1000; i++){
    var record =  {}

    record.id = i;

    record.date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));


    //number of stops
    var rand = Math.random()
    if(rand < .5){
        record.stops = 0
    }
    else if (rand < .8){
        record.stops = 1
    }
    else{
        record.stops = 2
    }

    //luggage
    rand = Math.random()
    if(rand < .8){
        record.luggage = true
    }
    else{
        record.luggage = false
    }

    rand = Math.random()
    record.price = Math.floor((60 + record.stops*20) * (rand / 2 + 1))

    rand = Math.random();
    var rand2 = Math.random()
    record.duration = (Math.floor(20 + rand * 4) * 5 + (Math.floor((30 + rand2 * 10) * record.stops)) * 5)

    rand = Math.random()

    if(record.price / (1 + record.stops * .3) < 75){
        record.airline = "easyJet"
    }
    else if (rand < 5){
        record.airline = "British Airways"
    }
    else{
        record.airline = "SWISS"
    }

    rand = Math.random()

    if(rand > .8){
        record.luggage = false
    }
    else{
        record.luggage = true;
    }

    rand = Math.random()

    record.capacity = Math.floor(rand * 50)


    jsondata.push(record);
}

const fs = require('fs');

 
let data = JSON.stringify(jsondata);
fs.writeFileSync('mockdata.json', data);