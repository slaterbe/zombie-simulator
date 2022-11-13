export interface Boid{
    x: number,
    y: number
}

export interface GameState{
    boids: {
        [name: string]: Boid
    }
}

export const buildBoids = (): GameState=> ({
    boids: {
        boid0: {
            x: 400,
            y: 200
        },
        boid1: {
            x: 430,
            y: 200
        },
        boid2: {
            x: 460,
            y: 200
        }
    }
})

export const target = (): Boid => ({
    x: 300,
    y: 400
})