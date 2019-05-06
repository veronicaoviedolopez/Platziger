import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RequestsComponent } from './requests/requests.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestsComponent,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ImageCropperModule,
    NgbModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RequestComponent]
})
export class AppModule { }
