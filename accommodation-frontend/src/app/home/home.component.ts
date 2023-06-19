import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchQuery: string = '';

  constructor() { }

  clearSearch() {
    this.searchQuery = '';
  }

  searchClicked() {
    console.log(this.searchQuery);
  }
}
