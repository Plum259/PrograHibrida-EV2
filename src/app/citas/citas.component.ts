import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormGroup,FormControl,Validators,ReactiveFormsModule } from '@angular/forms';
import { Cita } from '../home/home.page';
import { Subject,from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SqLiteService } from '../service/sq-lite.service';
import { takeUntil } from 'rxjs/operators';
import { CitasSvcService } from '../service/citas-svc.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
  imports:[RouterModule,IonicModule,ReactiveFormsModule,CommonModule]
})
export class CitasComponent  implements OnInit,OnDestroy {
  citaForm: FormGroup;
  listaCitas: Cita[] = [];
  private unsubscribe = new Subject<void>();

  constructor(private citasSvcService:CitasSvcService) {
    this.citaForm = new FormGroup({
      Frase: new FormControl('', [Validators.required, Validators.minLength(5)]),
      Autor: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }
  async ngOnInit() 
  {
    await this.cargarCitas()
  }
  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  async cargarCitas()
  {
    this.listaCitas = await this.citasSvcService.getCitas();
  }
  onSubmit() {
    if (this.citaForm.valid) {
      const nuevaCita: Cita = {
        Frase: this.citaForm.get('Frase')?.value,
        Autor: this.citaForm.get('Autor')?.value,
      };
      this.citasSvcService.agregarCita(nuevaCita);
      this.cargarCitas();
      this.citaForm.reset();
    }
  }
  async eliminarCita(id: number) {
    await this.citasSvcService.deleteCita(id);
    await this.cargarCitas();
  }
}