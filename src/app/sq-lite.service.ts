import { Injectable } from '@angular/core';
import {CapacitorSQLite,JsonSQLite,SQLiteConnection,SQLiteDBConnection} from '@capacitor-community/sqlite';
import { Preferences } from '@capacitor/preferences';
import { Cita } from './home/home.page';
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

  async iniciarPlugin(){
    try{
      await this.platform.ready();
      await this.sqlite.initWebStore();
      this.db = await this.sqlite.createConnection(
        "citas.sqlite",false,'no-encryption',1,false)
      await this.db.open();
      console.log('DB opened successfully');
      const schema = `
          CREATE TABLE IF NOT EXISTS citas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Frase TEXT NOT NULL,
            Autor TEXT NOT NULL
          );`
      await this.db.execute(schema);
    }   catch (error) {
      console.error('Error during SQLite initialization',error);
    }
  }

  async cerrarConexion(){
    this.db.close()
  }
  async addCita(cita:Cita)
  {
    const sql = `INSERT INTO citas(Frase,Autor) VALUES(?,?)`;
    await this.db.run(sql,[cita.Frase,cita.Autor]);
  }
  async updateCita(cita:Cita)
  {
    const sql = `UPDATE citas SET Frase = ?, Autor = ?, WHERE id = ?`;
    await this.db.run(sql,[cita.Frase,cita.Autor]);
  }
  async deleteCita(id:number)
  {
    const sql = `DELETE FROM citas WHERE id = ?`;
    await this.db.run(sql,[id]);
  }
  async getCitas():Promise<Cita[]>
  {
    const sql = `SELECT * FROM citas`;
    const result = await this.db.query(sql);
    let citas: Cita[] = [];
    if (result.values && result.values.length > 0)
    {
      for (let i = 0; i < result.values.length; i++)
      {
        citas.push(new Cita(result.values[i].id,
          result.values[i].Frase,
          result.values[i].Autor));
      }
    }
    return citas;
  }
  async getCitaAleatoria(): Promise<Cita | undefined> {
    const sql = `SELECT * FROM citas ORDER BY RANDOM() LIMIT 1`;
    const result = await this.db.query(sql);
    if (result.values && result.values.length > 0) {
      const item = result.values[0];
      return new Cita(item.id, item.Frase, item.Autor);
    }
    return undefined;
  }
}
