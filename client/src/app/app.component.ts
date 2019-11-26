import { Component, OnInit, ViewChild } from '@angular/core'
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
} from '@angular/material'
import * as moment from 'moment';

import { ApiService } from './services/api.service'
import { Row } from './models/row.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'frontend'
  rows: any
  displayedColumns: string[] = [
    'id',
    'name',
    'status',
    'description',
    'delta',
    'createdon',
  ]

  @ViewChild(MatSort, { static: false }) sort: MatSort
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getData().subscribe(response => {
      this.rows = new MatTableDataSource<Row>(response)
      this.rows.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'createdon':
            return item.createdOn
          default:
            return item[property]
        }
      }
      this.rows.paginator = this.paginator
      this.rows.sort = this.sort
    })
  }

  applyFilter(filterValue: string) {
    this.rows.filter = filterValue.trim().toLowerCase()
  }

  searchByTerm(searchTerm: string) {
    this.rows.filter = searchTerm.trim().toLowerCase()
  }

  checkDateFormat(date: any) {
    console.log(moment(date).isValid())
    return moment(date).isValid() === false ? 'invalid date in source data' : moment.unix(date).toDate()
  }
}
