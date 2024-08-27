/*
@title: Cedar Tree
@author: Reese
@snapshot: cedar.png
*/

const width = 125;
const height = 125;
const sizex = bt.randInRange(0.1, 1);
const sizey = bt.randInRange(0.1, 1);

setDocDimensions(width, height);

const redraw = () =>{
for (let i = 0; i < pieces.length; i++){
  drawLines([pieces[i]])}
}

// draw various parts of cedar tr
const leftOutline = bt.catmullRom([[28,2], [31,6], [38,8], 
                               [45,14], [49,25],[46,31],
                               [41,33],[31,28],[24,25],
                               [15,24],[10,28],[16,29],
                               [25,32],[33,37],[32,42],
                               [28,42],[22,38],[17,35],
                               [10,33],[4,34],[4,36],
                               [11,38],[14,42],[19,46],
                               [24,48],[29,53],[25,56],
                               [19,55],[15,58],[22,64],
                               [32,70],[34,75],[32,79],
                               [27,78],[22,78],[23,81],
                               [30,84],[35,89],[39,93],
                               [43,94],[45,98],[43,99],
                               [39,97],[42,100],[49,106],
                               [53,111],[50,109],[45,108],
                               [54,115],[58,119],[61,124]
                                  ]);

const rightOutline = bt.catmullRom([[61,124],[66,117],[74,112],
                                    [82,109],[89,105],[93,101],
                                    [89,100],[87,102],[85,101],
                                    [89,97],[93,94],[98,92],
                                    [103,90],[97,89],[94,91],
                                    [89,93],[87,91],[92,86],
                                    [101,79],[106,75],[113,71],
                                    [112,70],[105,69],[98,71],
                                    [94,68],[99,65],[108,64],
                                    [112,63],[111,60],[99,60],
                                    [94,60],[97,55],[105,53],
                                    [112,47],[118,42],[116,40],
                                    [111,42],[104,45],[102,42],
                                    [99,39],[104,35],[112,30],
                                    [118,26],[124,20],[121,19],
                                    [114,22],[108,25],[98,27],
                                    [94,27],[90,27],[87,29],
                                    [82,31],[77,29],[76,22],
                                    [77,17],[78,14],[82,10],
                                    [87,6],[89,1],[84,5],
                                    [79,9],[78,7],[75,9],
                                    [72,10],[73,5],[74,2],
                                    [72,2],[68,5],[64,10],
                                    [60,13],[57,11],[51,13],
                                    [45,10],[39,6],[32,4],
                                    [28,2]]);

const cutouts = [bt.catmullRom([[48,39],[49,44],[44,47],[45,42],[48,39]]),
                 bt.catmullRom([[55,39],[56,42],[54,43],[53,40],[55,39]]),
                 bt.catmullRom([[62,39],[60,46],[63,45],[65,46],[62,39]]),
                 bt.catmullRom([[82,49],[86,52],[94,53],[92,47],[82,49]]),
                 bt.catmullRom([[95,47],[98,44],[103,49],[97,51],[95,47]]),
                 bt.catmullRom([[29,56],[30,55],[33,56],[38,58],[39,61],[37,61],[35,62],[32,60],[26,60],[29,56]]),
                 bt.catmullRom([[47,64],[51,64],[48,67],[47,64]]),
                 bt.catmullRom([[56,65],[58,67],[56,69],[55,67],[56,65]]),
                 bt.catmullRom([[61,67],[64,66],[65,60],[60,63],[61,67]]),
                 bt.catmullRom([[66,65],[67,64],[68,60],[66,62],[66,65]]),
                 bt.catmullRom([[93,72],[91,68],[87,69],[88,73],[93,72]]),
                 bt.catmullRom([[87,75],[85,79],[83,82],[80,80],[76,77],[80,77],[83,77],[87,75]]),
                 bt.catmullRom([[68,82],[68,80],[72,82],[70,85],[68,82]]),
                 bt.catmullRom([[65,83],[60,83],[63,84],[66,85],[65,83]]),
                 bt.catmullRom([[50,83],[45,82],[46,77],[50,83]]),
                 bt.catmullRom([[43,76],[40,75],[38,73],[35,78],[37,79],[40,80],[43,76]]),
                 bt.catmullRom([[49,86],[50,91],[54,95],[57,92],[49,86]]),
                 bt.catmullRom([[59,94],[65,95],[63,97],[61,97],[59,94]]),
                 bt.catmullRom([[71,94],[66,93],[68,96],[71,94]]),
                 bt.catmullRom([[74,95],[76,95],[76,97],[74,97],[74,95]]),
                 bt.catmullRom([[46,98],[49,98],[50,101],[48,101],[46,98]])
                 
                 
                ]

const outlines = [...leftOutline, ...rightOutline]

const pieces = [outlines]

for (let i = 0; i < cutouts.length; i++){
  pieces.push(cutouts[i])
}

for (let i = 0; i < pieces.length ; i++){
  bt.scale([pieces[i]], [sizex, sizey], [0,0])
}

const cwidth = bt.bounds(pieces).width
const cheight = bt.bounds(pieces).height
const divisibleY = Math.floor(height / cheight) 
const divisibleX = Math.floor(width / cwidth)

const rows = (rows) => {
  bt.originate(pieces)
  bt.translate(pieces, [cwidth/2,cheight/2])
  
  for (let i = 0; i < rows; i++){
    redraw()
    bt.translate(pieces, [cwidth,0])
  }
  }

const columns = (columns) => {
  bt.originate(pieces)
  bt.translate(pieces, [cwidth/2,cheight/2])
  if (divisibleX > 1){
    for (let i = 0; i < (divisibleY - 1);i++){
      bt.translate(pieces, [0,cheight])
        for (let j = 0; j < divisibleX; j++){
          redraw()
          bt.translate(pieces, [cwidth, 0])
        }
      bt.translate(pieces, [-cwidth * divisibleX, 0])
     }
   } else if (divisibleY > 1){
    for (let i = 0; i < (divisibleY - 1);i++){
      bt.translate(pieces, [0,cheight])
      redraw()}
  }}

columns(divisibleY)
rows(divisibleX)





  


