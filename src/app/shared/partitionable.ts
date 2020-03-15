export interface Partitionable {
    x: number;
    y: number;
    w: number;
    l: number;
    used: boolean;
    down?: Partitionable;
    right?: Partitionable;
}