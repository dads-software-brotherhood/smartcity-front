import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../../../../../core/services/login/login.service';
import { PublicTransportService } from '../../../../../../core/services/public-transport/public-transport.service';

import { PublicTransport } from '../../../../../../core/models/public-transport';

@Component({
  selector: 'app-public-transport-manager',
  templateUrl: './public-transport-manager.component.html',
  styleUrls: ['./public-transport-manager.component.sass']
})
export class PublicTransportManagerComponent implements OnInit {

  publicTransports: Array<PublicTransport>;

  userId: string;
  userSA: boolean;

  idDelete: string;
  removeReason: string;

  showDialog = false;
  showConfirmDialog = false;
  showErrorDialog = false;
  messageModal: string;

  constructor(private loginService: LoginService, private publicTransportService: PublicTransportService) { }

  ngOnInit() {
    try {
      this.publicTransportService.getAll().subscribe(
        publicTransports => this.publicTransports = publicTransports
      );
    } catch (e) {
      console.error('Error at retrieve data');
      console.error(e);
    }

    this.userId = this.loginService.getLoggedUser().id;
    this.userSA = this.loginService.isSA();
  }

  onPreDelete(id: string) {
    this.idDelete = id;
    this.showConfirmMessage('Are you sure you want to delete this transport?');
  }

  onDelete() {
    this.showConfirmDialog = false;

    try {
      this.publicTransportService.delete(this.idDelete, this.removeReason).subscribe(
        res => {
          this.deleteFromList(this.idDelete);
          this.showMessage('The information was successfully deleted');
        }
      );
    } catch (e) {
      console.error('Error at delete');
      console.error(e);

      this.showErrorMessage('There was a communication error, please try later.');
    }
  }

  private deleteFromList(id: string) {
    const index = this.indexOfId(id);

    if (index !== -1) {
      this.publicTransports.splice(index, 1);

      this.deleteFromList(id); // If we duplicated records
    }

  }

  private indexOfId(id: string): number {
    for (let i = 0; i < this.publicTransports.length; i++) {
      if (this.publicTransports[i].id === id) {
        return i;
      }
    }

    return -1;
  }

  disableLink(creatorId: string): boolean {
    return !creatorId || ( this.userId !== creatorId && this.userSA === false );
  }

  private showMessage(message: string) {
    this.messageModal = message;
    this.showDialog = true;
  }

  private showConfirmMessage(message: string) {
    this.messageModal = message;
    this.showConfirmDialog = true;
  }

  private showErrorMessage(message: string) {
    this.messageModal = message;
    this.showErrorDialog = true;
  }
}
