import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Donut } from '../../models/donut';

@Component({
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  selector: 'app-donut-form',
  template: `
    <form class="donut-form" #form="ngForm" *ngIf="donut; else loading">
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          class="input"
          [ngModel]="donut.name"
          required
          minlength="5"
          [ngModelOptions]="{ updateOn: 'blur' }"
          #name="ngModel"
        />
        <ng-container *ngIf="name.invalid && name.touched">
          <div class="donut-form-error" *ngIf="name.errors?.required">
            Name is required.
          </div>
          <div class="donut-form-error" *ngIf="name.errors?.minlength">
            Minimum length of a name is 5!
          </div>
        </ng-container>
      </label>

      <label>
        <span>Icon</span>
        <select
          name="icon"
          class="input input--select"
          [ngModel]="donut.icon"
          required
          #icon="ngModel"
        >
          <option *ngFor="let icon of icons" [ngValue]="icon">
            {{ icon }}
          </option>
        </select>
        <ng-container *ngIf="icon.invalid && icon.touched">
          <div class="donut-form-error" *ngIf="icon.errors?.required">
            Icon is required.
          </div>
        </ng-container>
      </label>

      <label>
        <span>Price</span>
        <input
          type="number"
          name="price"
          class="input"
          [ngModel]="donut.price"
          required
          minlength="1"
          #price="ngModel"
        />
        <ng-container *ngIf="price.invalid && price.touched">
          <div class="donut-form-error" *ngIf="price.errors?.required">
            Price is required.
          </div>
          <div class="donut-form-error" *ngIf="price.errors?.minlength">
            Minimum length of a name is 1!
          </div>
        </ng-container>
      </label>

      <div class="donut-form-radios">
        <p class="donut-form-radios-label">Promo:</p>
        <label>
          <input
            type="radio"
            name="promo"
            required
            [value]="undefined"
            [ngModel]="donut.promo"
          />
          <span>None</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            required
            value="new"
            [ngModel]="donut.promo"
          />
          <span>New</span>
        </label>
        <label>
          <input
            type="radio"
            name="promo"
            required
            value="limited"
            [ngModel]="donut.promo"
          />
          <span>Limited</span>
        </label>
      </div>

      <label>
        <textarea
          name="description"
          class="input input--textarea"
          required
          [ngModel]="donut.description"
          #desc="ngModel"
        ></textarea>
        <ng-container *ngIf="desc.invalid && desc.touched">
          <div class="donut-form-error" *ngIf="desc.errors?.required">
            Description is required.
          </div>
        </ng-container>
      </label>

      <button
        class="btn btn--green"
        (click)="handleCreate(form)"
        *ngIf="!isEdit"
      >
        Create
      </button>
      <button
        class="btn btn--green"
        (click)="handleUpdate(form)"
        *ngIf="isEdit"
      >
        Update
      </button>
      <button class="btn btn--green" (click)="handleDelete()" *ngIf="isEdit">
        Delete
      </button>
      <button
        type="button"
        class="btn btn--grey"
        (click)="form.resetForm()"
        *ngIf="form.touched || isEdit"
      >
        Reset Form
      </button>

      <div class="donut-form-working" *ngIf="form.valid && form.submitted">
        working...
      </div>
    </form>

    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [
    `
      .donut-form {
        &-radios {
          display: flex;
          align-content: center;
          &-label {
            margin-right: 10px;
          }
          label {
            display: flex;
            align-items: center;
            span {
              color: #444;
              margin-bottom: 0;
            }
          }
        }
        &-error {
          font-size: 12px;
          color: #e66262;
        }
        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }
      }
    `,
  ],
})
export class DonutFormComponent {
  @Input() donut!: Donut;
  @Input() isEdit!: boolean;

  @Output() create = new EventEmitter<Donut>();
  @Output() update = new EventEmitter<Donut>();
  @Output() delete = new EventEmitter<Donut>(); 

  icons: string[] = [
    'caramel-swirl',
    'glazed-fudge',
    'just-chocolate',
    'strawberry-glaze',
    'sour-supreme',
    'vanilla-sundae',
    'zesty-lemon',
  ];

  handleCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({ id: this.donut.id, ...form.value });
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleDelete() {
    if (confirm(`Really delete ${this.donut.name}?`)) {
      this.delete.emit({ ...this.donut });
    }
  }
}
