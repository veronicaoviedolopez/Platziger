import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { RequestsService } from '../services/requests.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  user: User;
  emailInvited: string = "";
  closeResult: string;
  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
              private requestService: RequestsService,
              private modalService: NgbModal) {
    this.userService.getUsers().valueChanges().subscribe(
      (data: User[]) => {
        this.friends = data;
      },
      error => console.log(error)
    );
    this.authService.getStatus().subscribe(
      data => {
        this.userService.getUserById(data.uid).valueChanges()
        .subscribe(
          (data2: User) => {
            this.user = data2;
            if (data2.friends) {
              this.user.friends = Object.values(this.user.friends);
              console.log('userByDB', data2);
            }
          },
          (er2) => console.log(er2)
        );
      },
      error => console.log(error)
    );
  }
  ngOnInit() {
  }
  logout() {
    this.authService.logout().then(r => {
      alert('session cerrada');
      this.router.navigate(['login']);
    })
    .catch(e => console.log('eror: ', e));
  }
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      email: this.emailInvited,
      sender: this.user.uid,
      status: 'pending'
    };
    this.requestService.setRequest(request)
    .then(r => console.log('solicitud enviada!'))
    .catch(e => console.log('error al envair solcitud', e));
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
    .then(result =>  console.log(`Dismissed ${result}`),
     reason => console.log(`Dismissed ${reason}`)
    );
  }
}
