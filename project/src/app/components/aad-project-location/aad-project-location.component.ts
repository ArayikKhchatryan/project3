import {Component, Inject, OnInit} from '@angular/core';
import {ClassifierServiceService} from '../../services/classifier-service.service';
import {LocationModel} from '../../model/location.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable, of, zip} from 'rxjs';
import {ChildClassifierModel} from '../../model/child-classifier.model';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-aad-project-location',
  templateUrl: './aad-project-location.component.html',
  styleUrls: ['./aad-project-location.component.css']
})
export class AadProjectLocationComponent implements OnInit {

  counties: any[] = [];

  districtsAll: any[] = [];

  districts: any[] = [];

  selected: LocationModel = {};

  locationInvalid: Boolean;

  percentIncorrect: Boolean;

  constructor(private cs: ClassifierServiceService, @Inject(MAT_DIALOG_DATA) private data: Data, public dialogRef: MatDialogRef<LocationModel[]>,) {
    this.locationInvalid = false;
    this.percentIncorrect = false;
    this.districtsAll = this.data.districts;
  }

  ngOnInit(): void {
    this.cs.getCountyClassifier().subscribe((res) => {
      this.counties = res;
      this.filteredDistricts();
    });
  }

  filteredDistricts() {
    this.districts = this.districtsAll ? this.districtsAll.filter(district => !this.data.locations.find(location => location.districtId === district.id &&
      location.countyId === district.parentId)) : [];
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
    } else if (+this.selected.percent + this.percentSum() <= 100 && +this.selected.percent + this.percentSum() > 0 && +this.selected.percent > 0) {
      this.dialogRef.close(this.selected);
    } else {
      this.locationInvalid = false;
      this.percentIncorrect = true;
    }
  }

  percentSum(): number {
    return +this.data.locations.reduce((previousValue, item) => +previousValue + +item.percent, 0);
  }
}

interface Data {
  locations: LocationModel[];
  districts: any[];
}
