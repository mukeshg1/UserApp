import { Component, OnInit } from '@angular/core';
import { FormdataService } from '../../services/formdata.service';

@Component({
  selector: 'app-user-count',
  templateUrl: './user-count.component.html',
  styleUrls: ['./user-count.component.css']
})
export class UserCountComponent implements OnInit {
  countd: number = 2;
  

  constructor( private ts:FormdataService) { }

  ngOnInit() {
    this.ts.getCountSubject.subscribe(
      count => this.countd = count)
  }
}
