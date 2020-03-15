import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-round-selector',
  templateUrl: './round-selector.component.html',
  styleUrls: ['./round-selector.component.css']
})
export class RoundSelectorComponent implements OnInit {

  @Input() selectedRound: number = 0;
  @Input() totalRounds: number = 0;
  @Output() public selectedRoundEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  previousRound() {
    if (this.selectedRound > 0) {
      this.selectedRound--;
      this.selectedRoundEvent.emit(this.selectedRound);
    }
  }

  nextRound() {
    if (this.selectedRound < this.totalRounds - 1) {
      this.selectedRound++;
      this.selectedRoundEvent.emit(this.selectedRound);
    }
  }
}
