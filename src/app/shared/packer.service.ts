import { Injectable } from '@angular/core';
import { PackerItem } from './packer-item';
import { Partitionable } from './partitionable';
import { default as config } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class PackerService {

  root: Partitionable = { x: 0, y: 0, w: config.grillWidth, l: config.grilllLength, used: false };

  constructor() {
  }

  reset() {
    this.root.used = false;
  }

  fit(blocks: PackerItem[]): void {
    let node = null;
    for (const block of blocks) {
      node = this.findNode(this.root, block.width, block.length);
      if (node) block.fit = this.splitNode(node, block.width, block.length);
    }
  }

  private findNode(box: Partitionable, w: number, l: number): any {
    if (box.used) {
      return this.findNode(box.right!, w, l) || this.findNode(box.down!, w, l);
    } else if (w <= box.w && l <= box.l) return box;
    else return null;
  }

  private splitNode(node: Partitionable, w: number, l: number): Partitionable {
    node.used = true;
    node.down = { x: node.x, y: node.y + l, w: node.w, l: node.l - l, used: false };
    node.right = { x: node.x + w, y: node.y, w: node.w - w, l, used: false };
    return node;
  }
}
