import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getAllRooms(){
    return this.http.get(env.apiUrl+'/meetingrooms',{
    }).pipe(map(data => {
            return data;
        }));
  }

  getAllSlots(){
    return this.http.get(env.apiUrl+'/timeslots',{
    }).pipe(map(data => {
            return data;
        }));
  }

  getAllBookings(mroom,mdate,mslot){
    return this.http.get(env.apiUrl+`/slots?roomId=${mroom}&bookingDate=${mdate}&slotId=${mslot}`,{
    }).pipe(map(data => {
            return data;
        }));
  }

  getAllBookingsDate(mdate){
    return this.http.get(env.apiUrl+`/slots?bookingDate=${mdate}`,{
    }).pipe(map(data => {
            return data;
        }));
  }

  getAllBookingDate(mroom,mdate){
    return this.http.get(env.apiUrl+`/bookings?roomId=${mroom}&bookingDate=${mdate}`,{
    }).pipe(map(data => {
            return data;
        }));
  }

  addSlot(mroom,mdate,mslot,musername,magenda){
    let body = {
      "roomId":parseInt(mroom),
      "bookingDate":mdate,
      "slotId":parseInt(mslot),
      "userDetails":{"username":musername,"agenda":magenda}
    }
    return this.http.post(env.apiUrl+`/slots`,body,{
    }).pipe(map(data => {
            return data;
        }));

  }

  deleteSlot(id){
    return this.http.delete(env.apiUrl+`/slots/${id}`,{
    }).pipe(map(data => {
            return data;
        }));
  }

  addBooking(){
    let body = {

    }
    return this.http.post(env.apiUrl+'/bookings',body,{
    }).pipe(map(data => {
            return data;
        }));
  }

}
