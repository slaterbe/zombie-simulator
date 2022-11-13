import { Boid, GameState, target } from "./factory";

const actualTarget = target();

export const updateSystem = (gameState: GameState, delta: number) => {
    Object.keys(gameState.boids)
        .forEach(key => updateBoid(gameState.boids[key], delta));
}

const updateBoid = (boid: Boid, delta: number): void => {
    const xDiff = (actualTarget?.x || 0) - (boid?.x || 0);
    const yDiff = (actualTarget?.y || 0) - (boid?.y || 0);

    const diff = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

    const xVelocity = xDiff / diff * 20;
    const yVelocity = yDiff / diff * 20;

    boid.x += (delta / 1000) * xVelocity;
    boid.y += (delta / 1000) * yVelocity;
}