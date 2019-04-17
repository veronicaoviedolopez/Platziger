import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  constructor(private userService: UserService) {
    /* primitives types
    let c: number = 1;
    let b: number = 2;
    let e:string='1';
    let f:string='2';
    console.log(c+b, e+f);

    let g:boolean = true;
    let h:object={};
    console.log(g);
    console.log(h);

    let i=[c,b,e,f,g,h];
    console.log(i);
    */
   this.friends = userService.getFriends();
   }

  ngOnInit() {
  }

}
