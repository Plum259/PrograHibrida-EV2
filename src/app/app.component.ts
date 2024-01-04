import { Component,NgModule } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ReactiveFormsModule,Validators } from '@angular/forms';
import {SQLiteChanges, defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader'
import { CommonModule } from '@angular/common';
import { Device } from '@capacitor/device';
import { HttpClientModule } from '@angular/common/http';
import { SqLiteService } from './sq-lite.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,CommonModule,HttpClientModule],
})
export class AppComponent {
  constructor(private sqliteService: SqLiteService) {
    this.initApp();
  }
  initApp()
  {
    this.sqliteService.iniciarPlugin().then(() => {
      console.log('Database ready!');
    }).catch((error) => {
      console.error('Error initializing database',error)
    });
  }
}

@NgModule({
  imports:
  [RouterModule.forRoot(routes),ReactiveFormsModule], exports:[RouterModule],
})
export  class AppModule{}