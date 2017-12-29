const canvas = document.querySelector(".tetris");
const context = canvas.getContext("2d");

context.scale(20, 20);


function createMatrix(w,h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}



function draw(){
    context.fillStyle="black";
    context.fillRect(0,0,240,320);
    drawMatrix(player.matrix, player.position);
}



function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
     row.forEach((value, x) => {
        if (value !== 0) {
            context.fillStyle = "red";
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
};

function playerDrop() {
    player.pos.y++;
    dropCounter=0;
}



let dropInterval = 1000;

let lastTime = 0;
let dropCounter = 0;


function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        player.position.y++;
        dropCounter = 0;
    }
    draw();
    requestAnimationFrame(update);
}




document.addEventListener('keydown', event => {
    if (event.keyCode == 37) {
        player.position.x--;
    }
    if (event.keyCode == 38) {

    };
    if (event.keyCode == 39) {
        player.position.x++;

    };
    if (event.keyCode == 40) {
        playerDrop()
    };
})

update();
