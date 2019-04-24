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
  friends: User[];
  friend: User;
  conversation: Conversation[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.friendId = activatedRoute.snapshot.params['uid'];
    this.friends = userService.getFriends();
    this.friend = this.friends.find(x => x.uid == this.friendId);
    console.log(this.friend);
  }


  ngOnInit() {
  }

}
