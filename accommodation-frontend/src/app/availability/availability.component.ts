import { Component } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AccommodationService } from '../services/accommodation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent {

  displayedColumns: string[] = ['id', 'startDate', 'endDate', 'actions'];

  availabilities : any[] = []
  accommodationId: string | undefined | null

  selectedId: string | undefined;
  displayed: string | undefined;

  constructor(private errorHandler: ErrorHandlerService,private accommodationService: AccommodationService,
     private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.accommodationId = this.route.snapshot.paramMap.get('id')
    this.fetchAvailabilities()
  }

  fetchAvailabilities() {
    if (this.accommodationId === undefined || this.accommodationId === null) {
      throw new Error("Error while fetching availabilities")
    }
    this.accommodationService.getAccommodationAvailabilities(this.accommodationId)
    .subscribe((res: any)=> {
      console.log(res);
    
      if (res.size !== 0) {
        res = res.sort((a:any, b:any) => a.id > b.id ? 1 : -1)
      }
      this.availabilities = res;
    },
     err => this.errorHandler.errorHandle(err))
  } 

  delete(id: string) {
    if (this.accommodationId === undefined || this.accommodationId === null) {
      throw new Error("Error while deleting availability")
    }
    this.accommodationService.deleteAvailability(this.accommodationId, id)
      .subscribe((res: any)=> {
        this.fetchAvailabilities();
      },
      err => this.errorHandler.errorHandle(err))
  }

  display(id: any, type: string) {
    this.displayed = type;
    this.selectedId = id;
  }

  handleHideEvent() {
    this.displayed = undefined;
  }

  handleEvent() {
    this.displayed = undefined;
    this.fetchAvailabilities();
  }
  
}
