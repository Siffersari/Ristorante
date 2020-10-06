import { Component, OnInit } from '@angular/core';

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
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService
  ) {}

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((dish) => (this.dish = dish));
    this.promotionService
      .getFeaturedPromotion()
      .subscribe((promo) => (this.promotion = promo));
    this.leaderService
      .getFeaturedLeader()
      .subscribe((leader) => (this.leader = leader));
  }
}
