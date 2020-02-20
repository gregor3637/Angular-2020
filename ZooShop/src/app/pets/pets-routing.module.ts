import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetsComponent } from './pets/pets.component';
import { CreatePetProfileComponent } from './create-pet-profile/create-pet-profile.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: PetsComponent,
            },
            {
                path: 'create',
                component: CreatePetProfileComponent
            },
            {
                path: 'edit',
                component: EditComponent
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PetsRoutingModule { }