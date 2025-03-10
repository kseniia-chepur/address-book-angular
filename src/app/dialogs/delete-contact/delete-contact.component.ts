import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../interfaces/contact';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-contact',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './delete-contact.component.html',
  styleUrl: './delete-contact.component.scss',
})
export class DeleteContactComponent {
  private data = inject<Contact>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<DeleteContactComponent>);
  private contactsService = inject(ContactsService);

  selectedContact: Contact = this.data;

  deleteForm = new FormGroup({
    firstName: new FormControl({ value: this.selectedContact.firstName, disabled: true }),
    lastName: new FormControl({ value: this.selectedContact.lastName, disabled: true }),
    phoneNumber: new FormControl({ value: this.selectedContact.phoneNumber, disabled: true }),
    address: new FormControl({ value: this.selectedContact.address, disabled: true }),
  });

  onSubmit() {
    this.contactsService.deleteContact(this.selectedContact.id!);

    this.dialogRef.close();
  }
}
