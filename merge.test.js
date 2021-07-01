function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.position.y][x + player.position.x] = value;
            }
        })
    }
)}

let arena=[[0,0,0],[0,0,0],[0,0,0]]
let player={matrix:[[1,1,1],[0,1,0],[0,1,0]],position:{y:0,x:0}}
merge(arena,player)

test("merge fn", () => {

    expect(arena).toEqual(player.matrix)
})
