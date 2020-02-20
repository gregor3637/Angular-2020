import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  get userData(): Profile {
    return this.userProfileService.profile;
  }
  isLoading = false;

  constructor(
    private userProfileService: ProfileService,
  ) { }



  updateProfile(form: NgForm) {
    this.userProfileService.edit({
      name: form.value.name,
      description: form.value.description,
      age: +form.value.age,
    });
  }

  ngOnInit(): void {
  }

}
