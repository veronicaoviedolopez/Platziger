import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) {
  }
  getUsers() {
    return this.db.list('/users');
  }
  getUserById(uid) {
    return this.db.object('/users/' + uid);
  }
  createUser(user) {
    return this.db.object('/users/' + user.uid).set(user);
  }
  editUser(user) {
    return this.db.object('/users/' + user.uid).set(user);
  }
  setAvatar(avatar: string, uid: any) {
    return this.db.object('users/' + uid + '/avatar').set(avatar);
  }
}
