import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectModel} from '../../model/project.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {SectorModel} from '../../model/sector.model';
import {ErrorMethod} from '../util/errorMethod';
import {AadProjectLocationComponent} from '../aad-project-location/aad-project-location.component';
import {MatDialog} from '@angular/material/dialog';
import {ProjectService} from '../../services/project.service';
import {LocationModel} from '../../model/location.model';
import {ClassifiersModel} from '../../model/classifiers.model';
import {DeleteProjectComponent} from '../delete-project/delete-project.component';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
    this.getEndDate();
  }

  // constructor(private projectService: ProjectService) {
  // let id: number = 4; //todo vercnel rootingic
  // }

  id: number;

  project: ProjectModel;

  form1;

  imp_statuses: ClassifiersModel[];

  sectors: any;

  sectorsAll: any;

  sectorsArr: SectorModel[] = [];

  locationsArr: LocationModel[] = [];

  private _duration: number = null;

  aa: boolean = false;

  bb: boolean = false;


  displayedColumns: string[] = ['a', 'b', 'x'];

  displayedColumns2: string[] = ['a', 'b', 'c', 'x'];

  countyId: string;
  percent: number;
  districtId: string;

  isReady: Boolean = false;

  sectorsForm = this.fb.group({
    percent: new FormControl(),
    sector: new FormControl(),
  });


  // a: Boolean = false;

  // aa(){
  //   this.sectorsForm.value.percent = null;
  // }


  constructor(private route?: ActivatedRoute, private projectService?: ProjectService, private cs?: ClassifierServiceService, private fb?: FormBuilder, public dialog?: MatDialog) {

  }

  addForm() {
    this.form1 = new FormGroup({
      // projectCode: new FormControl('', [Validators.required, Validators.nullValidator({})]),
      projectCode: new FormControl(this.project.projectCode, [Validators.required]),
      projectTitle: new FormControl(this.project.projectTitle, Validators.required),
      description: new FormControl(this.project.description),
      implementationStatus: new FormControl(this.project.impStatusId, [Validators.required, Validators.min(1)]),
      startDate: new FormControl(this.project.startDate, Validators.required),
      endDate: new FormControl(this.project.endDate),

      // sectors:  this.fb.group({
      //   percent: new FormControl(),
      //   sector: new FormControl(this.project.sectors),
      // })


      // sectorsForm: this.fb.group({
      //   percent: [''],
      //   sector: [undefined],
      // }),
    });
  }


  getSectors(res) {
    this.sectorsArr = [];
    for (let i of res) {
      for (let j of this.sectorsArr) {
        if (i.sector != j.sector) {

        }
      }
    }
  }

  getPercentSum() {
    return this.sectorsArr.reduce((previousValue, item) => +previousValue + +item.percent, 0);
  }

  ngOnInit(): void {
    // this.projectService.getLocations().subscribe(res => {
    //   this.locationsArr = res;
    // });

    this.cs.getSectorsClassifier().subscribe((res) => {
      this.sectors = this.sectorsAll = res;
      for (let i of this.sectorsArr) {
        this.deleteSectorName(i.sector, i.percent);
        // alert(i.sector);
      }
    });


    this.cs.getImpStatusClassifier().subscribe(res => {
      this.imp_statuses = res;
    });


    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id < 0) {
      this.project = new ProjectModel();
      this.addForm();
      this.isReady = true;
    } else {
      this.projectService?.getProjectById(this.id)?.subscribe(res => {
        // alert('Id incorrect');
        this.project = res;
        this.sectorsArr = this.project.sectors;
        this.locationsArr = this.project.locations;
        console.log(this.project.sectors);

        this.addForm();
        this.getDuration();
        this.isReady = true;


        // alert(this.getPercentSum());

        // alert(this.form1.value.startDate);
        // alert(this.form1.value.endDate);
        // alert(this.form1.value.projectTitle)
      }, ErrorMethod.getError);
    }
  }


  deleteSector(sectorId) {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      // width: '200px',
      data: {boolean: Boolean}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let sectors2 = [];
        for (let i of this.sectorsArr) {
          if (i.sector != sectorId) {
            sectors2.push(i);
          }
        }
        this.sectorsArr = sectors2;


        this.sectors = this.sectorsAll;
        for (let i of this.sectorsArr) {
          this.deleteSectorName(i.sector, i.percent);
        }


        // alert(i.sector);
      }

    });
  }

  deleteSectorName(sectorId: number, percent?: any, b?: boolean) {
    if (b) {
      this.sectorsAdd();
    }
    if (sectorId && percent && percent > 0 && percent <= 100 && (+this.getPercentSum() + +this.sectorsForm.value.percent) < 100) {
      // alert(sectorId);
      let sectors2 = [];
      for (let i of this.sectors) {
        if (i.id != sectorId) {
          sectors2.push(i);
          // alert(i.id);
        }
      }
      // this.sectors = null;
      this.sectors = sectors2;
      // console.log(this.sectors);
    }
  }


  sectorsAdd() {
    // alert(+this.getPercentSum() + +this.sectorsForm.value.percent);
    // alert(this.getPercentSum())
    if (this.sectorsForm.value.percent < 0 || this.sectorsForm.value.percent > 100 || (+this.getPercentSum() + +this.sectorsForm.value.percent) > 100 || !this.sectorsForm.value.sector) {
      // alert(this.sectorsForm.value.percent < 0 || this.sectorsForm.value.percent > 100 && (this.getPercentSum() + this.sectorsForm.value.percent) > 100);
      // alert(true)
      this.aa = true;
      this.bb = false;

      // this.sectorsForm.invalid;
    } else if (this.sectorsForm.value.percent > 0 && this.sectorsForm.value.percent <= 100) {
      // alert(false)
      this.sectorsArr = [this.sectorsForm.value, ...this.sectorsArr];
      this.sectorsForm.reset();
      this.aa = false;
      this.bb = false;
    } else {
      this.bb = true;
      this.aa = false;
    }
  }

  getSectorName(sectorId: number) {
    return this.cs.getSectorName(sectorId);
  }

  getCountyNameById(countyId: number) {
    return this.cs.getCountyNameById(countyId);
  }

  getDistrictNameById(districtId: number, parentId: number) {
    return this.cs.getDistrictNameById(districtId, parentId);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AadProjectLocationComponent, {
      width: '400px',
      data: {countyId: this.countyId, districtId: this.districtId, percent: this.percent}
    });

    dialogRef.afterClosed().subscribe(result => {
      // alert(result);
      if (result.countyId && result.districtId && result.percent) {
        // this.locationsArr.push(result);
        this.locationsArr = [result, ...this.locationsArr];
        // console.log('-----------------------');
        // console.log(this.locationsArr);
      }
    });
    // dialogRef.disableClose = true;
  }


  getDuration() {
    if (this.form1.value.startDate && this.form1.value.endDate) {
      let startDate = new Date(this.form1.value.startDate).getTime();
      let endDate = new Date(this.form1.value.endDate).getTime();
      let tarb = endDate - startDate;
      let orTarb = tarb / (60 * 60 * 24 * 1000) + 1;
      // if(this.form1.value.duration<0){
      //   this.form1.value.endDate.invalid;
      // }
      // else{
      this._duration = Math.floor(orTarb);
      // alert(this._duration);
      // return Math.floor(orTarb);
      // }


      // alert(this.form1.value.duration);
      // this.form1.value.description = 'aa';
    }
    // else if (this.form1.value.startDate && this.form1.value.duration) {
    //
    //   // this.form1.value.endDate = this.form1.value.startDate + this.form1.value.duration;
    //   this.form1.value.endDate = new Date();
    //   // alert(this.form1.value.duration)
    //   this.form1.value.endDate.setDate(Number(this.form1.value.startDate.getDate()) + Number(this.form1.value.duration));
    //   // alert(this.form1.value.endDate);
    // }
  }

  getEndDate() {
    if (this.form1.value.startDate && this._duration) {

      this.form1.value.endDate = new Date(this.form1.value.startDate);
      this.form1.value.endDate.setDate(Number(this.form1.value.startDate.getDate()) + Number(this._duration) - 1);
    }
  }

  deleteLocation(countyId: number, districtId: number) {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      data: {boolean: Boolean}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let locations2 = [];
        for (let i of this.locationsArr) {
          if (i.districtId != districtId || i.countyId != countyId) {
            locations2.push(i);
          }
        }
        this.locationsArr = locations2;


        // this.sectors = this.sectorsAll;
        // for (let i of this.sectorsArr) {
        //   this.deleteSectorName(i.sector, i.percent);
        // }

      }

    });

  }


  saveProject() {
    const obj = this.form1.value;
    this.project = new ProjectModel(obj.projectCode, obj.projectTitle, obj.description, obj.implementationStatus, obj.startDate, obj.endDate, this.sectorsArr, this.locationsArr);

    if (this.id < 0) {
      // console.log(this.project);
      // this.project  = this.form1.value;
      // // this.project.id = 2;
      // this.projectService.getProjects().subscribe(res => {
      //   console.log(res.length);
      //   this.project.id = res.length;
      // });
      // this.project.sectors = this.sectorsArr;
      this.projectService.addProject(this.project);
    } else {
      this.project.id = this.id;
      this.projectService.updateProject(this.project);
    }
    this.newDate = new Date();
  }

newDate;
}


interface Sectors {
  sectorId?: string;
  percent?: number;
  sectorName?: string;
}

