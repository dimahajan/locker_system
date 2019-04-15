import { Component, OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalVariableService } from '../global-variable.service';

@Component({
  selector: 'app-locker',
  templateUrl: './locker.page.html',
  styleUrls: ['./locker.page.scss'],
})
export class LockerPage implements OnInit {

  constructor(private router: Router, private http: Http, public gv : GlobalVariableService, public toastController: ToastController) { }

  ngOnInit() {
  }

}
