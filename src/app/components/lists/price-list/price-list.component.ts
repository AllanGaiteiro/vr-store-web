import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Price } from '../../../models/Price';
import { PriceService } from '../../../services/price.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AddNewPriceButtonComponent } from '../../buttons/add-button/add-new-price-button.component';
import { EditPriceButtonComponent } from '../../buttons/edit-button/edit-price-button.component';
import { DeletePriceButtonComponent } from '../../buttons/delete-button/delete-price-button.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { ErrorListComponent } from '../../error-list/error-list.component';
import { FilterPrices } from '../../../models/FilterPrices';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-price-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AddNewPriceButtonComponent,
    EditPriceButtonComponent,
    DeletePriceButtonComponent,
    SpinnerComponent,
    NotFoundComponent,
    ErrorListComponent,
  ],
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
  providers: [PriceService],
})
export class PriceListComponent implements OnInit {
  @Input() prodId: number | null = null;
  @ViewChild(MatSort) sort?: MatSort;
  isLoading = false;
  hasError = false;
  pageIndex = 0;
  pageSize = 10;
  maxLength?: number;
  filter?: FilterPrices;
  dataSource: MatTableDataSource<Price>;
  prices?: Price[];

  constructor(private priceService: PriceService) {
    this.dataSource = new MatTableDataSource(this.prices);
  }

  ngOnInit(): void {
    this.loadPrices();
  }

  loadPrices() {
    if (!this.prodId) return;
    this.priceService
      .getPrices({
        productId: this.prodId,
        page: this.pageIndex,
        limit: this.pageSize,
      })
      .subscribe({
        next: (data) => {
          this.prices = data.data;
          this.pageIndex = data.page;
          this.pageSize = data.limit;
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
        },
        error: () => {
          this.isLoading = false;
          this.hasError = true;
        },
      });
  }

  onSetList() {
    this.loadPrices();
  }

  onPageChange(event: PageEvent): void {
    this.loadPrices();
  }
}
