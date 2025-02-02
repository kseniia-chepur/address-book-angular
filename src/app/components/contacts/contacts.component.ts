import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../interfaces/contact';
import { BlurOnClickDirective } from '../../directives/blur-on-click.directive';
import { UpdateContactComponent } from '../../dialogs/update-contact/update-contact.component';
import { DeleteContactComponent } from '../../dialogs/delete-contact/delete-contact.component';

@Component({
  selector: 'app-contacts',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    BlurOnClickDirective
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  dataSource = new MatTableDataSource<Contact>();

  columnsToDisplay = [
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'update',
    'delete',
  ];

  private contactsService = inject(ContactsService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.contacts = this.contactsService.getContacts();
    this.dataSource.data = this.contacts;
  }

  handleUpdate(contact: Contact): void {
    let dialogRef = this.dialog.open(UpdateContactComponent, {
      height: '550px',
      width: '450px',
      data: contact,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource(this.contacts);
    });
  }

  handleDelete(contact: Contact): void {
    let dialogRef = this.dialog.open(DeleteContactComponent, {
      height: '550px',
      width: '450px',
      data: contact,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource(this.contacts);
    });
  }

  updateDataSource(contactsData: Contact[]): void {
    this.dataSource.connect().next(contactsData);
  }
}
