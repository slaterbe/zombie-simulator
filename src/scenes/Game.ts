import Phaser from 'phaser';
import { buildBoids, target, GameState } from '../engine/factory';
import { updateSystem } from '../engine/system';

export default class Demo extends Phaser.Scene {
  public Circles: { [name: string]: Phaser.GameObjects.Arc } = {};

  public gameState: GameState;

  constructor() {
    super('GameScene');
    this.gameState = buildBoids();
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    ['boid0', 'boid1', 'boid2']
      .forEach(key => {
        const x = this.gameState.boids[key].x;
        const y = this.gameState.boids[key].y;

        this.Circles[key] = this.add.circle(x, y, 5, 0xff0000, 1);
      })

    this.add.circle(target().x, target().y, 5, 0x00ff00, 1);
  }

  update(time: number, delta: number) {
    updateSystem(this.gameState, delta);

    ['boid0', 'boid1', 'boid2']
      .forEach(key => {
        const x = this.gameState.boids[key].x;
        const y = this.gameState.boids[key].y;

        this.Circles[key].x = x;
        this.Circles[key].y = y;
      })
  }
}
