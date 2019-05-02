import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { IonicModule } from '@ionic/angular';

import { LockerPage } from './locker.page';

const routes: Routes = [
    {
        path: '',
        component: LockerPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DragulaModule,
        BsDatepickerModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    declarations: [LockerPage]
})
export class LockerPageModule {}
