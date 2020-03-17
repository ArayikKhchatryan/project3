import {AfterViewChecked, Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ProjectModel} from '../../model/project.model';
import {Routes} from '@angular/router';
import {ProjectViewModel} from '../../model/project-view.model';
import {Observable, of} from 'rxjs';
import {ErrorMethod} from '../util/errorMethod';
import {ProjectService} from '../../services/project.service';
import {tryReadFile} from 'tslint/lib/files/reading';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AadProjectLocationComponent} from '../aad-project-location/aad-project-location.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteProjectComponent} from '../delete-project/delete-project.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  dataSource: ProjectViewModel[];

  isReady: Boolean = false;

  // dataSource2;
  constructor(private dummyProjectService: ProjectService,  public dialog?: MatDialog) {
  }

  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dummyProjectService.getProjects().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
      this.isReady = true;

      // this.dataSource2 = new MatTableDataSource(res);
    }, ErrorMethod.getError);
    // alert(this.dummyProjectService.projectViewList);

    // this.dataSource2.sort = this.sort;
    // this.dummyProjectService.getProjectViewList();

  }

  displayedColumns: string[] = ['name', '444444'];

  deleteProject(id) {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      // width: '200px',
      data: {boolean: Boolean}
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.dummyProjectService.deleteProjectById(id).subscribe(res => {
            // console.log(res);
            if(res.status){
              this.ngOnInit();
            }
            else {
              alert("can not delete")
            }
          });
      }

    });




    // this.dummyProjectService.deleteProjectById(id).subscribe(res => {
    //   // console.log(res);
    //   if(res.status){
    //      this.ngOnInit();
    //    }
    //    else {
    //      alert("can not delete")
    //    }
    //  });





    // displayedColumns: string[] = [ 'name','444444'];
  }


}
