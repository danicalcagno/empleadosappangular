// Servicio propiamente dicho
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }
  
  //AGREGAR EMLEADO
  agregarEmpleado(empleado: any): Promise<any>{
    return this.firestore.collection('empleados').add(empleado);
  }

  //OBTENER LISTA DE EMPLEADOS 
  //usando snapshotChanges eso hace que los cambios se vean en tiempo real
  getEmpleados(): Observable<any>{
    // return this.firestore.collection('empleados').snapshotChanges(); trae los empleados desordenados
    return this.firestore.collection('empleados', ref=>ref.orderBy('fechaCreacion', 'asc')).snapshotChanges(); //ordenads x fecha
  }

  deleteEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleado(id: string): Observable<any>{
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data: any): Promise<any>{
    return this.firestore.collection('empleados').doc(id).update(data);
  }
}
