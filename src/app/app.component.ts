import { Component,NgModule,OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ReactiveFormsModule,Validators } from '@angular/forms';
import {SQLiteChanges, defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader'
import { CommonModule } from '@angular/common';
import { Device } from '@capacitor/device';
import { HttpClientModule } from '@angular/common/http';
import { SqLiteService } from './service/sq-lite.service';
import { Cita } from './home/home.page';
import { CitasSvcService } from './service/citas-svc.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,CommonModule,HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit{
  listaCitas:Cita[] = []
  constructor(private citassvcService:CitasSvcService) {
  }
  async ngOnInit(){
    await this.citassvcService.iniciarPlugin()
    await this._actualizar()
  }
  async _actualizar(){
    this.listaCitas = await this.citassvcService.getCitas()
  }
  async onCreateProduct($event:string){
    const cita:Cita = {Frase: $event,Autor:$event}
    await this.citassvcService.agregarCita(cita)
    await this._actualizar()
  }
  }
@NgModule({
  imports:
  [RouterModule.forRoot(routes),ReactiveFormsModule], exports:[RouterModule],
})
export  class AppModule{}