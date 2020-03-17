export class SectorModel {
  sector: number;
  percent: number;

  constructor(id?:number, sectorPercent?: number) {
      this.sector = id;
      this.percent = sectorPercent;
  }
}
