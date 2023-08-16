import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GroupData } from '../../interfaces/groups.interface';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-new-group-page',
  templateUrl: './new-group-page.component.html',
  styleUrls: ['./new-group-page.component.css'],
})
export class NewGroupPageComponent {
  public groupForm: FormGroup = this.fb.group({
    numero: ['', Validators.required],
    grupo: ['', Validators.required],
    descripcion: ['', Validators.required],
    estatus: [1],
    timeOut: [10],
  });

  constructor(
    private snackbar: MatSnackBar,
    private groupsService: GroupsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  get currentGroup(): GroupData {
    const group = this.groupForm.value as GroupData;
    return group;
  }

  isValidField(field: string): boolean | null {
    return (
      this.groupForm.controls[field].errors &&
      this.groupForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.groupForm.controls[field]) return null;
    return 'Este campo es requerido';
  }

  onBack(): void {
    this.router.navigate(['/dashboard/groups']);
  }

  onSubmit(): void {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      return;
    }

    this.groupsService
      .addGroup({
        ...this.currentGroup,
        numero: Number(this.currentGroup.numero),
      })
      .subscribe((resp) => {
        if (!resp.success) {
          this.showSnackbar(`${resp.message}`);
          return;
        }
        this.showSnackbar(`${resp.message}`);
        this.router.navigate(['/dashboard/groups']);
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
