import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectComponent} from './components/project/project.component';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {AadProjectLocationComponent} from './components/aad-project-location/aad-project-location.component';


export const routes: Routes = [
  {path: 'projects/:id', component: ProjectComponent},
  {path: 'projects', component: ProjectListComponent},
  {path: 'projects/add/location', component: AadProjectLocationComponent},
  {path: '**', redirectTo: 'projects'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
