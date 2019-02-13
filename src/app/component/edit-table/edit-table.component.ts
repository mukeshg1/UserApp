import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormdataService } from '../../services/formdata.service'
import { FormGroup, FormControl } from '@angular/forms';
import { Formdata } from 'src/app/model/Formdata';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  formdatas: Formdata[];

  @Output() onEdit: EventEmitter<any> = new EventEmitter(); 

  constructor(public dialogRef: MatDialogRef<EditTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formdatasService: FormdataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  saveData(data){
    const updateList ={
      id: data.did,
      name: data.dname,
      address: data.daddress,
      dob: data.ddob,
      email: data.demail
    };
    console.log(updateList);
    this.formdatasService.getFormdatas().subscribe();
    this.dialogRef.close();
  }
}





/*updateForm = new FormGroup({
  uName: new FormControl(''),
  uAddress: new  FormControl(''),
  uId: new  FormControl(''),
  dob: new FormControl(''),
  email: new FormControl('')  
});
updateUser(){
  const updateList ={
    id: this.updateForm.controls['uId'].value,
    name: this.updateForm.controls['uName'].value,
    address: this.updateForm.controls['uAddress'].value,
    dob: this.updateForm.controls['uAddress'].value,
    email: this.updateForm.controls['uAddress'].value
  };
  console.log(updateList);
  console.log('Save data clicked.');
  console.log('The dialog was closed after saving data');
  this.formdatasService.editTable(updateList).subscribe();
  this.formdatasService.getFormdatas().subscribe( formdatas => {
    this.formdatas = formdatas;
  });
}*/
