import { expand } from './../animations/app.animation';
import { Component, Inject, OnInit } from '@angular/core';

import { flyInOut } from '../animations/app.animation';
import { Dish } from '../shared/dish';
import { DishService } from './../services/dish.service';
import { LeaderService } from './../services/leader.service';
import { PromotionService } from './../services/promotion.service';
import { Leader } from './../shared/leader';
import { Promotion } from './../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL
  ) {}

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((dish) => (this.dish = dish), errmess => this.dishErrMess = errmess as any);
    this.promotionService
      .getFeaturedPromotion()
      .subscribe((promo) => (this.promotion = promo));
    this.leaderService
      .getFeaturedLeader()
      .subscribe((leader) => (this.leader = leader));
  }
}
