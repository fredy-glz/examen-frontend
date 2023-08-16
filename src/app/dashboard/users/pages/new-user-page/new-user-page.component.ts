import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { NewUser, UsersData } from '../../interfaces/users.interface';
import { GroupsService } from '../../../groups/services/groups.service';
import { GroupData } from '../../../groups/interfaces/groups.interface';

interface Puesto {
  id: number;
  description: string;
}

@Component({
  selector: 'app-new-user-page',
  templateUrl: './new-user-page.component.html',
  styleUrls: ['./new-user-page.component.css'],
})
export class NewUserPageComponent {
  public userForm: FormGroup = this.fb.group({
    usuario: ['', Validators.required],
    nombre: ['', Validators.required],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    departamento: ['', Validators.required],
    puesto: ['', Validators.required],
  });
  public filteredGroups: Observable<any[]> | undefined;
  public groups: GroupData[] = [];
  public filteredPuestos: Observable<any[]> | undefined;
  public puestos: Puesto[] = [{ id: 1, description: 'ADMIN' }];

  constructor(
    private snackbar: MatSnackBar,
    private usersService: UsersService,
    private groupsService: GroupsService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.groupsService
      .getGroups()
      .subscribe((resp) => (this.groups = resp.dataList));

    this.filteredGroups = this.userForm.get('departamento')?.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this.filterGroups(state) : this.groups.slice()))
    );
    this.filteredPuestos = this.userForm.get('puesto')?.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this.filterPuestos(state) : this.puestos.slice()))
    );
  }

  get currentGroup(): UsersData {
    const user = this.userForm.value as UsersData;
    return user;
  }

  get fullName(): string {
    const { controls } = this.userForm;
    const name = `${controls['nombre'].value} ${controls['apellidoPaterno'].value} ${controls['apellidoMaterno'].value}`;
    return name;
  }

  filterGroups(name: string) {
    return this.groups.filter((groups) =>
      groups.grupo.toLowerCase().includes(name.toLowerCase())
    );
  }

  filterPuestos(name: string) {
    return this.puestos.filter((puesto) =>
      puesto.description.toLowerCase().includes(name.toLowerCase())
    );
  }

  isValidField(field: string): boolean | null {
    return (
      this.userForm.controls[field].errors &&
      this.userForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.userForm.controls[field]) return null;
    return 'Este campo es requerido';
  }

  onBack(): void {
    this.router.navigate(['/dashboard/users']);
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const puestoValue = this.puestos.find(
      (puesto) => puesto.description === this.userForm.controls['puesto'].value
    )?.id;

    const body: NewUser = {
      ...this.userForm.value,
      nombreCompleto: this.fullName,
      correo: 'prueba2@gmail.com',
      grupoFk: '1',
      sucursal: '1',
      estatus: '0',
      lote: '',
      fechaDesactivacion: '2023-03-02',
      fechaUltAcceso: '2023-03-02',
      comentarios: 'prueba desde postman',
      modificacion: 'prueba',
      fechaModificacion: '2023-03-02',
      password: '123',
      puesto: puestoValue?.toString(),
    };

    this.usersService.addUser(body).subscribe((resp) => {
      if (!resp.success) {
        this.showSnackbar(`${resp.message}`);
        return;
      }
      this.showSnackbar(`${resp.message}`);
      this.router.navigate(['/dashboard/users']);
    });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'Ok', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2500,
    });
  }
}
