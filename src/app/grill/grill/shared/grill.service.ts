import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, first } from 'rxjs/operators';
import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { MeatPiece } from './meat-piece';
import { PackerService } from 'src/app/shared/packer.service';
import { default as config } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
export class GrillService {

  private menus: BehaviorSubject<Menu[]>;

  private url: string = config.grillApiUrl;
  private colors: string[] = config.colors;
  private _grilllLength: number = config.grilllLength;
  private _grillWidth: number = config.grillWidth;

  constructor(private http: HttpClient, private _grillPacker: PackerService) {
    this.menus = new BehaviorSubject([]);

    //fetch data from the server
    this.http.get<Menu[]>(this.url)
      .pipe(
        map(data => data.map(menu => this.remapMenu(menu))),
        catchError(this.handleError<Menu[]>('fetchMenus', [])),
      ).subscribe(data => this.menus.next(data));
  }

  getMenus(): Observable<Menu[]> {
    return this.menus;
  }

  getMenu(id: number): Menu {
    return this.menus.getValue().find(x => x.id == id);
  }

  getMenuRounds(menu: Menu): MeatPiece[][] {
    this._grillPacker.reset();

    let rounds = [];
    let leftPieces = [];

    leftPieces = this.getMeatPieces(menu);

    while (leftPieces.length > 0) {
      this._grillPacker.reset();
      this._grillPacker.fit(leftPieces);
      rounds.push(leftPieces.filter(piece => piece.fit.used == true));
      leftPieces = leftPieces.filter(piece => piece.fit.used == false);
    }

    return rounds;
  }

  private remapMenu(data): Menu {
    return {
      id: parseInt(data.$id),
      menu: data.menu,
      items: data.items.map(item => this.remapItem(item))
    };
  }

  private remapItem(item): MenuItem {
    return {
      id: parseInt(item.$id),
      name: item.Name,
      length: item.Length,
      width: item.Width,
      duration: item.Duration,
      quantity: item.Quantity,
      color: this.colors[Math.floor((item.Length + item.Width) / 100 * this.colors.length)]
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private getMeatPieces(menu: Menu): MeatPiece[] {
    let menuItems = menu.items;
    let meatPieces: MeatPiece[] = [];
    for (let menuItem of menuItems) {
      this.rotateIfNeeded(menuItem);
      this.extractPieces(menuItem, meatPieces);
    }
    return meatPieces;
  }

  //The binpack algorithm will not fit items that are longer or wider than the grill,
  //so we first check if rotation will make them fit, and if yes, we rotate
  private rotateIfNeeded(menuItem: MenuItem): void {
    let itemExceedesSize = menuItem.length > this._grilllLength || menuItem.width > this._grillWidth;
    let rotatedItemFits = menuItem.length <= this._grillWidth && menuItem.width <= this._grilllLength;
    if (itemExceedesSize && rotatedItemFits) {
      this.rotateItem(menuItem);
    }
  }

  private rotateItem(menuItem: MenuItem): void {
    let w = menuItem.width;
    menuItem.width = menuItem.length;
    menuItem.length = w;
  }

  //Extracts meat pieces based on quantity
  private extractPieces(meatItem: MenuItem, meatPieces): void {
    let quantity = meatItem.quantity;
    for (let index = 0; index < quantity; index++) {
      meatPieces.push({
        'id': meatItem.id,
        'name': meatItem.name,
        'width': meatItem.width,
        'length': meatItem.length,
        'color': meatItem.color,
        'fit': { x: null, y: null, used: false }
      });
    }
  }

}
