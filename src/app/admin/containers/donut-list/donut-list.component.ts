import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DonutCardComponent } from '../../components/donut-card/donut-card.component';
import { Donut } from '../../models/donut';
import { DonutService } from '../../service/donut.service';

@Component({
  standalone: true,
  imports: [RouterModule, DonutCardComponent, NgIf, NgForOf],
  selector: 'donut-list',
  template: `
    <div>
      <a routerLink="new" class="btn btn--green donut-list-actions">
        New Donut
        <img src="/assets/img/icon/plus.svg" />
      </a>
      <ng-container *ngIf="donuts?.length; else nothing">
        <app-donut-card
          *ngFor="let donut of donuts; trackBy: trackById"
          [donut]="donut"
        ></app-donut-card>
      </ng-container>
      <ng-template #nothing>
        <p>nothing here</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .donut-list {
        &-actions {
          margin-bottom: 10px;
        }
      }
    `,
  ],
})
export class DonutListComponent implements OnInit {
  donuts!: Donut[];

  constructor(private donutService: DonutService) {}

  ngOnInit(): void {
    this.donutService.read().subscribe((donuts: Donut[]) => {
      this.donuts = donuts;
    });
  }

  trackById(index: Number, value: Donut) {
    return value.id;
  }
}
