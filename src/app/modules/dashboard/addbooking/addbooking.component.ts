import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';
import { BookingService } from '@core/services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.scss']
})
export class AddbookingComponent implements OnInit {

  addMeetingForm: FormGroup;
  submitted = false;
  meetingroomOptions:any;
  max : any;
  min:any;
  meetingslotOptions:any;
  
  constructor(private router:Router,private _api:BookingService,private datePipe: DatePipe,private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddbookingComponent>) { }

  ngOnInit() {
    

    this.max = new Date();
    this.max.setDate(this.max.getDate() + 7);
    this.min = new Date();
    this.getMeetingRooms();
    this.getMeetingSlots();
    let user;
    console.log(localStorage.getItem("username"))
    if(localStorage.getItem("username")){
      user = localStorage.getItem("username");
    }

    this.addMeetingForm = this.formBuilder.group({
      username:[user,[Validators.required,Validators.pattern('[a-zA-Z0-9]{3,}')]],
      meetingroom:['',Validators.required],
      meetingdate:['',Validators.required],
      meetingtime:['',Validators.required],
      meetingagenda:['',Validators.required]
    });


  }

  myFilter = (d: Date): Boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  getMeetingRooms(){
    this._api.getAllRooms().subscribe((data:any)=>{
      if(data){
        console.log("data---"+JSON.stringify(data))
        this.meetingroomOptions = data;
      }
    },err => {
      console.log("inside catch error",err);
    })
  }

  getMeetingSlots(){
    this._api.getAllSlots().subscribe((slotdata:any)=>{
      if(slotdata){
        console.log("data---"+JSON.stringify(slotdata))
        this.meetingslotOptions = slotdata;
      }
    },err => {
      console.log("inside catch error",err);
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  get f() { return this.addMeetingForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addMeetingForm.invalid) {
        return;
    }
    let meetingdate = this.datePipe.transform(this.f.meetingdate.value, 'yyyy-MM-dd');

    this._api.getAllBookings(this.f.meetingroom.value,meetingdate,this.f.meetingtime.value).subscribe((bookingdata:any)=>{
      if(bookingdata.length > 0){
        alert("Room already booked for timeslot!")
      }
      //add the booking
      else{
        //add booking
        this._api.addSlot(this.f.meetingroom.value,meetingdate,this.f.meetingtime.value,this.f.username.value,this.f.meetingagenda.value).subscribe((slotdata:any)=>{
          if(slotdata.id){
            alert("Meeting Scheduled successfully!");
            this.closeDialog();
            this.router.navigateByUrl('/', {skipLocationChange: true})
              .then(() => this.router.navigate(['/dashboard']));
          }
        },err => {
          console.log("inside catch error",err);
        })
      }
    },err => {
      console.log("inside catch error",err);
    })
  }

}
