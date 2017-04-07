import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './public-transport-detail.component.html',
  styleUrls: ['./public-transport.component.sass']
})
export class PublicTransportDetailComponent implements OnInit {

  category = {
    publicTransport: false,
    privateTransport: false,
    municipalTransport: false
  };

  constructor() { }

  ngOnInit() {
  }

}
