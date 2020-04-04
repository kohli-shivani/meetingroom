# MeetingroomBooking

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.26.

## Steps

Note: Json data server is used to mock the backend
1. Run npm install
2. json-server --watch db.json
3. Login with test credentials specified in db.json
   test1/test1,test2/test2
4. By default today's meeting schedule will be shown,
   If today's date is either Saturday or Sunday, then by default the next Monday's schedule will be shown
5. By default all meeting room schedule will be shown, user can filter using    dropdown
6. On click of schedule meeting, user has to enter all details, if the slot selected is already booked error will be shown, if not booking will be scheduled 
7. On click of Booked meeting from the table, the meeting details will be shown, along with delete button 
8. If the current username logged in with and username of the booking is same then only user will  be allowed to delete the booking       

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
