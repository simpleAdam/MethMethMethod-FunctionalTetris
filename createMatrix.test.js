const { TestWatcher } = require("jest");

function createMatrix(w,h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

test("createMatrix fn", () => {
    expect(Array.isArray(createMatrix(2,2))).toBe(true)
})