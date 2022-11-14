import * as _ from "lodash";

export interface Boid{
    x: number,
    y: number,
    renderId: string
}

export interface GameState{
    boids: Boid[]
}

export const buildBoids = (count: number): GameState=> {
    const boids = _.range(count).map(item => ({
        x: 400 + item * 30,
        y: 200,
        renderId: `boid${item}`
    }));

    console.log(boids[0]);
    console.log(boids[1]);

    return { boids };
}

export const target = (): Boid => ({
    x: 300,
    y: 400,
    renderId: "target"
})