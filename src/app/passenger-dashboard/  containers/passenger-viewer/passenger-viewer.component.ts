import { Component, OnInit } from '@angular/core';
import { PassengerDashboardService } from '../../passenger-dashboard.service';
import { Passenger } from '../../models/passenger.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'passenger-viewer',
  styleUrls: ['passenger-viewer.component.scss'],
  template: `
    <div>
      <button (click)="goBack()">&lsaquo; Go back</button>
      <passenger-form
        [detail]="passenger"
        (update)="onUpdatePassenger($event)"
      ></passenger-form>
    </div>
  `,
})
export class PassengerViewerComponent implements OnInit {
  passenger!: Passenger;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private passengerService: PassengerDashboardService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((data: Params) =>
          this.passengerService.getPassenger(Number(data['id']))
        )
      )
      .subscribe((data: Passenger) => (this.passenger = data));
  }

  onUpdatePassenger(event: Passenger) {
    this.passengerService
      .updatePassengers(event)
      .subscribe((data: Passenger) => {
        this.passenger = Object.assign({}, this.passenger, event);
      });
  }

  goBack() {
    this.router.navigate(['/passengers']);
  }
}
