import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private db: AngularFireDatabase) { }
  setRequest(r) {
    return this.db.object('requests/' + (r.email.replace('.' , ',')) + '/' + r.sender).set(r);
  }
  getRequestsByEmail(email) {
    return this.db.list('requests/' + email.replace('.' , ','));
  }
  setStatusRequest(r, status){
    return this.db.object('requests/' + r.email.replace('.' , ',') + '/' + r.sender + '/status').set(status);
  }

}
