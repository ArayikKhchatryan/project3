import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ClassifierServiceService} from './services/classifier-service.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ProjectComponent} from './components/project/project.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {AadProjectLocationComponent} from './components/aad-project-location/aad-project-location.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ProjectService} from './services/project.service';
import {DummyProjectService} from './services/impl/dummy-project.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DeleteProjectComponent} from './components/delete-project/delete-project.component';
import {routes} from './app-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectComponent,
    AadProjectLocationComponent,
    NotFoundComponent,
    AadProjectLocationComponent,
    DeleteProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [ClassifierServiceService,
    // MatDatepickerModule,
    [{ provide: ProjectService, useClass: DummyProjectService }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
