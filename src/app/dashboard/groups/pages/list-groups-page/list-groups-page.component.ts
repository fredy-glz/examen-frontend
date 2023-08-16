import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { GroupData } from '../../interfaces/groups.interface';
import { GroupsService } from '../../services/groups.service';

const initialData: GroupData[] = [];

@Component({
  selector: 'app-list-groups-page',
  templateUrl: './list-groups-page.component.html',
  styleUrls: ['./list-groups-page.component.css'],
})
export class ListGroupsPageComponent implements OnInit {
  public displayedColumns: string[] = ['numero', 'grupo', 'descripcion'];
  public dataSource = new MatTableDataSource(initialData);
  public resultsLength: number = 0;

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.groupsService.getGroups().subscribe(({ dataList }) => {
      this.dataSource = new MatTableDataSource(dataList);
    });

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return (
        data.descripcion.toLowerCase().includes(filter) ||
        data.numero.toString().includes(filter)
      );
    };
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
