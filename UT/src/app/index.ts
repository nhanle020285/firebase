import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth';
import { FirebaseModule } from '../firebase';
import { TasksModule } from '../tasks';

import { AppComponent } from './components/app';
import { AppHeaderComponent } from './components/app-header';
import { AppStore } from './app-store';


@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent
  ],
  providers: [
    AppStore
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {useHash: false}),
    AuthModule,
    FirebaseModule,
    TasksModule
  ],
  exports:[AppComponent]
})

export class AppModule {}
