import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonHeader,IonButton,IonItem, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CitasComponent } from '../citas/citas.component';
import { ConfiguracionesComponent } from '../configuraciones/configuraciones.component';
import { RouterModule,Route } from '@angular/router';
import { SqLiteService } from '../service/sq-lite.service';
import {SQLiteChanges, defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader'
import { CommonModule } from '@angular/common';
import { CitasSvcService } from '../service/citas-svc.service';
import { Preferences } from '@capacitor/preferences';


export interface Cita
{
  id?:number
  Frase:string
  Autor:string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader,IonButton,IonItem,IonToolbar, IonTitle, IonContent,CitasComponent,ConfiguracionesComponent,RouterModule,CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit{
  citas:Cita[] = []
  citaAleatoria:Cita | null = null;
  mostrarCitas:boolean = true; 
  constructor(private citasSvcService: CitasSvcService) {}

  ngOnInit() 
  {
    this.cargarCitas();
  }
  cargarCitas(){
    this.citas = this.citasSvcService.getCitas();
    if (this.citas && this.citas.length > 0) {
      this.obtenerCitaAleatoria();
    }
  }
  obtenerCitaAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * this.citas.length);
    this.citaAleatoria = this.citas[indiceAleatorio];
  }
  async cargarConfiguracion(){
    const configStr: string|null = (await Preferences.get({key: 'configuraciones'})).value;
    if(configStr){
      const config = JSON.parse(configStr);
      this.mostrarCitas = !config.citasInicio;
    }
  }
  }
