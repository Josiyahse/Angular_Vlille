import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { VLilleDataService } from'../../Service/vlille-data.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;


  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search : []
    })

  }

  search(){
    let station = this.searchForm.value.search;
    if(station == null){
      alert("Vous devez rentrer une station")
    }else{
      VLilleDataService.searchStation();
    }
     console.log(station);
  }
}
