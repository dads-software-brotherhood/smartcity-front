import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './public-transport-detail.component.html',
  styleUrls: ['./public-transport-detail.component.sass']
})
export class PublicTransportDetailComponent implements OnInit {

  dateModified;
  dateCreated;

  constructor() { }

  ngOnInit() {
  }

}
