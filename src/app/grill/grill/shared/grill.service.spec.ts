import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GrillService } from './grill.service';
import { PackerService } from 'src/app/shared/packer.service';
import { Menu } from './menu';

describe('GrillService', () => {
  let grillService: GrillService,
    httpTestingController: HttpTestingController;

  const dummyMenusInput = [
    {
      "$id": "11",
      "menu": "Menu 04",
      "items": [
        { "$id": "2", "Name": "Paprika Sausage", "Length": 6, "Width": 3, "Duration": "00:08:00", "Quantity": 2 }
      ]
    },
    {
      "$id": "4",
      "menu": "Menu 11",
      "items": [
        { "$id": "5", "Name": "Rumpsteak", "Length": 5, "Width": 7, "Duration": "00:08:00", "Quantity": 2 },
        { "$id": "6", "Name": "Paprika Sausage", "Length": 6, "Width": 3, "Duration": "00:08:00", "Quantity": 5 }
      ]
    }
  ];

  const dummyMenusOutput: Menu[] = [
    {
      "id": 11,
      "menu": "Menu 04",
      "items": [
        { "id": 2, "name": "Paprika Sausage", "length": 6, "width": 3, "duration": "00:08:00", "quantity": 2, "color": "Brown" }
      ]
    },
    {
      "id": 4,
      "menu": "Menu 11",
      "items": [
        { "id": 5, "name": "Rumpsteak", "length": 5, "width": 7, "duration": "00:08:00", "quantity": 2, "color": "CornflowerBlue" },
        { "id": 6, "name": "Paprika Sausage", "length": 6, "width": 3, "duration": "00:08:00", "quantity": 5, "color": "Brown" }
      ]
    }
  ];

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GrillService,
        PackerService
      ]
    });

    grillService = TestBed.get(GrillService);
    httpTestingController = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(grillService).toBeTruthy();
  });

  it('should retrieve menus from the API', () => {
    const request = httpTestingController.expectOne('http://isol-grillassessment.azurewebsites.net/api/GrillMenu');
    expect(request.request.method).toBe('GET');
    request.flush(dummyMenusInput);

    grillService.getMenus().subscribe(menus => {
      expect(menus.length).toBe(2);
      expect(menus).toEqual(dummyMenusOutput);
    });
  });

  it('should retrieve packed menu rounds', () => {
    grillService.getMenus().subscribe(menus => { });
    const request = httpTestingController.expectOne('http://isol-grillassessment.azurewebsites.net/api/GrillMenu');
    request.flush(dummyMenusInput);

    let menu = grillService.getMenu(11);
    expect(menu).toEqual(dummyMenusOutput[0]);
    let rounds = grillService.getMenuRounds(menu);

    let expectedRounds = [
      [
        jasmine.objectContaining({
          id: 2,
          name: "Paprika Sausage",
          width: 3,
          length: 6,
          color: "Brown",
          fit: jasmine.objectContaining({ x: 0, y: 0, w: 30, l: 20, used: true })
        }),
        jasmine.objectContaining({
          id: 2,
          name: "Paprika Sausage",
          width: 3,
          length: 6,
          color: "Brown",
          fit: jasmine.objectContaining({ x: 3, y: 0, w: 27, l: 6, used: true })
        })
      ]
    ];

    expect(rounds.length).toBe(1)
    expect(rounds).toEqual(expectedRounds);
  });

});
