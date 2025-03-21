import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'new-contact', component: NewContactComponent },
];
