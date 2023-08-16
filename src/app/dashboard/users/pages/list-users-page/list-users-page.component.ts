import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { UsersService } from '../../services/users.service';
import { UsersData } from '../../interfaces/users.interface';

const initialData: UsersData[] = [];

@Component({
  selector: 'app-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.css'],
})
export class ListUsersPageComponent implements OnInit {
  public displayedColumns: string[] = [
    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'correo',
    'nombreGrupo',
  ];
  public dataSource = new MatTableDataSource(initialData);
  public resultsLength: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(({ dataList }) => {
      this.dataSource = new MatTableDataSource(dataList);
    });

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return (
        data.nombre.toLowerCase().includes(filter) ||
        data.apellidoPaterno.toLowerCase().includes(filter) ||
        data.apellidoMaterno.toLowerCase().includes(filter) ||
        data.correo.toLowerCase().includes(filter) ||
        data.nombreGrupo.toLowerCase().includes(filter)
      );
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
