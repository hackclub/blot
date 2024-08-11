/*
@title: AirRoutes
@author: Desert
@snapshot: snapshot1.png
*/

// Drawing script.
// THIS PROJECT CONSISTS OF TWO PARTS!
// 1. This drawing script.
// 2. The maths script, airports.js, found at https://github.com/GameDesert/BlotAirRoutes
// This part 2 creates the API, which couldn't be included in this file due to import constraints.

// List of flight paths (in Europe) to plot

const width = 125;
const height = 125;

setDocDimensions(width, height);


// These airports can be changed to any in Europe (excluding maybe very Northern bits)
// Use IATA Codes
const airports = [
    {
      "from": "LHR",
      "to": "OSL"
    },
    {
      "from": "OSL",
      "to": "WAW"
    },
    {
      "from": "WAW",
      "to": "OTP"
    },
    {
      "from": "OTP",
      "to": "PMO"
    },
    {
      "from": "PMO",
      "to": "CAG"
    },
    {
      "from": "CAG",
      "to": "IBZ"
    },
    {
      "from": "IBZ",
      "to": "LIS"
    },
    {
      "from": "LIS",
      "to": "BOD"
    },
    {
      "from": "BOD",
      "to": "DUB"
    },
    {
      "from": "DUB",
      "to": "EDI"
    },
    {
      "from": "EDI",
      "to": "OSL"
    },
    {
      "from": "EDI",
      "to": "LHR"
    },
    {
      "from": "LIS",
      "to": "BCN"
    },
    {
      "from": "BCN",
      "to": "FRA"
    },
    {
      "from": "FRA",
      "to": "WAW"
    },
    {
      "from": "FRA",
      "to": "PMO"
    },
    {
      "from": "FRA",
      "to": "PRG"
    },
    {
      "from": "PRG",
      "to": "OTP"
    },
    {
      "from": "PRG",
      "to": "PMO"
    },
    {
      "from": "DUB",
      "to": "LHR"
    },
    {
      "from": "LHR",
      "to": "HAM"
    },
    {
      "from": "HAM",
      "to": "WAW"
    },
    {
      "from": "HAM",
      "to": "FRA"
    },
    {
      "from": "LHR",
      "to": "FRA"
    },
    {
      "from": "BOD",
      "to": "ORY"
    },
    {
      "from": "ORY",
      "to": "FRA"
    },
    {
      "from": "OSL",
      "to": "CPH"
    },
    {
      "from": "CPH",
      "to": "HAM"
    },
    {
      "from": "CPH",
      "to": "WAW"
    },
    {
      "from": "CAG",
      "to": "BCN"
    }
  ];
const jsonString = JSON.stringify(airports);





function drawout(paths) {
  let finalLines = [];
  paths.forEach(object => {
    finalLines.push(bt.catmullRom(object));
  });
  console.log(finalLines);
  drawLines(finalLines);
}

const xhr = new XMLHttpRequest();

xhr.open("POST", "https://flightconvert.kotla.eu/plot-flights", false);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(jsonString);

if (xhr.status === 200) {
    const responseArray = JSON.parse(xhr.responseText);
    console.log(responseArray);

    drawout(responseArray);
}