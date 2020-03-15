import {MenuItem} from './menu-item';

export interface Menu {
    id: number,
    menu: string,
    items: MenuItem[]
}