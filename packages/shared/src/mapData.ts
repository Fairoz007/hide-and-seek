export const TILE_SIZE = 64

// 0: floor, 1: wall
export const warehouseGrid = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,0,0,1],
  [1,0,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,1],
  [1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1],
  [1,0,1,1,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

export function isWall(x: number, y: number): boolean {
  const col = Math.floor(x / TILE_SIZE)
  const row = Math.floor(y / TILE_SIZE)

  if (row < 0 || row >= warehouseGrid.length) return true
  if (col < 0 || col >= warehouseGrid[0].length) return true

  return warehouseGrid[row][col] === 1
}
