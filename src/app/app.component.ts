import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Caida libre',
      url: '/list',
      icon: 'play'
    },
    {
      title: 'Caida paracaidista',
      url: '/cuadratica',
      icon: 'jet'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router

  ) {
    this.initializeApp();
    this.backbuttonEvent();

    this.platform.ready().then(() => {
      NativeStorage.getItem('facebook_user')
      .then( data => {
        console.log('redirect to home');
        this.router.navigate(["/home"]);
        this.splashScreen.hide();
      }, err => {
        console.log('redirect to login');
      	this.router.navigate(["/login"]);
        this.splashScreen.hide();
      });

      this.statusBar.styleDefault();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  backbuttonEvent() {
    this.platform.backButton.subscribe(() => {
      console.log('Backbutton pressed');
    });
  }

  
}
