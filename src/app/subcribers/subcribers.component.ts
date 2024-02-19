import { Component, OnInit } from '@angular/core';
import { SubcribersService } from '../services/subcribers.service';

@Component({
  selector: 'app-subcribers',
  templateUrl: './subcribers.component.html',
  styleUrls: ['./subcribers.component.css'],
})
export class SubcribersComponent implements OnInit {
  subcribersArray: Array<any>;

  constructor(private subservice: SubcribersService) {}
  ngOnInit(): void {
    this.subservice.loadData().subscribe((val) => {
      this.subcribersArray = val;
    });
  }

  onDelete(id: any) {
    this.subservice.deleteData(id);
  }
}
