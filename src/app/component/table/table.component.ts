import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import { Formdata, Id } from '../../model/Formdata';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormdataService } from '../../services/formdata.service';
import { EditTableComponent } from '../edit-table/edit-table.component';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  formdatas: Formdata[];
  value: Id[];
  @Output() deleteForm: EventEmitter<Formdata> = new EventEmitter();

  constructor(private formdatasService: FormdataService, public dialog: MatDialog) { }

  ngOnInit() {
   this.formdatasService.getFormdatas().subscribe( formdatas => {
     this.formdatas = formdatas;
   });

   
    }

    //Method when Edit is pressed.
    onEdit(form){
      this.formdatasService.editTable(form).subscribe( form =>
        console.log(form.id));
    }

    //Method when Delete is pressed.
    onDelete(form){
      
      this.formdatas = this.formdatas.filter(c => c.id !== form.id);
      console.log(this.formdatas = this.formdatas.filter(c => c.id != form.id));
      console.log(form.id);
      console.log(this.formdatas);
      //Delete from server
      //this.formdatasService.deleteTable(form).subscribe();
    }

    addData(datas: Formdata){
      this.formdatasService.addData(datas).subscribe(datas => {
        this.formdatas.push(datas);
      })
      console.log(datas.id);
    }

    dname: string;
    daddress: string;
    ddob: string;
    demail: string;
    openDialog(form): void {
      console.log('The Dialog was opened.');
      const dialogRef =  this.dialog.open(EditTableComponent, {
        data: {
          dname: form.name,
          daddress: form.address,
          ddob: form.dob,
          demail: form.email
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      result = this.dname;
      console.log(result);
    });
    }
}

