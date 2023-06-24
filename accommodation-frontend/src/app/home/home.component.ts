import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationApiService } from '../api/accommodation-api.service';
import { catchError } from 'rxjs';
import { PriceType } from '../models/enum/PriceType.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  searchQuery: string = '';
  public cardData : any[] = [];

  constructor( 
    public snackBar: MatSnackBar,
    public accommodationService: AccommodationApiService,
    private router: Router
    ) { 

    this.accommodationService.getAccommodations().pipe(
        catchError(err => this.errorHandle(err))
    ).subscribe(res => {
      
      this.cardData = res;
      this.cardData.map( card =>{
        if (card.priceType === "FIXED_PER_NIGHT") card.priceType = PriceType.FIXED_PER_NIGHT;
        if (card.priceType === "PER_PERSON_PER_NIGHT") card.priceType = PriceType.PER_PERSON_PER_NIGHT
        card.photographs.push("data:image/webp;base64,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")
      })
    }); 
  }
  ngOnInit(): void {

  }

  clearSearch() {
    this.searchQuery = '';
  }

  searchClicked() {
    console.log(this.searchQuery);
  }

  async errorHandle(error: any) {
    console.log(error.error.message)
    this.snackBar.open(error.error.message, 'Dismiss', { duration: 3000 });
  }

  openAccommodation(id: number){
    this.router.navigate(['/accommodation-display',id]); 
  }

  getRandomImage(card: any): string {
    const images = card.photographs;
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
}
