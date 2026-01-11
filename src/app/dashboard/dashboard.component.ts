import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  summary: any = {};

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getDashboard().subscribe(res => this.summary = res);
  }
}
