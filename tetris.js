const canvas = document.querySelector(".tetris");
const context = canvas.getContext("2d");


context.scale(20, 20);

let dropInterval = 1000;

let lastTime = 0;
let dropCounter = 0;

const colors = [
    null,
    "#FCBE00",
    "#AAA999",
    "#FF8100",
    "#E85000",
    "#FF2F00",
    "#E80049",
    "#DFFF0E",
]

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length-1; y > 0; --y) {
        for (let x =0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        
        player.score += rowCount *10;
        rowCount *= 2;
    }
}


function collide(arena, player) {
    const [m, o] = [player.matrix, player.position];
    for (let y=0; y<m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
               arena[y + o.y][x + o.x]) !==0) {
                return true;
            }
        }
    }
    return false;
}


function createMatrix(w,h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    if (type === 'T') {
   return [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
      ];
    } 
    else if (type === 'O') {
        return [
    [2, 2],
    [2, 2],
      ];
    }
    else if (type === 'L') {
    return [
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 3],
      ];    
    }
    else if (type === 'J') {
    return [
    [0, 4, 0],
    [0, 4, 0],
    [4, 4, 0],
      ];    
    }
    else if (type === 'I') {
      return [
    [0, 5, 0, 0],
    [0, 5, 0, 0],
    [0, 5, 0, 0],
    [0, 5, 0, 0],
      ];  
    }
    else if (type === 'S') {
      return [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0],
      ];  
    }
    else if (type === 'Z') {
      return [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
      ];   
    }
}



function draw(){
    context.fillStyle="black";
    context.fillRect(0,0,240,320);
    drawMatrix(arena, {x:0, y:0});
    drawMatrix(player.matrix, player.position);
}



function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
     row.forEach((value, x) => {
        if (value !== 0) {
            context.fillStyle = colors[value];
            context.fillRect(
                x + offset.x,
                y + offset.y,
                1, 1);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.position.y][x + player.position.x] = value;
            }
        })
    }
)}


const arena = createMatrix(12,20);
console.log(arena);

const player = {
    position: {
        x: 5,
        y: 5
    },
    matrix: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
],
    score: 0,
};

function playerDrop() {
    player.position.y++;
    if (collide(arena, player)){
        player.position.y--;
        merge(arena, player);
        //player.position.y=0;
        //player.position.x=5;
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter=0;
}

function playerMove(dir) {
    player.position.x += dir;
    if (collide(arena, player)) {
        player.position.x -= dir;
    }
}

function playerReset() {
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.position.y = 0;
    player.position.x = (arena[0].length/2 | 0) - 
              (player.matrix[0].length/2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
    
}

function playerRotate(dir) {
    const pos = player.position.x
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.position.x += offset;
        offset = -(offset + (offset > 0 ? 1: -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, - dir);
            player.position.x = pos;
            return;
        }
    }
}


function rotate(matrix, dir) {
    for (let y=0; y<matrix.length; ++y) {
        for (let x=0; x<y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    
    if (dir>0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}





function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
        
    }
    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.querySelector(".score").innerHTML = player.score;
}




document.addEventListener('keydown', event => {
    if (event.keyCode == 37) {
        playerMove(-1);
    }
    if (event.keyCode == 38) {
        playerRotate(-1);
    };
    if (event.keyCode == 39) {
        playerMove(1);

    };
    if (event.keyCode == 40) {
        playerDrop()
    };
});


update();
updateScore();


