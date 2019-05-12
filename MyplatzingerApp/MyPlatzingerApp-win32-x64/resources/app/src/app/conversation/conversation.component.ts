import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any;
  friend: User;
  conversations: any[];
  user: User;
  conversationId: string;
  textMessage: string;
  shake: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authService: AuthenticationService,
    private firebaseStorage: AngularFireStorage) {
    this.friendId = activatedRoute.snapshot.params['uid'];
    this.authService.getStatus().subscribe(
      (s) => this.userService.getUserById(s.uid).valueChanges().subscribe(
        (user: User) => {
          this.user = user;
          this.userService.getUserById(this.friendId).valueChanges().subscribe(
            (data: User) => {
              this.friend = data;
              const ids = [this.user.uid, this.friend.uid].sort();
              this.conversationId = ids.join('|');
              this.getConversation();
            },
            error => console.log(error)
          );
        },
        error => console.log(error)),
      error2 => console.log(error2)
    ) ;
  }
  ngOnInit() {
  }
  async sendMessage() {
    const message = {
      uid: this.conversationId ,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text'
    };
    this.conversationService.createConversation(message)
    .then(() => this.textMessage = '')
    .catch(error => console.log(error));
  }

  sendZumbido() {
    const message = {
      uid: this.conversationId ,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido'
    };
    this.conversationService.createConversation(message)
    .then()
    .catch(error => console.log(error));
    this.doZumbido();
  }
  doZumbido() {
   const audio = new Audio('assets/sound/zumbido.m4a');
   audio.play();
   this.shake = true;
   setTimeout(() => {
    this.shake = false;
    }, 1000);
  }

  getConversation() {
     this.conversationService.getConversation(this.conversationId).valueChanges().subscribe(
       ((r) => {
         this.conversations = r;
         this.conversations.forEach(m => {
           if (!m.seen && (m.receiver ===  this.user.uid)) {
            m.seen = true;
            this.conversationService.editConversation(m);
            if (m.type === 'text' || m.type === 'image') {
              this.doNewMessage();
            } else if (m.type === 'zumbido') {
              this.doZumbido(); }
         }});
        }
      ),
      (error => console.log(error))
     ) ;
  }
  private doNewMessage() {
    const audio = new Audio('assets/sound/new_message.m4a');
    audio.play();
  }

  getNickById(uid) {
    return this.user.uid === uid ? this.user.nick : this.friend.nick;
  }
  getAvatarById(uid) {
    return this.user.uid === uid ? this.user.avatar : this.friend.avatar;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  async sendImage() {
    const message = {
      uid: this.conversationId ,
      timestamp: Date.now(),
      text: null,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'image',
      image: null
    };
    const currentAvatarId = Date.now();
    await this.firebaseStorage.ref(`pictures/${currentAvatarId}.jpg`).putString(this.croppedImage, 'data_url')
      .then(res => {
        (this.firebaseStorage.ref(`pictures/${currentAvatarId}.jpg`).getDownloadURL())
          .subscribe(p => {
            message.image = p;
            this.conversationService.createConversation(message)
              .then(() => {
                this.imageChangedEvent = '';
                this.croppedImage = '';
                this.getConversation();
              })
              .catch(error => console.log(error));
          });
        })
      .catch(ea => console.log('error al cargar avatar', ea));
  }
}
