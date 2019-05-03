import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private db: AngularFireDatabase) { }

  createConversation(conversation) {
    return this.db.object('conversation/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }
  getConversation(uid) {
    return this.db.list('conversation/' + uid);
  }
  editConversation(conversation) {
    return this.db.object('conversation/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }
}
