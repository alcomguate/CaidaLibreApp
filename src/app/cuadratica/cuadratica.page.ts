import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-cuadratica',
  templateUrl: './cuadratica.page.html',
  styleUrls: ['./cuadratica.page.scss'],
})
export class CuadraticaPage implements OnInit {

  private masa: any;
  private gravedad = 9.8;
  private alturaActual = 0;
  private densidad = 1.29;
  private coeficienteForma = 0.8;
  private altura: any;
  private velocidad: any;
  private tiempo: any;
  private area: any;
  private alturaInicioParaCaidista: any;
  private velocidadInicioParacaidas: any;
  private tiempoInicioParacaidas: any;
  private paracaidasAbierto: boolean = false;
  private velocidadLimite: any;

  constructor() { }

  ngOnInit() {
  }

  async ngSaltar() {
    console.log(this.altura);
    this.paracaidasAbierto = false;
    this.tiempo = 0;
    this.alturaActual = this.altura;
    while (this.alturaActual > 0 && !this.paracaidasAbierto) {
      this.alturaActual = Math.round(this.altura - (this.gravedad * (this.tiempo * this.tiempo)) / 2);
      this.velocidad = Math.round(this.gravedad * this.tiempo);
      console.log(this.velocidad);
      this.tiempo = Math.round(this.tiempo + 1);
      if (this.alturaActual <= 0) {
        this.alturaActual = 0;
      }
      await this.delay(999);
    }
  }

  async ngAbrirParacaidas() {
    this.paracaidasAbierto = true;
    let k = (this.densidad * this.area * this.coeficienteForma) / 2;
    this.velocidadLimite = Math.sqrt((this.masa * this.gravedad) / k);
    this.alturaInicioParaCaidista = this.alturaActual;
    this.velocidadInicioParacaidas = this.velocidad;
    this.tiempoInicioParacaidas = this.tiempo;
    this.alturaInicioParaCaidista = this.alturaActual;
    while (this.alturaActual > 0) {
      this.ngVelocidadPorTiempo(this.tiempo);
      this.tiempo = this.tiempo + 1;
      await this.delay(999);
      if (this.alturaActual <= 0) {
        this.alturaActual = 0;
      }
    }
  }

  async ngVelocidadPorTiempo(tiempo: any) {
    let difVelocidad = this.velocidadInicioParacaidas - this.velocidadLimite;
    let addVelocidad = this.velocidadInicioParacaidas + this.velocidadLimite;

    let coeficiente = (this.gravedad / this.velocidadLimite) * (tiempo - this.tiempoInicioParacaidas);
    this.velocidad = (((difVelocidad) * Math.exp(coeficiente) + (addVelocidad) * Math.exp(coeficiente * -1))
      / ((difVelocidad) * Math.exp(coeficiente) - (addVelocidad) * Math.exp(coeficiente * -1))) * (this.velocidadLimite * -1);

    await this.ngPosicionPorVelocidad(this.velocidad);
  }

  async ngPosicionPorVelocidad(velocidad: any) {
    let velocidadLimiteCuad = (this.velocidadLimite * this.velocidadLimite);
    let velocidadCuad = (velocidad * velocidad);
    let velocidadInicialCuad = (this.velocidadInicioParacaidas * this.velocidadInicioParacaidas);
    let factor = (velocidadCuad - velocidadLimiteCuad) / (velocidadInicialCuad - velocidadLimiteCuad);
    console.log(factor);
    if (factor != 1) {
      this.alturaActual = (((velocidadLimiteCuad) / (2 * this.gravedad)) * Math.log(factor)) + this.alturaInicioParaCaidista;
    }      

  }

  

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
