import { Component, OnInit } from '@angular/core';
import { VLilleDataService } from'../../Service/vlille-data.service'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public stations = []as any;
  public colors ={active:"green",inactive:"red"};
  public numberColor = {free:"activePlace",feew:"warningPlace",empty:"inactivePlace"}

  constructor( private _VLilleDataService: VLilleDataService) { }

  ngOnInit(): void {
    this.stations = this._VLilleDataService.getStation() ;
  }

}
