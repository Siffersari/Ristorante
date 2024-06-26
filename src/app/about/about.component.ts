import { expand } from './../animations/app.animation';
import { Component, Inject, OnInit } from '@angular/core';

import { flyInOut } from '../animations/app.animation';
import { LeaderService } from './../services/leader.service';
import { Leader } from './../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  constructor(private leaderService: LeaderService, @Inject('BaseURL') private BaseURL) {}

  ngOnInit(): void {
    this.leaderService
      .getLeaders()
      .subscribe((leaders) => (this.leaders = leaders));
  }
}
