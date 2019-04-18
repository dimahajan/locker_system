import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { IonicModule } from '@ionic/angular';

import { AssignPage } from './assign.page';

const routes: Routes = [
    {
        path: '',
        component: AssignPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BsDatepickerModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    declarations: [AssignPage]
})
export class AssignPageModule {}
