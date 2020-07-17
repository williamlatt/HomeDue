import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CavansComponent } from './components/cavans/cavans.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { httpInterceptorProviders } from './interceptors';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
 
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      IonicStorageModule.forRoot({
        name: 'mydues__db',
        driverOrder: ['indexeddb', 'sqlite', 'websql']}),
    ],
  providers: [
    StatusBar,
    SplashScreen,
    httpInterceptorProviders,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    FilePath
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
