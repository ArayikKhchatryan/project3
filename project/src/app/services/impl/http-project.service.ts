import {ProjectService, Response} from '../project.service';
import {ProjectModel} from '../../model/project.model';
import {ProjectViewModel} from '../../model/project-view.model';
import {Observable} from 'rxjs';

export class HttpProjectService extends ProjectService{


  addProject(project: ProjectModel): Observable<Response> {
    return undefined;
  }

  deleteProjectById(id: number): Observable<Response> {
    return undefined;
  }

  getProjectById(id: number): Observable<ProjectModel> {
    return undefined;
  }

  getProjects(): Observable<ProjectViewModel[]> {
    return undefined;
  }

  updateProject(id: number, project: ProjectModel): Observable<Response> {
    return undefined;
  }

  getNewProject(): Observable<ProjectModel> {
    return undefined;
  }

  // getLocations(): Observable<LocationModel[]> {
  //   return undefined;
  // }
  //
  // addLocation(location: LocationModel): Observable<Response> {
  //   return undefined;
  // }

}
