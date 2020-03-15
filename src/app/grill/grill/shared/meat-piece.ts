import { PackerItem } from 'src/app/shared/packer-item';

export interface MeatPiece extends PackerItem {
    id: number,
    name: string,
    color?: string
}


