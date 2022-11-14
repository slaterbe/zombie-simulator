import Phaser from 'phaser';
import { buildBoids, target, GameState } from '../engine/factory';
import { updateSystem } from '../engine/system';

export default class Demo extends Phaser.Scene {
  public Circles: { [name: string]: Phaser.GameObjects.Arc } = {};

  public gameState: GameState;

  constructor() {
    super('GameScene');
    this.gameState = buildBoids(50);
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    this.gameState.boids
      .forEach(boid => {
        const x = boid.x;
        const y = boid.y;

        this.Circles[boid.renderId] = this.add.circle(x, y, 5, 0xff0000, 1);
      })

    this.add.circle(target().x, target().y, 5, 0x00ff00, 1);
  }

  update(time: number, delta: number) {
    updateSystem(this.gameState, delta);

    this.gameState.boids
      .forEach(boid => {
        const x = boid.x;
        const y = boid.y;

        this.Circles[boid.renderId].x = x;
        this.Circles[boid.renderId].y = y;
      });
  }
}
