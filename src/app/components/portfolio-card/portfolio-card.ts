import { Component, input } from '@angular/core';
import { PortfolioCardData } from '@core/api/portfolio/portfolio-api.interface';

@Component({
 selector: 'app-portfolio-card',
 imports: [],
 templateUrl: './portfolio-card.html',
 styles: [
  `
   :host { display: block; }
   .portfolio-card { border-radius: 1.2rem; overflow: hidden; }
   .avatar { min-width: 4rem; min-height: 4rem; }
   .chip { transition: background-color 0.2s ease; }
   .chip:hover { background-color: #e2e8f0; }
   .portfolio-card img { display: block; }
  `
 ]
})
export class PortfolioCard {
 readonly portfolio = input<PortfolioCardData>()
}
