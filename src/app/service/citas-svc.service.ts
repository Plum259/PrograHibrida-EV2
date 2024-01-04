import { Injectable } from '@angular/core';
import { Cita } from '../home/home.page';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { DBSQLiteValues } from '@capacitor-community/sqlite';
@Injectable({
  providedIn: 'root'
})
export class CitasSvcService {
  sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  plataforma:string = ""
  DB_NAME:string = "lista_citas";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  COL_FRASE:string = "frase"
  COL_AUTOR:string = "autor"
  DB_SQL_TABLAS: string = `
      CREATE TABLE IF NOT EXISTS lista_citas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ${this.COL_FRASE} TEXT NOT NULL,
        ${this.COL_AUTOR} TEXT NOT NULL
      );
  `;
  db!:SQLiteDBConnection;
  private listaCitas: Cita[] = [{id:0,Frase:"El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.",Autor:"Ralph Waldo Emerson"},
                                {id:1,Frase:"Las personas no son recordadas por el numero de veces que fracasan, sino por el numero de veces que tienen éxito.",Autor:"Thomas Edison"},
                                {id:2,Frase:"Ningún viento es bueno para el barco que no sabe adonde va.",Autor:"Séneca"}]
  private uId: number = 1;
  constructor() { }
  private async _iniciarPluginWeb(): Promise<void>{
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if (jeepSqliteEl != null){
      await this.sqlite.initWebStore()
    }
  }
  async iniciarPlugin(){
    this.plataforma = Capacitor.getPlatform()
    if (this.plataforma == "web"){
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)

    await this.agregarCita({Frase:"Frase de Testeo",Autor:"Tester"})
  }
  async abrirConexion(){
    const ret = await this.sqlite.checkConnectionsConsistency() 
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if(ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
  }
  await this.db.open()
}
async cerrarConexion(){
  this.db.close()
  console.log('DB CLOSED')
}
agregarCita(nuevaCita: Cita): void {
  nuevaCita.id = this.uId++
  this.listaCitas.push(nuevaCita);
}
getCitas():Cita[] {
  return this.listaCitas;
}
async updateCita(cita:Cita)
  {
    const sql = `UPDATE lista_citas SET ${this.COL_FRASE} = ?, ${this.COL_AUTOR} = ?, WHERE id = ?`;
    await this.db.run(sql,[cita.Frase,cita.Autor, cita.id]);
  }
deleteCita(id: number): void {
    this.listaCitas = this.listaCitas.filter(cita => cita.id !== id);
  }
  async getCitaAleatoria():Promise<Cita | undefined>{
    const citas = await this.getCitas();
    const randomIndex = Math.floor(Math.random()*citas.length);
    return citas[randomIndex];
  }
  resetUId(){
    this.uId = 0
  }
}


