import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage  } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private firebaseStorage: AngularFireStorage) {
                this.authService.getStatus().subscribe(
                  r => {
                    if ( r != null) {
                      this.userService.getUserById(r.uid).valueChanges().subscribe(
                        (r2: User) => this.user = r2,
                        error2 => console.log(error2)
                      );
                    }
                  },
                  e => e
                );
  }
  ngOnInit() {
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  async saveSettings() {
    if (this.croppedImage) {
      const currentAvatarId = Date.now();
      await this.firebaseStorage.ref(`pictures/${currentAvatarId}.jpg`).putString(this.croppedImage, 'data_url')
              .then(res => {
                  (this.firebaseStorage.ref(`pictures/${currentAvatarId}.jpg`).getDownloadURL())
                  .subscribe(p => {
                    this.userService.setAvatar(p, this.user.uid).then(i => {
                      console.log('avatar cargado', i);
                      this.imageChangedEvent = '';
                      this.croppedImage = '';
                      }
                    ).catch(j => console.log(j));
                  });
              })
              .catch(ea => console.log('error al cargar avatar', ea));
    }
    this.userService.editUser(this.user)
    .then(result =>  console.log('usuario actualizado', this.user))
    .catch(e => console.log('error al cargar usuario', e));
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
}
