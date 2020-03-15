import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { GrillComponent } from './grill/grill.component';
import { MenuSelectorComponent } from './grill/menu-selector/menu-selector.component';
import { GrillOrganizerComponent } from './grill/grill-organizer/grill-organizer.component';
import { RoundSelectorComponent } from './grill/round-selector/round-selector.component';
import { ArraySortPipe } from 'src/app/shared/array-sort-by.pipe';


@NgModule({
  declarations: [
    GrillComponent,
    MenuSelectorComponent,
    GrillOrganizerComponent,
    RoundSelectorComponent,
    ArraySortPipe
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    RouterModule
  ]
})
export class GrillModule { }
