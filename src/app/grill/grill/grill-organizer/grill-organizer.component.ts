import { Component, OnInit, Input } from '@angular/core';
import { default as config } from 'src/app/shared/config';


@Component({
  selector: 'app-grill-organizer',
  templateUrl: './grill-organizer.component.html',
  styleUrls: ['./grill-organizer.component.css']
})
export class GrillOrganizerComponent implements OnInit {
  @Input() public rounds;
  @Input() selectedRound: number;
  public grillWidth: number;
  public grillLength: number;
  public scale: number;
  
  constructor() { }

  ngOnInit(): void {
    this.grillWidth = config.grillWidth;
    this.grillLength = config.grilllLength;;
    this.scale = config.grillScale;;
  }
  
}
