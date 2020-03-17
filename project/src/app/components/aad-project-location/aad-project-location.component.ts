import {Component, Inject, OnInit} from '@angular/core';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {FormBuilder} from '@angular/forms';
import {ProjectService} from '../../services/project.service';
import {LocationModel} from '../../model/location.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddProjectComponent} from '../add-project/add-project.component';

@Component({
  selector: 'app-aad-project-location',
  templateUrl: './aad-project-location.component.html',
  styleUrls: ['./aad-project-location.component.css']
})
export class AadProjectLocationComponent implements OnInit {

  counties: any;

  districts: any;

  // constructor(private cs: ClassifierServiceService, private fb: FormBuilder, private projectService: ProjectService, private dialogRef: MatDialogRef<AddProjectComponent>,
  //             @Inject(MAT_DIALOG_DATA) public location: location ) {
  // }

  constructor(private cs: ClassifierServiceService, @Inject(MAT_DIALOG_DATA) public location: location ) {
  }

  ngOnInit(): void {
    this.cs.getCountyClassifier().subscribe((res) => {
      this.counties = res;
      // let addProjectComponent = new AddProjectComponent(null, null, null, null,null);
      // console.log(addProjectComponent.locationsArr);
    });
  }

  getDistrictByParentId(id: number) {
    this.districts = this.cs.getDistrictByParentId(id);
  }

  //
  // locationsForm = this.fb.group({
  //   county: [],
  //   district: [],
  //   percent: [],
  // });

  // onNoClick(): void {
  //   this.dialogRef.close();
    // this.
  // }

  // addLocation() {
  //   this.dialogRef.close();
  //
  //   this.location = new LocationModel(this.country, this.district, this.percent);
  //   // if (this.locationsForm.value.county && this.locationsForm.value.district) {
  //   //   let obj = this.locationsForm.value;
  //   //   let newLocation = new LocationModel(obj.county, obj.district, obj.percent);
  //   //   this.projectService.addLocation(newLocation);
  //     // alert(obj.percent);
  //     // console.log(newLocation);
  //     // console.log(obj.percent);
  //     // console.log(this.projectService.getLocations());
  // //   }
  // }
  //


}

interface location {
   countyId?: number,
  districtId?: number,
  percent?: number
}
