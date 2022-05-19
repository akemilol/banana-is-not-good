
let position = [0, -15];
let perspective = 15;
let rotation = 0;
let rotationsOfRotate = 90;
let distance = 15;
let nWalls = 0;
let posRotation = [false, false];
let posInitial = [7, 7]
let mapMatrix = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,3,0,0,0,0,0,0,0,0,0,3,0,2],
  [2,0,1,0,0,0,0,0,0,0,0,0,1,0,2],
  [2,0,3,0,0,0,0,0,0,0,0,0,3,0,2],
  [2,0,1,0,0,0,0,0,0,0,0,0,1,0,2],
  [2,0,3,0,0,0,0,0,0,0,0,0,3,0,2],
  [2,0,1,0,0,0,1,3,1,0,0,0,1,0,2],
  [2,0,3,0,0,0,3,0,3,0,0,0,3,0,2],
  [2,3,1,3,1,3,1,0,1,0,1,0,1,0,2],
  [2,0,3,0,0,0,0,0,0,0,3,0,3,0,2],
  [2,0,1,0,0,0,0,0,0,0,1,3,1,3,2],
  [2,0,3,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,1,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,3,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]

//2 sem colissão, 3 indica meio da parede e 1 indica continuidade da parede

window.onload = function() {
  // console.log("ok")
  for (i = 0; i < mapMatrix.length; i++) {
    for (j = 0; j < mapMatrix[i].length; j++) {
      if (mapMatrix[i][j] === 3) {
        if ((mapMatrix[i][j - 1] && mapMatrix[i][j + 1]) >= 1) {
          wallMaker(false, i, j);
          mapMaker(i, j);
        } else {
          wallMaker(true, i, j);
          mapMaker(i, j);
        }
      }
    }
  }
}

function mapMaker(i, j) {
  let mContent = document.getElementById("mapContent");
  let newWall = document.createElement("div");
  newWall.classList.add(`murinhos`);
  mContent.appendChild(newWall);
}

function wallMaker(rotated, corY, corX) {
  let walls = document.getElementById("walls");
  let newWall = document.createElement("div");
  let corOnMapY = 
      corY > posInitial[0] ?
        corY - (posInitial[0] - 1) :
        corY === posInitial[0] ?
          rotated ? 1 : 0 :
          corY - (posInitial[0] - 1)
  let corOnMapX = 
      corX > posInitial[1] ?
        corX - posInitial[1] :
        corX === posInitial[1] ?
          0 :
          corX - posInitial[1]
  newWall.classList.add(`W${nWalls}`);
  newWall.classList.add("sides");
  newWall.style.transform = `
  translate3d(
    ${(distance) * corOnMapX}em,
    0, 
    ${(distance) * corOnMapY}em)
  rotateY(${rotated ? 90 : 0}deg)`
  walls.appendChild(newWall);
  nWalls = ++nWalls;
 }

function walk() {
  document.documentElement.style
    .setProperty('--posX', `${position[0]}em`);
  document.documentElement.style
    .setProperty('--posY', `${position[1]}em`);
}

function rotate() {
  document.documentElement.style
    .setProperty('--rotate', `${rotation}deg`);
}

function changePers() {
  document.documentElement.style
    .setProperty('--perspective', `${perspective}em`);
}

function movOnMap(key) {
  let forward = (key === "w" ? true : false)
  if (!posRotation[0] && !posRotation[1]) {
    if (mapMatrix[(posInitial[0] + (forward ? (- 1) : (+ 1)))][posInitial[1]]) {
      return false;
    } else {
      posInitial[0] = posInitial[0] + (forward ? (- 1) : (+ 1))
      return true;
    }
  } else if (posRotation[0] && !posRotation[1]) {
    if (mapMatrix[posInitial[0]][(posInitial[1] + (forward ? (- 1) : (+ 1)))]) {
      return false;
    } else {
      posInitial[1] = posInitial[1] + (forward ? (- 1) : (+ 1))
      return true;
    }
  } else if (posRotation[0] && posRotation[1]) {
    if (mapMatrix[(posInitial[0] + (forward ? (+ 1) : (- 1)))][posInitial[1]]) {
      return false;
    } else {
      posInitial[0] = posInitial[0] + (forward ? (+ 1) : (- 1))
      return true;
    }
  } else if (!posRotation[0] && posRotation[1]) {
    if (mapMatrix[posInitial[0]][(posInitial[1] + (forward ? (+ 1) : (- 1)))]) {
      return false;
    } else {
      posInitial[1] = posInitial[1] + (forward ? (+ 1) : (- 1))
      return true;
    }
  }
}

function updatePos(key) {
  let forward = (key === "w" ? true : false)
  if (!posRotation[0] && !posRotation[1]) {
    position[1] = position[1] + (forward ? (+ distance) : (- distance))
  } else if (posRotation[0] && !posRotation[1]) {
    position[0] = position[0] + (forward ? (+ distance) : (- distance))
  } else if (posRotation[0] && posRotation[1]) {
    position[1] = position[1] + (forward ? (- distance) : (+ distance))
  } else if (!posRotation[0] && posRotation[1]) {
    position[0] = position[0] + (forward ? (- distance) : (+ distance))
  }
  walk();
}

function updatePosRot(key) {
  let left = (key === "a" ? true : false)
  if (!posRotation[0] && !posRotation[1]) {
    posRotation[left ? 0 : 1] = true;
  } else if (posRotation[0] && !posRotation[1]) {
    left ? (posRotation[1] = true) : (posRotation[0] = false)
  } else if (posRotation[0] && posRotation[1]) {
    posRotation[left ? 0 : 1] = false;
  } else if (!posRotation[0] && posRotation[1]) {
    left ? (posRotation[1] = false) : (posRotation[0] = true)
  }
}

document.addEventListener('keydown', (event) => {
  var key = event.key
  // alert(key)
  if (key === "w") {
    if (movOnMap(key)) {
      updatePos(key); 
    }
  } else if (key === "s") {
    if (movOnMap(key)) {
      updatePos(key); 
    }
  } else if (key === "q") {
    if (perspective === 5) return false;
    perspective = perspective - 5
    changePers();
  } else if (key === "e") {
    if (perspective === 100) return false;
    perspective = perspective + 5
    changePers();
  } else if (key === "a") {
    updatePosRot(key);
    rotation = rotation - rotationsOfRotate;
    rotate();
  } else if (key === "d") {
    updatePosRot(key);
    rotation = rotation + rotationsOfRotate
    rotate();
  } else if (key === "r") {
    ifWallMaker();
  }
}, false);