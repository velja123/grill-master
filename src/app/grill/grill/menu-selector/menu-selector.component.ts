import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Menu } from '../shared/menu';

@Component({
  selector: 'app-menu-selector',
  templateUrl: './menu-selector.component.html',
  styleUrls: ['./menu-selector.component.css']
})
export class MenuSelectorComponent implements OnInit {

  @Input() public menus: Menu[];
  @Output() public selectedMenuEvent = new EventEmitter();
  public selectedMenuId: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectMenuEvent(): void {
    this.selectedMenuEvent.emit(this.selectedMenuId);
  }

}
