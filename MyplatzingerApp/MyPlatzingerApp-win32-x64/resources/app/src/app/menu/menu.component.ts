import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authenticateService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.authenticateService.logout()
    .then(() => this.router.navigate(['login']))
    .catch(error => console.log(error));
  }
}
