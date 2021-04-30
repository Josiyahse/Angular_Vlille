import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Istations } from './sataionsInterface';

@Injectable({
  providedIn: 'root'
})
export class VLilleDataService {


  //private _url: string = "/assets/data/dataTest.json";
  private  _urlDataJson: string = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&q=&facet=libelle&facet=nom&facet=commune&facet=etat&facet=type&facet=etatconnexion&refine.nom=THEATRE+SEBASTOPOL";

  public  station ={
        commune :"",
        station : "",
        service : "",
        veloDispo: 0,
        placeDispo :0 }

  public  saveStations =[{
        "commune" :"Lille",
        "station" : "Hôpitale",
        "service" : "HORS SERVICE",
        "veloDispo": 2,
        "placeDispo" : 15
      },
      {
        "commune" :"Lille",
        "station" : "Croix",
        "service" : "EN SERVICE",
        "veloDispo": 0,
        "placeDispo" : 3
      }] as any;


  constructor(private http: HttpClient) { }

   searchStation(){

    let data = JSON.parse(this._urlDataJson);

    this.station.commune= data['records'][0]['fields']['commune'];
    this.station.commune= data['records'][0]['nom'];
    this.station.commune= data['records'][0]['fields']['etat'];
    this.station.commune= data['records'][0]['fields']['nbvelosdispo'];
    this.station.commune= data['records'][0]['fields']['nbplacesdispo'];

    let stationJson = JSON.stringify(this.station);

    this.saveStations.push(stationJson)

  }

    getStation() {
    return this.saveStations;
  }
}
