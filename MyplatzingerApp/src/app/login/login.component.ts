import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

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
              private userService: UserService) {
  }
  ngOnInit() {
  }
  login() {
    this.authenticateService.loginWithEmail(this.email, this.password)
    .then(data => {
      alert('logeado correctamente');
      console.log(data);
    })
    .catch(error => {
      alert('ocurrio un error al logear');
      console.log(error);
    });
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
      .then(result => {
        alert('registado correctamente');
        console.log(result);
      })
      .catch(error2 => {
        alert('ocurrio un error al registrar');
        console.log(error2);
      });
    })
    .catch(error => {
      alert('ocurrio un error al registrar');
      console.log(error);
    });
  }
  loginWithFacebook() {
    this.authenticateService.loginWithFacebook()
    .then(data => {
      alert('registado correctamente con facebook');
      console.log(data);
    })
    .catch(error => {
      alert('ocurrio un error al registrar con facebook');
      console.log(error);
    });
  }
  loginWithGoogle() {
    this.authenticateService.loginWithGoogle()
    .then(data => {
      alert('registado correctamente con google');
      console.log(data);
    })
    .catch(error => {
      alert('ocurrio un error al registrar con google');
      console.log(error);
    });
  }
  logout() {
    this.authenticateService.logout()
    .then(data => {
      alert('deslogeado correctamente');
      console.log(data);
    })
    .catch(error => {
      alert('ocurrio un error al deslogear');
      console.log(error);
    });
  }
}
