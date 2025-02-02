import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts: Contact[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      phoneNumber: '111 222 333',
      address: '1 Main St. Minneapolis',
    },
    {
      id: 2,
      firstName: 'Mary',
      lastName: 'Smith',
      phoneNumber: '111 222 555',
      address: '1 Main St. Minneapolis',
    },
  ];

  getContacts() {
    return this.contacts;
  }

  addContact(newContact: Contact) {
    this.contacts.push({
      id: this.contacts.length + 1,
      ...newContact,
    });
  }

  updateContact(updatedContact: Contact) {
    const index = this.contacts.findIndex((contact) => contact.id === updatedContact.id);
    this.contacts[index] = updatedContact;
  }

  deleteContact(id: number) {
    const index = this.contacts.findIndex((contact) => contact.id === id);
    this.contacts.splice(index, 1);
  }
}
