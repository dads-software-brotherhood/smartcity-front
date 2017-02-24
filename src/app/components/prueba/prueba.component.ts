import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}
