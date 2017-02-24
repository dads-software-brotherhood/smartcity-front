import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.sass']
})
export class PruebaComponent implements OnInit {

  model = 1;

  constructor() { }

  ngOnInit() {
    console.log($);
  }

}
