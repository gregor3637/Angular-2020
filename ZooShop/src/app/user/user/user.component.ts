import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userData: {
    name: string,
    age: number,
    lastLogin: Date,
    description?: string,
  } = {
      name: 'gosho',
      age: 33,
      lastLogin: new Date(),
      description: 'n.a',
    };


  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }


  onEditHandler() {

  }

  get profileImage() {
    return this.sanitizer.bypassSecurityTrustStyle(`../../../assets/unknown.png`);
  }
  getProfileImageUrl() {
    return `../../../assets/unknown.png`
  }
}
