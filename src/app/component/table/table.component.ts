import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import { Formdata, Id } from '../../model/Formdata';
import { MatDialog, MatSnackBar } from '@angular/material';
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
  count: number = 2;
  @Output() deleteForm: EventEmitter<Formdata> = new EventEmitter();

  constructor(private formdatasService: FormdataService, public dialog: MatDialog, private snackBar:MatSnackBar) { }

  ngOnInit() {
   this.formdatasService.getFormdatas().subscribe( formdatas => {
     this.formdatas = formdatas;
   },
   error => {
     console.log(error.error); 
   });
    }


    //Method when Delete is pressed.
    onDelete(form){
      this.formdatas = this.formdatas.filter(c => c.id !== form.id);
      console.log(this.formdatas = this.formdatas.filter(c => c.id != form.id));
      console.log(form.id);
      console.log(this.formdatas);
      this.count = this.formdatas.length;
      this.formdatasService.getCount(this.count);
      //Delete from server
      //this.formdatasService.deleteTable(form).subscribe();
    }

    addData(datas: Formdata){
      this.formdatasService.addData(datas).subscribe(datas => {
        this.formdatas.push(datas);
      },
      error => {
        console.log(error.error); 
      },
      ()  => {
        this.count = this.formdatas.length;
        this.formdatasService.getCount(this.count);
      })
      
      console.log(datas.id);
    }

    //Setting time duration and message for snackbar
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

    did: number;
    dname: string;
    daddress: string;
    ddob: string;
    demail: string;
    //Dialog is opened
    openDialog(form): void {
      console.log('The Dialog was opened.');
      const dialogRef =  this.dialog.open(EditTableComponent, {
        data: {
          did: form.id,
          dname: form.name,
          daddress: form.address,
          ddob: form.dob,
          demail: form.email
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');

      //Update in UI
      form.name = result.dname;
      form.address = result.daddress;

      //Update in server
      const updateList ={
        id: result.did,
        name: result.dname,
        address: result.daddress,
        dob: result.ddob,
        email: result.demail
      };
      console.log(updateList);
      this.formdatasService.getFormdatas().subscribe( );
    });
    }
}

