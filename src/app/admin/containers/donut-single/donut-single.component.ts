import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonutFormComponent } from '../../components/donut-form/donut-form.component';
import { Donut } from '../../models/donut';
import { DonutService } from '../../service/donut.service';

@Component({
  standalone: true,
  imports: [DonutFormComponent],
  selector: 'donut-single',
  template: `
    <div>
      <app-donut-form
        [donut]="donut"
        [isEdit]="isEdit"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></app-donut-form>
    </div>
  `,
  styles: [],
})
export class DonutSingleComponent {
  donut!: Donut;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donuteService: DonutService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = this.route.snapshot.data['isEdit'];

    this.donuteService.readOne(id).subscribe((donut: Donut) => {
      this.donut = donut;
    });
  }

  onCreate(donut: Donut) {
    this.donuteService.create(donut).subscribe((donut) => {
      this.router.navigate(['admin', 'donuts', donut.id]);
    });
  }

  onUpdate(donut: Donut) {
    this.donuteService.update(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => console.log('onUpdate error: ', err),
    });
  }

  onDelete(donut: Donut) {
    this.donuteService.delete(donut).subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => console.log('onDelete error: ', err),
    });
  }
}
