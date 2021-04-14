import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  User:any = [];

  constructor(private curdService:CrudService) { }

  ngOnInit(): void {
    this.curdService.GetUsers().subscribe(res=>{
      console.log(res);
      this.User = res;
    })
  }

  delete(id:any,i:any){
    console.log(id);
    if(window.confirm('Do you want to go ahead?')){
      this.curdService.deleteUser(id).subscribe(res=>{
        this.User.splice(i,1);
      })
    }
    
  }

}
