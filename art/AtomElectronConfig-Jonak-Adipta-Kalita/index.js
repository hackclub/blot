/*
@title: Designed Balloons
@author: Jonak-Adipta-Kalita
@snapshot: snapshot1-Phosphorus.png
*/

const HYDROGEN_ATOMIC_NUMBER = 1;
const CALCIUM_ATOMIC_NUMBER = 20;

const finalLines = [];
const t = new bt.Turtle();

const electronsInShells = (totalElectrons) => {
  const shells = [];
  let electronsLeft = totalElectrons;
  let shellNumber = 1;

  while (electronsLeft > 0) {
    let electronsInShell = shellNumber === 1 ? 2 : 8;
    if (electronsLeft >= electronsInShell) {
      shells.push(electronsInShell);
      electronsLeft -= electronsInShell;
    } else {
      shells.push(electronsLeft);
      electronsLeft = 0;
    }
    shellNumber++;
  }
  return shells;
}

const shellElectrons = electronsInShells(bt.randIntInRange(HYDROGEN_ATOMIC_NUMBER, CALCIUM_ATOMIC_NUMBER))
const arcRadiusForShell = (shell) => 30 + shell * 10

const draw2ElectronShell = (electrons, shell) => {
  const arcRadius = arcRadiusForShell(shell)
  let cursorPos

  cursorPos = [t.pos[0], t.pos[1] - (shell === 0 ? 15 : 10)]
  t.jump([cursorPos[0], cursorPos[1] - 2])
  t.arc(360, 2)
  t.jump(cursorPos)

  if (electrons > 1) {
    t.arc(180, arcRadius)
    cursorPos = t.pos
    t.jump([cursorPos[0], cursorPos[1] + 2])
    t.arc(360, 2)
    t.jump(cursorPos)
    t.arc(180, arcRadius)
  } else {
    t.arc(360, arcRadius)
  }
}

const draw8ElectronShell = (electrons, shell) => {
  const arcRadius = arcRadiusForShell(shell)
  let cursorPos

  if (electrons <= 2) draw2ElectronShell(electrons, shell)
  else if (electrons === 3) {
    cursorPos = [t.pos[0], t.pos[1] - 10]

    for (let i = 1; i <= 3; i++) {
      t.jump([i === 2 ? cursorPos[0] + 2.7 : i === 3 ? cursorPos[0] - 2.7 : cursorPos[0], i === 1 ? cursorPos[1] - 2 : cursorPos[1]])
      t.arc(360, 2)
      t.jump(cursorPos)

      t.arc(i === 2 ? 90 : 135, arcRadius)
      cursorPos = t.pos
    }
  } else if (electrons === 4) {
    cursorPos = [t.pos[0], t.pos[1] - 10]
    for (let i = 1; i <= 4; i++) {
      t.jump([
        (i === 2 ? cursorPos[0] + 2 : i === 4 ? cursorPos[0] - 2 : cursorPos[0]),
        (i === 1 ? cursorPos[1] - 2 : i === 3 ? cursorPos[1] + 2 : cursorPos[1])
      ])
      t.arc(360, 2)
      t.jump(cursorPos)

      t.arc(90, arcRadius)
      cursorPos = t.pos
    }
  } else if (electrons === 5) {
    cursorPos = [t.pos[0], t.pos[1] - 10]

    for (let i = 1; i <= 5; i++) {
      t.jump([
        [2, 3].includes(i) ? cursorPos[0] + 2.7 : [4, 5].includes(i) ? cursorPos[0] - 2.7 : cursorPos[0],
        i === 1 ? cursorPos[1] - 2 : cursorPos[1]
      ])
      t.arc(360, 2)
      t.jump(cursorPos)

      t.arc([1, 5].includes(i) ? 45 : 90, arcRadius)
      cursorPos = t.pos
    }
  } else if (electrons === 6) {
    cursorPos = [t.pos[0], t.pos[1] - 10]

    const drawElectronAndArc = (angle, vertical, top, diagonal, right) => {
      t.jump([
        (!diagonal ? cursorPos[0] : right ? cursorPos[0] + 2.7 : cursorPos[0] - 2.7),
        !vertical ? cursorPos[1] : top ? cursorPos[1] + 2 : cursorPos[1] - 2
      ])
      t.arc(360, 2)
      t.jump(cursorPos)

      t.arc(angle, arcRadius)
      cursorPos = t.pos
    }

    drawElectronAndArc(45, true, false, false, false)
    drawElectronAndArc(90, false, false, true, true)
    drawElectronAndArc(45, false, false, true, true)
    drawElectronAndArc(45, true, true, false, false)
    drawElectronAndArc(90, false, false, true, false)
    drawElectronAndArc(45, false, false, true, false)
  } else if (electrons === 7) {
    cursorPos = [t.pos[0], t.pos[1] - 10]

    for (let i = 1; i <= 7; i++) {
      t.jump([
        [2, 4].includes(i) ? cursorPos[0] + 2.7 : i === 3 ? cursorPos[0] + 2 : [5, 7].includes(i) ? cursorPos[0] - 2.7 : i === 6 ? cursorPos[0] - 2 : cursorPos[0],
        i === 1 ? cursorPos[1] - 2 : cursorPos[1]
      ])
      t.arc(360, 2)
      t.jump(cursorPos)

      t.arc(i === 4 ? 90 : 45, arcRadius)
      cursorPos = t.pos
    }
  } else if (electrons === 8) {
    cursorPos = [t.pos[0], t.pos[1] - 10]
    for (let i = 1; i <= 8; i++) {
      t.jump([
        [2, 4].includes(i) ? cursorPos[0] + 2.7 : i === 3 ? cursorPos[0] + 2 : [6, 8].includes(i) ? cursorPos[0] - 2.7 : i === 7 ? cursorPos[0] - 2 : cursorPos[0],
        i === 1 ? cursorPos[1] - 2 : i === 5 ? cursorPos[1] + 2 : cursorPos[1]
      ])
      t.arc(360, 2)
      t.jump(cursorPos)

      t.arc(45, arcRadius)
      cursorPos = t.pos
    }
  }
}

t.arc(360, 15)

shellElectrons.map((electrons, i) => {
  if (i === 0) draw2ElectronShell(electrons, i)
  else if (i === 1) draw8ElectronShell(electrons, i)
  else if (i === 2) draw8ElectronShell(electrons, i)
  else if (i === 3) draw2ElectronShell(electrons, i)
})

bt.join(finalLines, t.lines());

drawLines(finalLines);