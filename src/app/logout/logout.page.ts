import { Component, OnInit } from '@angular/core';
import { GlobalVariableService } from '../global-variable.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.page.html',
    styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

    constructor(public gv: GlobalVariableService, private router: Router) { }

    ngOnInit() {
        this.gv.user = null;
        this.router.navigateByUrl('/login');
    }

}
