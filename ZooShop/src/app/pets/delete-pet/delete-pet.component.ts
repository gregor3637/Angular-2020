import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.scss']
})
export class DeletePetComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}
