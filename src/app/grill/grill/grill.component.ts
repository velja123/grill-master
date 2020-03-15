import { Component, OnInit } from '@angular/core';
import { Menu } from './shared/menu';
import { MeatPiece } from './shared/meat-piece';
import { GrillService } from './shared/grill.service';

@Component({
  selector: 'app-grill',
  templateUrl: './grill.component.html',
  styleUrls: ['./grill.component.css']
})
export class GrillComponent implements OnInit {

  public menus: Menu[];
  public rounds: MeatPiece[][] = [];
  public selectedMenuId: number;
  public selectedRound: number = 0;

  constructor(private _grillService: GrillService) {
  }

  ngOnInit(): void {
    this._grillService.getMenus().subscribe(data => this.menus = data);
  }

  onSelectMenu(id: number): void {
    this.selectedMenuId = id;
    var menu = this._grillService.getMenu(id);
    this.rounds = this._grillService.getMenuRounds(menu);
    this.selectedRound = 0;
  }

  onSelectRound($event) {
    this.selectedRound = $event;
  }

}
