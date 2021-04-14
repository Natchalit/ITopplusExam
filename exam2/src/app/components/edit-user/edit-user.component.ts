import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetUser(this.getId).subscribe(res => {
      console.log("this res: ", res.fname);
      this.updateForm.setValue({
        fname: res['fname'],
        lname: res['lname'],
        age: res['age'],
        address: res['address'],
        career: res['career']
      })
    })

    this.updateForm = this.formBuilder.group({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      age: new FormControl(null, [Validators.required]),
      address: new FormControl(null, Validators.required),
      career: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  get fname() { return this.updateForm.get('fname'); }
  get lname() { return this.updateForm.get('lname'); }
  get age() { return this.updateForm.get('age'); }
  get address() { return this.updateForm.get('address'); }

  onUpdate(): any {
    if (this.updateForm.status != "INVALID") {
      this.crudService.updateUser(this.getId, this.updateForm.value)
        .subscribe(() => {
          console.log('Data updated successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/list-user'))
        }, (err) => {
          console.log(err);
        });
    } else {
      alert("Please fill data")
    }
  }

}
