import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor(private http: HttpClient) { }

  
  private cloudName = 'dy2qswvww';
  private uploadPreset = 'jobzoo'; 
  private uploadUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;



  uploadImage(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post(this.uploadUrl, formData);
  }

  

}
