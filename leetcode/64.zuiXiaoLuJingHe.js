/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const res = [[grid[0][0]]], l = grid.length, h = grid[0].length
    // 确定x为0时y轴的最小步数
    for (let i = 1; i < l; i++) {
        res[i] = []
        res[i][0] = res[i - 1][0] + grid[i][0]
    }
    // 确定y为0时x轴的最小步数
    for (let j = 1; j < h; j++) {
        res[0][j] = res[0][j - 1] + grid[0][j]
    }

    for (let m = 1; m < l; m++) {
        for (let n = 1; n < h; n++) {
            res[m][n] = Math.min(res[m][n - 1], res[m - 1][n]) + grid[m][n]
        }
    }
    return res[l - 1][h - 1]
};

const res = minPathSum([[1,3,1],[1,5,1],[4,2,1]])
console.log(res)