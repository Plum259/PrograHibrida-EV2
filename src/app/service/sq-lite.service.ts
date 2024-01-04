import { Injectable } from '@angular/core';
import {CapacitorSQLite,JsonSQLite,SQLiteConnection,SQLiteDBConnection} from '@capacitor-community/sqlite';
import { Preferences } from '@capacitor/preferences';
import { Cita } from '../home/home.page';
import { Platform } from '@ionic/angular';

export interface ListadoCitas {
  id?: number
  Frase: string
  Autor: string
}

@Injectable({
  providedIn: 'root'
})
export class SqLiteService {
  private sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  private db!: SQLiteDBConnection
  constructor(private platform:Platform) 
  {
    this.sqlite = new SQLiteConnection(CapacitorSQLite)
  }
}
