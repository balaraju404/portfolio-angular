import { Component, input } from '@angular/core';
import { PORTFOLIO_URL } from '@constants/constants';
import { PortfolioCardData } from '@core/api/portfolio/portfolio-api.interface';

@Component({
 selector: 'app-portfolio-card',
 imports: [],
 templateUrl: './portfolio-card.html',
 styles: [
  `
   :host { display: block; }
   .portfolio-card {
    border-radius: var(--radius-2xl);
    overflow: hidden;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
   }
   .interactive-card {
    transition: transform var(--duration-fast) var(--ease-default),
     box-shadow var(--duration-fast) var(--ease-default);
   }
   .interactive-card:hover {
    transform: translateY(-0.25rem);
    box-shadow: var(--shadow-lg);
   }
   .portfolio-cover { min-height: 11rem; background: var(--color-surface); position: relative; }
   .overlay-gradient { background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.85) 100%); }
   .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 9999px;
    overflow: hidden;
    border: 4px solid var(--color-surface);
    background: var(--color-surface-elevated);
    display: inline-flex;
    align-items: center;
    justify-content: center;
   }
   .avatar img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
   }
   .badge-pill {
    transition: background-color var(--duration-fast) var(--ease-default);
   }
   .badge-pill:hover {
    background-color: var(--color-surface-hover);
   }
   .portfolio-card img { display: block; }
  `
 ]
})
export class PortfolioCard {
 readonly portfolio = input<PortfolioCardData>()

 openPortfolio(): void {
  window.open(`${PORTFOLIO_URL}/${this.portfolio()?.portfolio_name}`, '_blank')
 }
}
