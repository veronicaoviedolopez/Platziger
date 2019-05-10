import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth) {
  }
  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  loginWithSocialNetworks(prov: string) {
    let provider: any;
    if (prov === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (prov === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    }
    return this.afAuth.auth.signInWithPopup(provider);
  }
  registerWithEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus() {
    return this.afAuth.authState;
  }
  logout() {
    return this.afAuth.auth.signOut();
  }
}
