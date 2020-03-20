import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectModel} from '../../model/project.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {SectorModel} from '../../model/sector.model';
import {AadProjectLocationComponent} from '../aad-project-location/aad-project-location.component';
import {MatDialog} from '@angular/material/dialog';
import {ProjectService} from '../../services/project.service';
import {LocationModel} from '../../model/location.model';
import {ClassifiersModel} from '../../model/classifiers.model';
import {DeleteProjectComponent} from '../delete-project/delete-project.component';
import {of, zip} from 'rxjs';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ChildClassifierModel} from '../../model/child-classifier.model';


@Component({
  selector: 'app-add-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  // constructor(private projectService: ProjectService) {
  // let id: number = 4; //todo vercnel rootingic
  // }

  id: number;

  updateProject: Date;

  createProject: Date;

  project: ProjectModel;

  form1;

  imp_statuses: ClassifiersModel[];

  sectors: ClassifiersModel[] = [];

  sectorsAll: ClassifiersModel[] = [];

  sectorsArr: SectorModel[] = [];

  locationsArr: LocationModel[] = [];

  private _duration: number = null;


  displayedColumns: string[] = ['a', 'b', 'x'];

  displayedColumns2: string[] = ['a', 'b', 'c', 'x'];

  countyId: string;
  percent: number;
  districtId: string;

  districts: ChildClassifierModel[] = [];

  counties: ClassifiersModel[] = [];

  isReady: boolean = false;

  aa: boolean = false;

  bb: boolean = false;

  idIncorrect: boolean = false;

  newProject: boolean = false;

  locationsPercentSumVal: number = 0;

  sectorsForm = this.fb.group({
    percent: new FormControl(),
    sector: new FormControl(),
  });

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
    this.getEndDate();
  }

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

  getDistrictNameById(_id: number, parentId?: number): string {
    const dist = this.districts.find(district => district.id === _id && district.parentId === parentId);
    return dist ? dist.name : '';
  }

  getPercentSum() {
    return this.sectorsArr.reduce((previousValue, item) => +previousValue + +item.percent, 0);
  }

  ngOnInit(): void {


    this.id = +(this.route.snapshot.paramMap.get('id'));
    this.newProject = this.id < 1;

    zip(this.cs.getDistricts(), this.cs.getSectorsClassifier(), this.cs.getImpStatusClassifier(), this.cs.getCountyClassifier(),
      this.newProject ? of(new ProjectModel()) : this.projectService?.getProjectById(this.id)).subscribe(res => {

      this.districts = res[0];

      this.sectors = this.sectorsAll = res[1];

      this.imp_statuses = res[2];

      this.counties = res[3];

      this.project = res[4];

      if (!this.project) {
        this.idIncorrect = true;
      } else {
        this.addForm();
        if (!this.newProject) {
          this.sectorsArr = this.project?.sectors;
          for (let i of this.sectorsArr) {
            this.deleteSectorName(i.sector, i.percent);
          }
          this.locationsArr = this.project?.locations;
          this.onDateChange();
          this.updateProject = res[4].updateProject;
          this.createProject = res[4].createProject;
          this.locationsPercentSumVal = this.locationsPercentSum();
        }

        this.isReady = true;
      }
    });


    // obs$.subscribe((res) => {
    //   // alert('Id incorrect');
    //   this.project = res;
    //   this.sectorsArr = this.project.sectors;
    //   this.locationsArr = this.project.locations;
    //   console.log(this.project.sectors);
    //
    //   this.addForm();
    //   this.onDateChange();
    //   this.isReady = true;
    //   this.updateProject = res.updateProject;
    // });
  }


  deleteSector(sectorId) {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
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
      }
    });
  }

  deleteSectorName(sectorId: number, percent?: any, b?: boolean) {
    if (b) {
      this.sectorsAdd();
    }
    if (sectorId && percent && percent > 0 && percent <= 100 && (+this.getPercentSum() + +this.sectorsForm.value.percent) < 100) {
      let sectors2 = [];
      for (let i of this.sectors) {
        if (i.id != sectorId) {
          sectors2.push(i);
        }
      }
       this.sectors = sectors2;
    }
  }


  sectorsAdd() {
    if (this.sectorsForm.value.percent < 0 || this.sectorsForm.value.percent > 100 || (+this.getPercentSum() + +this.sectorsForm.value.percent) > 100 || !this.sectorsForm.value.sector) {
      this.aa = true;
      this.bb = false;

    } else if (this.sectorsForm.value.percent > 0 && this.sectorsForm.value.percent <= 100) {
      this.sectorsArr = [this.sectorsForm.value, ...this.sectorsArr];
      this.sectorsForm.reset();
      this.aa = false;
      this.bb = false;
    } else {
      this.bb = true;
      this.aa = false;
    }
  }


  getSectorName(_id): string{
    for(let obj of this.sectorsAll){
      if(obj.id == _id){
        return obj.name;
      }
    }
  }

  //
  // getCountyNameById(countyId: number) {
  //   return this.cs.getCountyNameById(countyId);
  // }


  getCountyNameById(_id): string{
    for(let obj of this.counties){
      if(obj.id == _id){
        return obj.name;
      }
    }
  }

  locationsPercentSum(): number {
    // alert(+this.locationsArr.reduce((previousValue, item) => +previousValue + +item.percent, 0))
    return +this.locationsArr.reduce((previousValue, item) => +previousValue + +item.percent, 0);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AadProjectLocationComponent, {
      width: '400px',
      data: {locations: this.locationsArr, districts: this.districts, counties: this.counties, locationsPercentSum: this.locationsPercentSumVal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.countyId && result.districtId && result.percent) {
        this.locationsArr = [result, ...this.locationsArr];
      }
      this.locationsPercentSumVal = this.locationsPercentSum();
    });
  }


  onDateChange($event?: MatDatepickerInputEvent<unknown>) {
    if (this.form1.value.startDate && this.form1.value.endDate) {
      let startDate = new Date(this.form1.value.startDate).getTime();
      let endDate = new Date(this.form1.value.endDate).getTime();
      let tarb = endDate - startDate;
      let orTarb = tarb / (60 * 60 * 24 * 1000) + 1;
      if (orTarb <= 0) {
        this.form1.value.stratDate = null;
        this.form1.value.endDate = null;
        this.duration = null;
      } else {
        this._duration = Math.floor(orTarb);
      }
    } else {
      this.duration = null;
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

      if (this.duration > 0) {
        this.form1.value.endDate = new Date(this.form1.value.startDate);
        this.form1.value.endDate.setDate(Number(this.form1.value.startDate.getDate()) + Number(this._duration) - 1);
        this.project.endDate = this.form1.value.endDate;
      } else {
        this.form1.value.stratDate = null;
        this.form1.value.endDate = null;
        this.duration = null;
      }
    } else if (this.form1.value.endDate && this._duration) {
      if (this.duration > 0) {
        this.form1.value.startDate = new Date(this.form1.value.endDate);
        this.form1.value.startDate.setDate(Number(this.form1.value.endDate.getDate()) - Number(this._duration) + 1);
        this.project.startDate = this.form1.value.startDate;
      } else {
        this.form1.value.stratDate = null;
        this.form1.value.endDate = null;
        this.duration = null;
      }
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
      }
    });
  }

  saveProject() {
    // this.updateProject = new Date();
    const obj = this.form1.value;
    this.project = new ProjectModel(obj.projectCode, obj.projectTitle, obj.description, obj.implementationStatus,
      obj.startDate, obj.endDate, this.sectorsArr, this.locationsArr, this.updateProject);

    this.newProject = false;
    if (this.id < 0) {
      this.project.createProject = this.createProject = new Date();
      this.projectService.addProject(this.project);
    } else {
      this.project.id = this.id;
      this.project.updateProject = this.updateProject = new Date();
      alert(this.project.updateProject);
      this.projectService.updateProject(this.project);
    }
  }

}


interface Sectors {
  sectorId?: string;
  percent?: number;
  sectorName?: string;
}

