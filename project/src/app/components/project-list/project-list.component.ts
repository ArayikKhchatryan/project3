import {Component, OnInit} from '@angular/core';
import {ProjectViewModel} from '../../model/project-view.model';
import {ErrorMethod} from '../util/errorMethod';
import {ProjectService} from '../../services/project.service';
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

  captureSrc = "../assets/Capture.png";


  constructor(private dummyProjectService: ProjectService, public dialog?: MatDialog) {
  }

  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.dummyProjectService.getProjects().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
      this.isReady = true;
    }, ErrorMethod.getError);
  }

  displayedColumns: string[] = ['projectName', 'delete'];

  deleteProject(id) {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      data: {boolean: Boolean}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dummyProjectService.deleteProjectById(id).subscribe(res => {
          if (res.status) {
            this.ngOnInit();
          } else {
            alert('can not delete');
          }
        });
      }

    });

  }
}
