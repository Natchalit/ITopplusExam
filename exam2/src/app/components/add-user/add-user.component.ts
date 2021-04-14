import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZong: NgZone,
    private crudService: CrudService
  ) {

    this.userForm = this.formBuilder.group({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      age: new FormControl(null, [Validators.required]),
      address: new FormControl(null, Validators.required),
      career: new FormControl('')
    })

  }

  ngOnInit(): void {
    
  }

  get fname() { return this.userForm.get('fname'); }
  get lname() { return this.userForm.get('lname'); }
  get age() { return this.userForm.get('age'); }
  get address() { return this.userForm.get('address'); }

  onSubmit(): any {
    if(this.userForm.status!= "INVALID"){
      this.crudService.AddUser(this.userForm.value)
        .subscribe(() => {
          console.log("Data added successfuly");
          this.ngZong.run(() => this.router.navigateByUrl('/list-user'))
        }, (err) => {
          console.log(err);
        })
    } else {
      alert("Please fill data")
    }
  }
}
