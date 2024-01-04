import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

export interface configuraciones{
  citasInicio:boolean
}

@Component({
  selector: 'app-configuraciones',
  standalone: true,
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss'],
  imports: [RouterModule,IonicModule,FormsModule],
})
export class ConfiguracionesComponent  implements OnInit {
  private defaultConfig:configuraciones = {
    citasInicio:false
  }
  config:configuraciones = this.defaultConfig
  constructor() { }

  async ngOnInit() 
  {
    const configStr:string|null = (await Preferences.get({key: 'configuraciones'})).value
    this.config = configStr != null ? JSON.parse(configStr):this.defaultConfig
  }
  async onChange()
  {
    await Preferences.set({
      key: 'configuraciones',
      value: JSON.stringify(this.config)
    })
  }

}
