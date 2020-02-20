import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  private loadingSubscription: Subscription;
  private profileChange: Subscription;
  isLoading = false;

  get profile() {
    return this.profileService.profile;
  }

  constructor(
    private profileService: ProfileService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private uiService: UIService,
  ) { }

  ngOnInit(): void {

  }

  onEditHandler() {
    this.router.navigate(['/profile/edit']);
  }

  ngAfterViewInit(): void {
    this.profileService.fetchUserData();
  }


  ngOnDestroy() {
    if (this.profileChange) {
      this.profileChange.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
