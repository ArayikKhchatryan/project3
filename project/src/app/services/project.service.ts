import {ProjectModel} from '../model/project.model';
import {Injectable} from '@angular/core';
import {ProjectViewModel} from '../model/project-view.model';
import {Observable} from 'rxjs';

@Injectable()
export abstract class ProjectService {
  abstract getProjectById(id: number): Observable<ProjectModel>;  //TODO Ovser

  // abstract getProjects(): ProjectModel[];

  abstract getProjects(): Observable<ProjectViewModel[]>;

  abstract addProject(project: ProjectModel): Observable<Response>;

  abstract deleteProjectById(id: number): Observable<Response> ;

  abstract updateProject(id: number, project: ProjectModel, newProjectTitle? : boolean):  Observable<Response>;

  // abstract addLocation(location: LocationModel): Observable<Response>;

  // abstract getLocations(): Observable<LocationModel[]>;

  abstract getNewProject(): Observable<ProjectModel>;

}

export class Response {
  constructor(public status: boolean, public validations?: string[], public newId?: number) {

  }
}
