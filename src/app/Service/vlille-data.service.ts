import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IsataSatations } from './dataStationInterface';

@Injectable({
  providedIn: 'root',
})
export class VLilleDataService {
  //private _url: string = "/assets/data/dataTest.json";
  private _urlDataJson: string =
    'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&q=&facet=libelle&facet=nom&facet=commune&facet=etat&facet=type&facet=etatconnexion&refine.nom=';
  private _urlAllStationJson: string =
    'https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&q=&rows=252&facet=libelle&facet=nom&facet=commune&facet=etat&facet=type&facet=etatconnexion';

  public saveStations = [] as any;
  public savestationSerach = [] as any;

  constructor(private http: HttpClient) {}

  getDataSearch(station: string): Observable<IsataSatations[]> {
    return this.http.get<IsataSatations[]>(station).pipe(
      map((stations: any) => {
        if (stations['records'].length === 0) {
          alert('Station introuvable');
        } else {
          let laStation = {
            commune: stations['records'][0]['fields']['commune'],
            station: stations['records'][0]['fields']['nom'],
            service: stations['records'][0]['fields']['etat'],
            veloDispo: stations['records'][0]['fields']['nbvelosdispo'],
            placeDispo: stations['records'][0]['fields']['nbplacesdispo'],
          };

          this.savestationSerach.push(laStation);
        }
        return stations;
      })
    );
  }

  getData(): Observable<IsataSatations[]> {
    return this.http.get<IsataSatations[]>(this._urlAllStationJson).pipe(
      map((stations: any) => {
        for (let pos = 0; pos < stations['nhits']; pos++) {
          let laStation = {
            commune: stations['records'][pos]['fields']['commune'],
            station: stations['records'][pos]['fields']['nom'],
            service: stations['records'][pos]['fields']['etat'],
            veloDispo: stations['records'][pos]['fields']['nbvelosdispo'],
            placeDispo: stations['records'][pos]['fields']['nbplacesdispo'],
          };
          this.saveStations.push(laStation);
        }
        return stations;
      })
    );
  }

  searchStation(station: string) {
    let linksatationJson = this._urlDataJson + station;
    this.getDataSearch(linksatationJson).subscribe();
  }

  getStation() {
    if (this.savestationSerach.length == 0) {
      this.getData().subscribe();
      return this.saveStations;
    } else {
      return this.savestationSerach;
    }
  }

  clear() {
    let newSavestationSerach = [] as any;
    this.savestationSerach = newSavestationSerach;
    this.getData();
  }
}
