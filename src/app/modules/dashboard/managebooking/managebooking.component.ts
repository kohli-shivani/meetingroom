import { Component,Inject,Optional,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BookingService } from '@core/services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managebooking',
  templateUrl: './managebooking.component.html',
  styleUrls: ['./managebooking.component.scss']
})
export class ManagebookingComponent implements OnInit {

  bookingdetails:any;
  disabled = true;
  constructor(private router:Router,private _api:BookingService,
    public dialogRef: MatDialogRef<ManagebookingComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.bookingdetails = {...data};
    console.log(this.bookingdetails)
  }

  ngOnInit() {
    if(localStorage.getItem("username")){
      if(localStorage.getItem("username") == this.bookingdetails.username)
        this.disabled = false;
      else
        this.disabled = true;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  deleteMeeting(){
    if(this.disabled == false && confirm("Are you sure you want to delete?"))
    {
      this._api.deleteSlot(this.bookingdetails.id).subscribe((data)=>{
          alert("Deleted meeting successfully");
          this.closeDialog();
            this.router.navigateByUrl('/', {skipLocationChange: true})
              .then(() => this.router.navigate(['/dashboard']));
      })
    }
  }

}
