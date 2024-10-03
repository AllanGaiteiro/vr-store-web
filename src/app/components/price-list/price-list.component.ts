import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Price } from '../../models/Price';
import { PriceService } from '../../services/price.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AddNewPriceButtonComponent } from '../buttons/add-button/add-new-price-button.component';
import { EditPriceButtonComponent } from '../buttons/edit-button/edit-price-button.component';
import { DeletePriceButtonComponent } from '../buttons/delete-button/delete-price-button.component';

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    AddNewPriceButtonComponent,
    EditPriceButtonComponent,
    DeletePriceButtonComponent,
  ],
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
  providers: [PriceService],
})
export class PriceListComponent implements OnInit {
  @Input() prodId: number | null = null;
  prices: Price[] = [];
  dataSource: MatTableDataSource<Price>;

  @ViewChild(MatSort) sort?: MatSort;
  page?: number;
  limit?: number;
  maxLength?: number;

  constructor(private priceService: PriceService) {
    this.dataSource = new MatTableDataSource(this.prices);
  }

  ngOnInit(): void {
    this.loadPrices();
  }

  loadPrices() {
    if (!this.prodId) return;
    this.priceService
      .getPrices({ productId: this.prodId })
      .subscribe((data) => {
        this.prices = data.data;
        this.page = data.page;
        this.limit = data.limit;
        this.maxLength = data.length;
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

  onSetPriceList() {
    this.loadPrices();
  }
}
