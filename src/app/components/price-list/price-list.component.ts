import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Price } from '../../models/Price';
import { PriceService } from '../../services/price.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddButtonComponent } from '../button/add-button/add-button.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    AddButtonComponent,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
  providers: [PriceService],
})
export class PriceListComponent implements OnInit {
  @Input() prodId?: number;
  prices: Price[] = [];
  dataSource: MatTableDataSource<Price>; 

  @ViewChild(MatSort) sort?: MatSort;

  constructor(private priceService: PriceService) {
    this.dataSource = new MatTableDataSource(this.prices);
  }

  ngOnInit(): void {
    this.loadPrices();
  }

  loadPrices() {
    this.priceService
    .getPrices({ productId: this.prodId })
    .subscribe((data) => {
      this.prices = data;
      this.dataSource.data = this.prices;
      this.dataSource.sort = this.sort || this.dataSource.sort; 
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'store':
            return item.store.description; 
          case 'priceValue':
            return item.priceValue; 
          default:
            return item.priceValue;
        }
      };
    });
  }
}
