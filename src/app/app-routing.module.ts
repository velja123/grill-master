import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrillComponent } from './grill/grill/grill.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "grill", component: GrillComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
