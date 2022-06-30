import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';

const routes: Routes = [
  {path:'', redirectTo: 'list-empleados', pathMatch: 'full'},  
  {path: 'list-empleados', component: ListaEmpleadosComponent},
  {path: 'create-empleado', component: CreateEmpleadoComponent},
  {path: 'edit-empleado/:id', component: CreateEmpleadoComponent},
  {path:'**', redirectTo: 'list-empleados', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
