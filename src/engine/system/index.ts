import { Boid, GameState, target } from "../factory";
import { buildNormalizedVector, buildDistance } from "./util";

const actualTarget = target();

export const updateSystem = (gameState: GameState, delta: number) => {
    gameState.boids
        .forEach(key => updateBoid(gameState, delta));
}

const buildTargetVelocity = (sourceBoid: Boid, targetBoid: Boid) => {
    const vector = buildNormalizedVector(sourceBoid, actualTarget);

    const x = vector.x * 5;
    const y = vector.y * 5;

    return { x, y }
}

const buildNeighbourForce = (sourceBoid: Boid, gameState: GameState) => {
    const result = gameState.boids
        .filter(boid => boid !== sourceBoid)
        .map(neighbour => buildIndividualNeighbourForce(sourceBoid, neighbour))
        .reduce((item, accum) => ({
            x: item.x + accum.x,
            y: item.y + accum.y
        }),
            { x: 0, y: 0 });

    return { x: result.x * 5, y: result.y * 5 }
}

const buildIndividualNeighbourForce = (sourceBoid: Boid, neighbour: Boid) => {
    const distance = buildDistance(sourceBoid, neighbour);

    if (distance > 20) return { x: 0, y: 0 }

    const vector = buildNormalizedVector(sourceBoid, neighbour);

    return { x: -vector.x * 5, y: -vector.y * 5 }
}

const updateIndividualBoid = (gameState: GameState, delta: number, sourceBoid: Boid): void => {
    const targetVelocity = buildTargetVelocity(sourceBoid, actualTarget);
    const neighbourForce = buildNeighbourForce(sourceBoid, gameState);

    sourceBoid.x += (delta / 1000) * (targetVelocity.x + neighbourForce.x);
    sourceBoid.y += (delta / 1000) * (targetVelocity.y + neighbourForce.y);
}

const updateBoid = (gameState: GameState, delta: number): void => {
    gameState.boids.forEach(sourceBoid => updateIndividualBoid(gameState, delta, sourceBoid))
}