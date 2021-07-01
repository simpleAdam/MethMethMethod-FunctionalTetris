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

test("collide fn", () => {
    expect(typeof collide({matrix:[[]]},{matrix:[[]]})).toBe("boolean")
})