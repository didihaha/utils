let res = [], _obstacleGrid = null
var uniquePathsWithObstacles = function(obstacleGrid) {
    _obstacleGrid = obstacleGrid
    let m = obstacleGrid.length
    let n = obstacleGrid[0] && obstacleGrid[0].length || 1
    res = new Array(m)
    for (let i = 0; i < m; ++i) {
        res[i] = []
        for (let j = 0; j < n; ++j) {
            res[i][j] = 0
        }
    }
    // 让m和n和序列值相同，否则m要比序列值大1
    --m
    --n
    return dpPath(m, n)
}

function dpPath (x, y) {
    if (_obstacleGrid[x][y] === 1) {
        return 0
    }
    if (res[x][y] !== 0) {
        return res[x][y]
    }
    // 当前为起始点
    if (x === 0 && y === 0) {
        return 1
    } else if (x === 0) {
        res[x][y - 1] |= dpPath(x, y - 1)
        return res[x][y - 1]
    } else if (y === 0) {
        res[x - 1][y] |= dpPath(x - 1, y)
        return res[x - 1][y]
    } else {
        res[x][y - 1] |= dpPath(x, y - 1)

        res[x - 1][y] |= dpPath(x - 1, y)

        return res[x - 1][y] + res[x][y - 1]
    }
    
}