import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { URL } from './../constants';


interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

 //image to be displayed in template
 image;
 imageData;
 gnic;
 public photos: Photo[] = [];

constructor(private camera: Camera,
        private http: HttpClient) { }
 

  
  upload(){
    let  url = URL.UPLOAD;
    const date = new Date().valueOf();

    // Replace extension according to your media typ
    const imageName = date+ '.jpeg';
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(this.imageData);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' })
    return imageBlob;
    /*let  postData = new FormData();
    postData.append('file', imageFile);

    let data:Observable<any> = this.http.post(url,postData);
    data.subscribe((result) => {
      console.log(result);
    });*/
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
   const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
     }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
   return blob;
  }
}
