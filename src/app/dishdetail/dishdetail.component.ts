import { Comment } from './../shared/comment';
import { Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dishForm: FormGroup;
  dishFeedback: Comment;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  @ViewChild('dishform') dishFormDirective;
  dishcopy: Dish;

  formErrors = {
    author: '',
    comment: '',
  };

  validationMessages = {
    author: {
      required: 'Author name is required.',
      minlength: 'Author name must be at least 2 characters long.',
    },
    comment: {
      required: 'Comment is required.',
    },
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params.id)))
      .subscribe((dish) => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
      }, errMess => this.errMess = errMess as any);
  }

  setPrevNext(dishId: string): void {
    const index = this.dishIds.indexOf(dishId);

    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];

    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.dishForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required]],
    });

    this.dishForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any): any {
    if (!this.dishForm) {
      return;
    }

    const form = this.dishForm;

    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';

        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];

          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(): void {
    this.dishFeedback = this.dishForm.value;
    this.dishFeedback.date = new Date().toISOString();

    this.dishcopy.comments.push(this.dishFeedback);
    this.dishService.putDish(this.dishcopy).subscribe(dish => {
      this.dish = dish; this.dishcopy = dish;
    },
    errmess => {this.dish = null; this.dishcopy = null; this.errMess = errmess as any; })
    this.dishFormDirective.resetForm();
    this.dishForm.reset({
      name: '',
      rating: 5,
      comment: '',
    });

  }
}
