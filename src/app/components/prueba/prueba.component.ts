import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.sass']
})
export class PruebaComponent implements OnInit {

  model = 1;

  constructor() { }

  ngOnInit() {
  }

}
