import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  
empleados: any[] = [];

  constructor(private __empleadoService: EmpleadoService,
    private toastr: ToastrService) {     
  }

  ngOnInit(): void {
    this.getEmpleados();  
  }

  getEmpleados(){
    this.empleados = [];

    this.__empleadoService.getEmpleados().subscribe(data => {
      data.forEach((element: any) => {
          this.empleados.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
      });
      console.log(this.empleados);
    })
  }

  deleteEmpleado(id: string){
    this.__empleadoService.deleteEmpleado(id).then(()=>{
      this.toastr.success('Empleado eliminado con Exito!', 'Eliminar Empleado...',
      {positionClass: 'toast-top-right'});      
    })
  }
}
