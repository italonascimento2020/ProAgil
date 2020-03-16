import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos : any;
  mostrarcampo = false;
  _filtroLista : string;
  eventosFiltrados : any = [];


public get filtroLista() : string {
  return this._filtroLista;
}


public set filtroLista(value : string) {
  this._filtroLista = value;
  this.eventosFiltrados = this.filtroLista ? this.filtrarLista(this.filtroLista): this.eventos;
}

filtrarLista(filtrarpor: string): any {
  filtrarpor = filtrarpor.toLocaleLowerCase();
  return this.eventos.filter(
    evento => evento.tema.toLocaleLowerCase().indexOf(filtrarpor) !== -1
  )
}

  constructor(private http: HttpClient) { }
 

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.http.get('https://localhost:44303/api/values').subscribe(
      response => {this.eventos = response;},
      error=> {console.log(error);}
      );
  }

  MostrarCampo(){
    this.mostrarcampo = !this.mostrarcampo;
  }

}
