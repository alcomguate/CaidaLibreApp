import { Component, OnInit } from '@angular/core';

import { datoCalculado } from '../datoCalculado';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private gravedad = 9.8;
  private altura: any;
  private datos: Array<datoCalculado> = [];

  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {

  }

  ngOnInit() {
  }

  ngCalcular() {
    console.log(this.altura);
    this.datos = [];
    let tiempo = 0;
    let alturaActual = this.altura;
    let velocidadActual = 0;
    while (alturaActual > 0) {
      alturaActual = this.altura - (this.gravedad * (tiempo * tiempo))/2;
      velocidadActual = this.gravedad * tiempo;

      if ( alturaActual > 0 ) {
        let data = new datoCalculado();
        data.altura = alturaActual;
        data.tiempo = tiempo;
        data.velocidad = velocidadActual;
        this.datos.push(data);
      }
      tiempo = tiempo + 1;
    }
  }
}
