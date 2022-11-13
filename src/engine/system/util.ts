import { Boid } from "../factory";

export const buildDistance = (source: Boid, target: Boid) => {
    const xDiff = (target?.x || 0) - (source?.x || 0);
    const yDiff = (target?.y || 0) - (source?.y || 0);

    const diff = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

    return diff;
}

export const buildNormalizedVector = (source: Boid, target: Boid) => {
    const xDiff = (target?.x || 0) - (source?.x || 0);
    const yDiff = (target?.y || 0) - (source?.y || 0);

    const diff = buildDistance(source, target);

    const xVelocity = xDiff / diff;
    const yVelocity = yDiff / diff;

    return { x: xVelocity, y: yVelocity };
}