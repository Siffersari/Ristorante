import { DishdetailComponent } from './../dishdetail/dishdetail.component';
import { Routes } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'dishdetail/:id', component: DishdetailComponent },
  { path: 'contactus', component: ContactComponent },
  { path: 'aboutus', component: AboutComponent },
];
