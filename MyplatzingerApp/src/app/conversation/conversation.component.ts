import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { Conversation } from '../interfaces/conversation';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  conversation: Conversation[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.friendId = activatedRoute.snapshot.params['uid'];
    this.userService.getUserById(this.friendId).valueChanges().subscribe(
      (data: User) => this.friend = data,
      error => console.log(error)
    );
  }


  ngOnInit() {
  }

}
