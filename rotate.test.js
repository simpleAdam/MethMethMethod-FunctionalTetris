const { TestWatcher } = require("jest");

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

test("rotate",() => {
    let player=[[1,1,1],[0,1,0],[0,1,0]]
    rotate(player,1)
    expect(player).toEqual([[0,0,1],[1,1,1],[0,0,1]])
    
    player=[[1,1,1],[0,1,0],[0,1,0]]
    rotate(player,-1)
    expect(player).toEqual([[1, 0, 0], [1, 1, 1], [1, 0, 0]])
})