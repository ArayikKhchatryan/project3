import {Component, Inject, OnInit} from '@angular/core';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {LocationModel} from '../../model/location.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChildClassifierModel} from '../../model/child-classifier.model';
import {ClassifiersModel} from '../../model/classifiers.model';

@Component({
  selector: 'app-aad-project-location',
  templateUrl: './aad-project-location.component.html',
  styleUrls: ['./aad-project-location.component.css']
})
export class AadProjectLocationComponent implements OnInit {

  counties: ClassifiersModel[] = [];

  districtsAll: ChildClassifierModel[] = [];

  districts: ChildClassifierModel[] = [];

  countiesAll: ClassifiersModel[] = [];

  selected: LocationModel = {};

  locationInvalid: Boolean;

  percentIncorrect: Boolean;

  percentSum: number;

  constructor(private cs: ClassifierServiceService, @Inject(MAT_DIALOG_DATA) private data: Data, public dialogRef: MatDialogRef<LocationModel[]>,) {
    this.locationInvalid = false;
    this.percentIncorrect = false;
    this.districtsAll = this.data.districts;
    this.countiesAll = this.data.counties;
    this.percentSum = this.data.locationsPercentSum;

  }

  ngOnInit(): void {
    this.counties = this.countiesAll;
    this.filteredDistricts();
    this.filteredCounties();
    // this.counties = this.countiesAll;
  }

  filteredDistricts() {
    this.districts = this.districtsAll ? this.districtsAll.filter(district => !this.data.locations.find(location => location.districtId === district.id &&
      location.countyId === district.parentId)) : [];
  }

  filteredCounties() {
    this.counties = this.countiesAll ? this.countiesAll.filter(coutry => this.districts.some(district => district.parentId === coutry.id)) : [];
  }

  getDistrictByParentId(id: number) {
    this.filteredDistricts();
    let arr: ChildClassifierModel[] = [];
    for (let district of this.districts) {
      if (district.parentId == id) {
        arr.push(district);
      }
    }
    this.districts = arr;
    return arr;
  }

  locationAdd() {
    if (!this.selected.countyId || !this.selected.districtId || !this.selected.percent) {
      this.locationInvalid = true;
      this.percentIncorrect = false;
    } else if (+this.selected.percent + this.percentSum <= 100 && +this.selected.percent + this.percentSum > 0 && +this.selected.percent > 0) {
      this.dialogRef.close(this.selected);
    } else {
      this.locationInvalid = false;
      this.percentIncorrect = true;
    }
  }
}

interface Data {
  locations: LocationModel[];
  districts: ChildClassifierModel[];
  counties: ClassifiersModel[];
  locationsPercentSum: number;
}
