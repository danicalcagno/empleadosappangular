import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { setupTestingRouter } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
 createEmpleado: FormGroup;
 submitted = false;
 loading = false; //variable que me indica si muestro o no el spinner
 id: string | null; //string al editar y null cuando agregamos
 titulo = 'Agregar Empleado';

  constructor(private fb: FormBuilder, 
              private _empleadoService: EmpleadoService,
              private router: Router,
              private toastr: ToastrService,
              //ActivatedRoute nos permite recuperar el id de la ruta
              private aRoute: ActivatedRoute) { 
      this.createEmpleado=this.fb.group({
        nombre: ['', Validators.required], //'' valor por defecto
        apellido: ['', Validators.required],
        documento: ['', Validators.required],
        salario: ['', Validators.required]
      })
      this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id);
  }
  
  ngOnInit(): void {
      this.esEdiar();
  }

  agregarEditarEmpleado(): void{
    this.submitted=true;
    
    if (this.createEmpleado.invalid){
      return;
    }

    if (this.id === null){
      console.log('agregar');
        this.agregarEmpleado();
    }else{
      console.log('editar');
      this.editarEmpleado(this.id);
    }
  }

  agregarEmpleado(): void{
   
    const empleado: any={
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new(Date),
      fechaActualizacion:  new(Date)
    }
    this.loading = true;
    //empleado se lo vamos a mandar a firebase y lo vamos a almacenar 
    //el metodo retorna una promesa, por eso, usamos la fn de flecha
    this._empleadoService.agregarEmpleado(empleado).then(()=>{
      this.toastr.success('Empleado registrado con Exito!', 'Agregar Empleado...',
      {positionClass: 'toast-top-right'});
      this.loading = false;
      this.router.navigate(['/list-empleados']);
    }).catch(error =>{
        console.log(error);
        this.loading = false;
        })
  }

  editarEmpleado(id: string): void{
    const empleado: any={
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion:  new(Date)
    }
    this.loading = true;
    this._empleadoService.actualizarEmpleado(id, empleado).then(()=>{
      this.loading = false;
      this.toastr.info('Empleado actualizado con Exito!', 'Actualizar Empleado...');
      this.router.navigate(['/list-empleados']);
    }).catch(error =>{
      console.log(error);
      this.loading = false;
      })
  }

  esEdiar(){
      if (this.id !== null){
        this.titulo='Editar Empleado';
        this.loading=true;
          this._empleadoService.getEmpleado(this.id).subscribe((data)=>{
            //asi recupero los datos
            //console.log(data.payload.data()['nombre']);
            this.createEmpleado.setValue({
              nombre: data.payload.data()['nombre'],
              apellido: data.payload.data()['apellido'],
              documento: data.payload.data()['documento'],
              salario: data.payload.data()['salario']
            })
            this.loading=false;
          })
      }

  }
}
