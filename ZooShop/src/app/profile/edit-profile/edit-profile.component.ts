import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  isLoading = false;
  selectedFile: File = null;

  get userData(): Profile {
    return this.userProfileService.profile;
  }

  constructor(
    private userProfileService: ProfileService,
    private http: HttpClient
  ) { }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  updateProfile(form: NgForm) {
    this.userProfileService.edit({
      name: form.value.name,
      description: form.value.description,
      age: +form.value.age,
    });
  }

  onUpload() {
    let storageRef = firebase.storage().ref();
    let imagesRef = storageRef.child('images/' + this.selectedFile.name);
    let task = imagesRef.put(this.selectedFile);

    task.on('state_changed',

      function progress(snapshot) {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percentage);
      },

      function error(err) {
        console.log(err);
      },

      function complete() {
        console.log('upload Completed completed');
      }

    );
  }

  ngOnInit(): void {
  }

}
