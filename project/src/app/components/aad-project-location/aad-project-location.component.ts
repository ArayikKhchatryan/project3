import {Component, Inject, OnInit} from '@angular/core';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {LocationModel} from '../../model/location.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-aad-project-location',
  templateUrl: './aad-project-location.component.html',
  styleUrls: ['./aad-project-location.component.css']
})
export class AadProjectLocationComponent implements OnInit {

  counties: any;

  districts: any;

  selected: LocationModel = {};

  constructor(private cs: ClassifierServiceService, @Inject(MAT_DIALOG_DATA) private data: Data) {
    console.log(data);
  }

  ngOnInit(): void {
    this.cs.getCountyClassifier().subscribe((res) => {
      this.counties = res;
    });
  }

  getDistrictByParentId(id: number) {
    this.districts = this.cs.getDistrictByParentId(id);
  }


  getCounty() {
    let countyes = this.counties;
    let district = this.districts;
    let locations = this.data.locations;
    for(let i of countyes){
      for(let j of district){

      }
    }
  }


  //
  // locationsForm = this.fb.group({
  //   county: [],
  //   district: [],
  //   percent: [],
  // });

}

interface Data {
  locations: LocationModel[]
}
