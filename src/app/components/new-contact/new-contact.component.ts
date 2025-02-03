import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../interfaces/contact';

@Component({
  selector: 'app-new-contact',
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.scss',
})
export class NewContactComponent {
  private newContact!: Contact;

  contactForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  private router = inject(Router);
  private contactsService = inject(ContactsService);

  onSubmit() {
    this.newContact = {
      firstName: this.contactForm.controls['firstName'].value as string,
      lastName: this.contactForm.controls['lastName'].value as string,
      phoneNumber: this.contactForm.controls['phoneNumber'].value as string,
      address: this.contactForm.controls['address'].value as string,
    };
    this.contactsService.addContact(this.newContact);

    this.router.navigate(['/contacts']);
  }

  handleCancel() {
    this.router.navigate(['/contacts']);
  }
}
