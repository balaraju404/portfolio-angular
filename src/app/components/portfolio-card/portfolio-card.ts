import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PORTFOLIO_URL } from '@constants/constants';
import { PortfolioCardData } from '@core/api/portfolio/portfolio-api.interface';

@Component({
 selector: 'app-portfolio-card',
 templateUrl: './portfolio-card.html',
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioCard {
 readonly portfolio = input.required<PortfolioCardData>();

 readonly initials = computed(() => {
  const name = this.portfolio().user_info.name.trim();
  const words = name.split(/\s+/);
  if (!name) return '?';

  return words
   .slice(0, 2)
   .map(word => word.charAt(0).toUpperCase())
   .join('');
 });

 readonly visibleSkills = computed(() => this.portfolio().skills.slice(0, 4));
 readonly remainingSkills = computed(() => Math.max(this.portfolio().skills.length - 4, 0));

 viewPortfolio(): void {
  window.open(`${PORTFOLIO_URL}/${this.portfolio()?.portfolio_name}`, '_blank')
 }
}