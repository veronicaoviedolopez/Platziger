import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { UserService } from 'src/app/services/user.service';
import { RequestsService } from 'src/app/services/requests.service';
import {User} from 'src/app/interfaces/user';


export interface promptModel {
  scope: any;
  currentRequest: any;
  currentSender: User;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})

export class RequestComponent extends DialogComponent<promptModel, any> implements promptModel {
  scope: any;
  currentRequest: any;
  currentSender: User;
  shouldAdd = 'yes';
   constructor(dialogService: DialogService,
               private requestService: RequestsService,
               private userService: UserService) {
    super(dialogService);
  }
  accept() {
    if (this.shouldAdd === 'yes') {
      this.requestService.setStatusRequest(this.currentRequest, 'accepted')
      .then(r2 => {
        this.userService.addFriends(this.scope.user.uid, this.currentRequest.sender)
        .then(r => console.log('solicitud agregada'))
        .catch(error => console.log(error));
      })
      .catch(e => console.log(e));
    } else if (this.shouldAdd === 'no') {
      this.requestService.setStatusRequest(this.currentRequest, 'rejected')
      .then(r2 => console.log(r2))
      .catch(e => console.log(e));
    } else if (this.shouldAdd === 'decide_later') {
      this.requestService.setStatusRequest(this.currentRequest, 'decide_later')
      .then(r2 => console.log(r2))
      .catch(e => console.log(e));
    }
  }
}
