import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Formdata, Id } from '../../model/Formdata';
import { FormdataService } from 'src/app/services/formdata.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  //dataList = [];
  value: Id[];
  idarr = [];
  incrid: number;
  @Output() addData: EventEmitter<any> = new EventEmitter();

  constructor(private formdatasService: FormdataService) { }

  ngOnInit() {
  }

  //Form Group
  registerForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    address: new FormControl(),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])    
  });

  //On sumbit method
  registerUser()
  {
    console.log(this.idarr);
    const dataList =
      {
        id: this.registerForm.controls['id'].value,
        name: this.registerForm.controls['name'].value,
        email: this.registerForm.controls['email'].value,
        dob: this.registerForm.controls['dob'].value,
        address: this.registerForm.controls['address'].value
      };
      console.log(dataList);
      this.addData.emit(dataList);
      this.registerForm.reset();
  }

  getIdErrorMessage(){
    return this.registerForm.controls['id'].hasError('required') ? 'You must enter a id.' :
            '';
  }

  getNameErrorMessage() {
    return this.registerForm.controls['name'].hasError('required') ? 'You must enter a name.' :
            '';
  }

  getEmailErrorMessage() {
    return this.registerForm.controls['email'].hasError('required') ? 'You must enter an email.' :
    this.registerForm.controls['email'].hasError('email') ? 'Invalid email! Email should be valid.' :
            '';
  }

  getDOBErrorMessage() {
    return this.registerForm.controls['dob'].hasError('required') ? 'You must pick a date of birth.' :
            '';
  }

}
