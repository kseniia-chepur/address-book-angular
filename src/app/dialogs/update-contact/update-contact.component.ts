import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Contact } from '../../interfaces/contact';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ContactsService } from '../../services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-contact',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.scss',
})
export class UpdateContactComponent {
  private dialogRef = inject(MatDialogRef<UpdateContactComponent>);
  private data = inject<Contact>(MAT_DIALOG_DATA);
  private contactsService = inject(ContactsService);

  selectedContact: Contact = this.data;

  updateForm = new FormGroup({
    firstName: new FormControl(this.selectedContact.firstName, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    lastName: new FormControl(this.selectedContact.lastName, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    phoneNumber: new FormControl(this.selectedContact.phoneNumber, [
      Validators.required,
      Validators.maxLength(15),
    ]),
    address: new FormControl(this.selectedContact.address, [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  onSubmit() {
    this.selectedContact = {
      id: this.selectedContact.id,
      firstName: this.updateForm.controls['firstName'].value as string,
      lastName: this.updateForm.controls['lastName'].value as string,
      phoneNumber: this.updateForm.controls['phoneNumber'].value as string,
      address: this.updateForm.controls['address'].value as string,
    };
    this.contactsService.updateContact(this.selectedContact);

    this.dialogRef.close();
  }
}
