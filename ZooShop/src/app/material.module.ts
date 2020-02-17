import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
    ]
})

export class MaterialModule { }