import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() jsonData: any[];
  headers = [];

  ngOnInit() {
    if (this.jsonData && this.jsonData.length > 0) {
      this.headers = Object.keys(this.jsonData[0]);
    }
  }
  ngOnChanges() {
    this.ngOnInit();
  }
}
