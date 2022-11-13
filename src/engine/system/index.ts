import { Boid, GameState, target } from "../factory";
import { buildNormalizedVector, buildDistance } from "./util";

const actualTarget = target();

export const updateSystem = (gameState: GameState, delta: number) => {
    Object.keys(gameState.boids)
        .forEach(key => updateBoid(gameState, key, delta));
}

const buildTargetVelocity = (sourceBoid: Boid, targetBoid: Boid) => {
    const vector = buildNormalizedVector(sourceBoid, actualTarget);

    const x = vector.x * 20;
    const y = vector.y * 20;

    return { x, y }
}

// const buildNeighbourForce = (sourceBoid: Boid, gameState: GameState) => {
//     Object.keys(gameState.boids)
//         .map(key => gameState.boids[key]);;


// }

// const buildNeighbourForce = (sourceBoid: Boid, neighbour: Boid) => {
//     const distance = buildDistance(sourceBoid, neighbour);

//     if (distance > 500) return { x: 0, y: 0 }



//     return { x: 0, y: 0 }
// }

const updateBoid = (gameState: GameState, boidKey: string, delta: number): void => {
    const sourceBoid = gameState.boids[boidKey];

    const targetVelocity = buildTargetVelocity(sourceBoid, actualTarget);

    sourceBoid.x += (delta / 1000) * targetVelocity.x;
    sourceBoid.y += (delta / 1000) * targetVelocity.y;
}