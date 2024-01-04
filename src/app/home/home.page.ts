import { Component} from '@angular/core';
import { IonHeader,IonButton,IonItem, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CitasComponent } from '../citas/citas.component';
import { ConfiguracionesComponent } from '../configuraciones/configuraciones.component';
import { RouterModule,Route } from '@angular/router';
import { SqLiteService } from '../sq-lite.service';
import { CommonModule } from '@angular/common';


export class Cita
{
  constructor(public id:Number,public Frase:string,public Autor:string) {}
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader,IonButton,IonItem,IonToolbar, IonTitle, IonContent,CitasComponent,ConfiguracionesComponent,RouterModule,CommonModule],
})
export class HomePage {
  citas:Cita[] = []
  citaAle?:Cita;
  constructor(private dbService: SqLiteService) {}
  async ngOnInit() {
    await this.dbService.iniciarPlugin()
    await this.actualizar()
    await this.loadCitaAleatoria();
  }
  async loadCitaAleatoria() 
  {
    try{
      const citaAleatoria = await this.dbService.getCitaAleatoria();
      if (citaAleatoria)
      {
        this.citaAle = citaAleatoria;
      }
      else{
        console.error('No se puede cargar una cita aleatoria');
      }
    } catch(error){
      console.error('Error al cargar una cita aleatoria:',error);
    }
  }
  async ngOnDestroy()
  {
    await this.dbService.cerrarConexion();
  }
  async actualizar()
  {
    this.citas = await this.dbService.getCitas()
  }
  }
