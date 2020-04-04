import { Component, OnInit } from '@angular/core';
import { AddbookingComponent } from '../addbooking/addbooking.component';
import { ManagebookingComponent } from '../managebooking/managebooking.component';
import {  MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { BookingService } from '@core/services/booking.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns:any;
  roomDetails:any;
  viewMeetingForm: FormGroup;
  filterMeetingForm: FormGroup;
  min:any;
  max:any;
  submitted = false;
  dataloaded = false;

  constructor(private formBuilder: FormBuilder,private _api:BookingService,private datePipe: DatePipe,private dialog: MatDialog) { }

  ngOnInit() {
    this.getMeetingSlots();
    this.getMeetingRooms();
    this.max = new Date();
    this.max.setDate(this.max.getDate() + 7);
    this.min = new Date();

    if(this.min.getDay() == 0)
      this.min = this.min.setDate(this.min.getDate()+1);
    if(this.min.getDay() == 6)
      this.min.setDate(this.min.getDate()+2);   
    this.viewMeetingForm = this.formBuilder.group({
      meetingdate:[this.min,Validators.required],
      meetingroom:["all",Validators.required],
    });
    this.filterMeetingForm = this.formBuilder.group({
      meetingroom:["all",Validators.required],
    });
  }

  get f() { return this.viewMeetingForm.controls; }
  get f2() { return this.filterMeetingForm.controls; }

  myFilter = (d: Date): Boolean => {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }
  
  getMeetingBookings(){
    this.submitted = true;
    if (this.viewMeetingForm.invalid) {
        return;
    }
    let meetingdate = this.datePipe.transform(this.f.meetingdate.value, 'yyyy-MM-dd');

    this._api.getAllBookingsDate(meetingdate).subscribe((bookingdata:any)=>{
      this.dataloaded = true;
      if(bookingdata.length > 0){
        this.roomDetails.forEach(room => {
          console.log(room.roomId)
          room.bookingDetails = [];
          let slotdata = bookingdata.filter((booking)=>booking.roomId == room.roomId);
            this.displayedColumns.forEach(slot => {
              let filterdata = slotdata.filter((bookingslot)=>bookingslot.slotId == slot.slotId)
              if(filterdata.length > 0)
                room.bookingDetails.push(...filterdata)
              else
                room.bookingDetails.push({"slotId":slot.slotId})  
            });
          console.log("slotdata----"+JSON.stringify(this.roomDetails));
        });
      }else{
        console.log("inside else-----")
        this.roomDetails.forEach(room => {
          room.bookingDetails = [];
          this.displayedColumns.forEach(slot => {
              room.bookingDetails.push({"slotId":slot.slotId})  
          });
        });
      }
    },err => {
      this.dataloaded = false;
      console.log("inside catch error",err);
    })
  }

  getMeetingSlots(){
    this._api.getAllSlots().subscribe((slotdata:any)=>{
      if(slotdata){
        this.displayedColumns = slotdata;
      }
    },err => {
      console.log("inside catch error",err);
    })
  }

  getMeetingRooms(){
    this._api.getAllRooms().subscribe((data:any)=>{
      if(data){
        this.dataloaded = true;
        this.roomDetails = data;
        this.getMeetingBookings();
      }
    },err => {
      this.dataloaded = false;
      console.log("inside catch error",err);
    })
  }

  openAddModal(){
   this.dialog.open(AddbookingComponent,{
      panelClass: 'add-modal',
      disableClose: true
    });
  }

  openManageModal(details,slotId){
    console.log(JSON.stringify(details));
    console.log(slotId);
    let bookingdetails = {
      id:details.id,
      username:details.userDetails.username,
      agenda:details.userDetails.agenda,
    }
    this.dialog.open(ManagebookingComponent,{
      panelClass: 'manage-modal',
      disableClose: true,
      data: bookingdetails
    });

  }

}
