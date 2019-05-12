import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation = 'login';
  email: string = null;
  password: string = null;
  nick: string = null;

  constructor(private authenticateService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
  }
  login() {
    this.authenticateService.loginWithEmail(this.email, this.password)
    .then(() => this.router.navigate(['home']))
    .catch(error => console.log(error));
  }
  register() {
    this.authenticateService.registerWithEmail(this.email, this.password)
    .then(data => {
      const user = {
        uid: data.user.uid,
        email: this.email,
        nick: this.nick
      };
      this.userService.createUser(user)
      .then(() => this.login())
      .catch(error2 => console.log(error2));
    })
    .catch(error => console.log(error));
  }
  loginWithSocialNetworks(provider: string) {
    this.authenticateService.loginWithSocialNetworks(provider)
    .then(data => {
      if (data.additionalUserInfo.isNewUser) {
        const user = {
          uid: data.user.uid,
          email: data.user.email,
          nick: data.user.displayName,
          avatar: data.user.photoURL
        };
        this.userService.createUser(user)
        .then(() => {
          this.router.navigate(['home']);
        })
        .catch(error2 => {
          alert(`ocurrio un error al registrar con ${provider}`);
          console.log(error2);
        });
      } else {
        this.router.navigate(['home']);
      }
    })
    .catch(error => console.log(error));
  }
}
