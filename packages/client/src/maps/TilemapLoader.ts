import Phaser from "phaser"
import { warehouseGrid, TILE_SIZE } from "@shadow-seek/shared"

export class TilemapLoader {
  static loadMap(scene: Phaser.Scene) {
    const graphics = scene.add.graphics()

    for (let row = 0; row < warehouseGrid.length; row++) {
      for (let col = 0; col < warehouseGrid[row].length; col++) {
        const isWall = warehouseGrid[row][col] === 1
        
        if (isWall) {
          graphics.fillStyle(0x444444)
          graphics.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
          graphics.lineStyle(1, 0x222222)
          graphics.strokeRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
        } else {
          graphics.fillStyle(0x111111)
          graphics.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
          graphics.lineStyle(1, 0x1a1a1a)
          graphics.strokeRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
        }
      }
    }

    // Set world bounds so camera doesn't scroll out of bounds
    scene.physics.world.setBounds(
      0, 
      0, 
      warehouseGrid[0].length * TILE_SIZE, 
      warehouseGrid.length * TILE_SIZE
    )
    scene.cameras.main.setBounds(
      0, 
      0, 
      warehouseGrid[0].length * TILE_SIZE, 
      warehouseGrid.length * TILE_SIZE
    )
  }
}
