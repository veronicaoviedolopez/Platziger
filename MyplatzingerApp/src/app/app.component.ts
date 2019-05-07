import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { RequestsService } from './services/requests.service';
import { User } from './interfaces/user';
import { DialogService } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Platzinger';
  user: User;
  requests: any[] = [];
  mailsShown: any[] = [];
  constructor(public router: Router,
              private authService: AuthenticationService,
              private userService: UserService,
              private requestService: RequestsService,
              private dialogService: DialogService
    ) {
      this.authService.getStatus().subscribe(
        n => this.userService.getUserById(n.uid).valueChanges().subscribe(
          (n2: User) => {
            if (n2 == null) {
              return;
            }
            this.user = n2;
            this.requestService.getRequestsByEmail(n2.email).valueChanges().subscribe(
              (n3: any) => {
                this.requests = n3;
                this.requests = this.requests.filter(x => x.status !== 'rejected' && x.status !== 'accepted');
                this.requests.forEach(e => {
                  if (this.mailsShown.indexOf(e.sender) === -1 ) {
                      this.mailsShown.push(e.sender);
                      this.userService.getUserById(e.sender).valueChanges().subscribe(
                        (n4: User) => this.dialogService.addDialog(RequestComponent, {scope: this, currentRequest: e, currentSender: n4})
                      );
                  }
                });
              } ,
              e3 => console.log(e3)
            )
          } ,
          e2 => console.log(e2)
        ),
        e => console.log(e)
        );
  }
}

