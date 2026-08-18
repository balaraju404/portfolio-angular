import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { ContactInfo, PortfolioCreateRequest, Project, Service, TechStack, UserInfo } from '@core/api/portfolio/portfolio-api.interface';
import { PortfolioAPI } from '@core/api/portfolio/portfolio-api.service';
import { ToastService } from '@shared/services/toast.service';
import { UserStore } from 'src/app/store/user.store';

@Component({
 selector: 'app-portfolio-create',
 standalone: true,
 imports: [FormsModule],
 templateUrl: './portfolio-create.html',
 styleUrls: ['./portfolio-create.scss'],
})
export class PortfolioCreate {
 private readonly portfolioApi = inject(PortfolioAPI);
 private readonly router = inject(Router);
 private readonly toastService = inject(ToastService);

 readonly userStore = inject(UserStore);

 // --------------------------------------------------
 // UI state
 // --------------------------------------------------

 readonly isSubmitting = signal(false);

 // --------------------------------------------------
 // Portfolio form
 // --------------------------------------------------

 portfolioName = '';

 userInfo: UserInfo = {
  name: '',
  role: '',
  about: '',
  img: undefined,
 };

 contactInfo: ContactInfo = {
  mobile_no: '',
  email: '',
  address: '',
  alternative_number: undefined,
  alternative_email: undefined,
 };

 services: Service[] = [];

 projects: Project[] = [];

 // --------------------------------------------------
 // Service builder
 // --------------------------------------------------

 newService: Partial<Service> = {
  title: '',
  description: []
 };

 newServiceDescLine = '';

 // --------------------------------------------------
 // Project builder
 // --------------------------------------------------

 newProject: Partial<Project> = {
  title: '',
  description: '',
  url: '',
  tech_stack: []
 };

 // --------------------------------------------------
 // Tech stack builder
 // --------------------------------------------------

 newTechStack: Partial<TechStack> = {
  cat_name: '',
  skills: []
 };

 newTechStackSkill = '';

 // ==================================================
 // SERVICES
 // ==================================================

 addServiceDescription(): void {
  const description = this.newServiceDescLine.trim();

  if (!description) {
   return;
  }

  this.newService.description ??= [];

  this.newService.description.push(description);

  this.newServiceDescLine = '';
 }

 removeServiceDescription(index: number): void {
  this.newService.description?.splice(index, 1);
 }

 addService(): void {
  const title = this.newService.title?.trim();
  const description = this.newService.description ?? [];

  if (!title) {
   this.showError('Service title is required.');
   return;
  }

  if (!description.length) {
   this.showError('Add at least one service description.');
   return;
  }

  this.services.push({
   id: this.services.length + 1,
   title,
   description: [...description],
  });

  this.resetServiceForm();
 }

 removeService(index: number): void {
  this.services.splice(index, 1);
 }

 // ==================================================
 // TECH STACK
 // ==================================================

 addTechStackSkill(): void {
  const skill = this.newTechStackSkill.trim();

  if (!skill) {
   return;
  }

  this.newTechStack.skills ??= [];

  this.newTechStack.skills.push(skill);

  this.newTechStackSkill = '';
 }

 removeTechStackSkill(index: number): void {
  this.newTechStack.skills?.splice(index, 1);
 }

 confirmTechStack(): void {
  const category = this.newTechStack.cat_name?.trim();
  const skills = this.newTechStack.skills ?? [];

  if (!category) {
   this.showError('Tech stack category is required.');
   return;
  }

  if (!skills.length) {
   this.showError('Add at least one skill.');
   return;
  }

  this.newProject.tech_stack ??= [];

  this.newProject.tech_stack.push({
   id: this.newProject.tech_stack.length + 1,
   cat_name: category,
   skills: [...skills]
  });

  this.resetTechStackForm();
 }

 removeTechStack(index: number): void {
  this.newProject.tech_stack?.splice(index, 1);
 }

 // ==================================================
 // PROJECTS
 // ==================================================

 addProject(): void {
  const title = this.newProject.title?.trim();
  const description =
   this.newProject.description?.trim();

  if (!title) {
   this.showError('Project title is required.');
   return;
  }

  if (!description) {
   this.showError('Project description is required.');
   return;
  }

  this.projects.push({
   id: this.projects.length + 1,
   title,
   description,
   url: this.newProject.url?.trim(),
   tech_stack: this.cloneTechStack(
    this.newProject.tech_stack
   )
  });

  this.resetProjectForm();
 }

 removeProject(index: number): void {
  this.projects.splice(index, 1);
 }

 // ==================================================
 // SUBMIT
 // ==================================================

 submitPortfolio(): void {
  const userId = this.userStore.userId();

  if (!userId) {
   this.showError('Please login before creating a portfolio.');
   this.gotoLogin();
   return;
  }

  if (this.isSubmitting()) {
   return;
  }

  const validationError = this.validateForm();

  if (validationError) {
   this.showError(validationError);
   return;
  }

  const request = this.buildRequest(userId);
  this.isSubmitting.set(true);

  this.portfolioApi
   .create(request)
   .pipe(finalize(() => this.isSubmitting.set(false)))
   .subscribe({
    next: (response) => {
     if (!response.status) {
      this.showError(response.msg || 'Unable to create portfolio.');
      return;
     }

     this.toastService.success(response.msg || 'Portfolio created successfully.');
     this.gotoPortfolio();
    },

    error: (error) => {
     this.showError(error?.error?.msg || 'Unable to create portfolio.');
    },
   });
 }

 // ==================================================
 // VALIDATION
 // ==================================================

 private validateForm(): string | null {
  if (!this.portfolioName.trim()) {
   return 'Portfolio name is required.';
  }

  if (!this.userInfo.name?.trim()) {
   return 'User name is required.';
  }

  if (!this.userInfo.role?.trim()) {
   return 'User role is required.';
  }

  if (!this.contactInfo.email?.trim()) {
   return 'Email is required.';
  }

  if (!this.contactInfo.mobile_no?.trim()) {
   return 'Mobile number is required.';
  }

  return null;
 }

 // ==================================================
 // REQUEST
 // ==================================================

 private buildRequest(userId: string): PortfolioCreateRequest {
  return {
   user_id: userId,
   portfolio_name: this.portfolioName.trim(),
   user_info: {
    ...this.userInfo,
    name: this.userInfo.name.trim(),
    role: this.userInfo.role.trim(),
    about: this.userInfo.about?.trim(),
   },
   services: this.services.length ? this.services : undefined,
   projects: this.projects.length ? this.projects : undefined,
   contact_info: {
    ...this.contactInfo,
    mobile_no: this.contactInfo.mobile_no.trim(),
    email: this.contactInfo.email.trim(),
    address: this.contactInfo.address?.trim(),
    alternative_number: this.contactInfo.alternative_number?.trim(),
    alternative_email: this.contactInfo.alternative_email?.trim(),
   },
  };
 }

 // ==================================================
 // FORM RESET
 // ==================================================

 private resetServiceForm(): void {
  this.newService = {
   title: '',
   description: [],
  };

  this.newServiceDescLine = '';
 }

 private resetProjectForm(): void {
  this.newProject = {
   title: '',
   description: '',
   url: '',
   tech_stack: [],
  };
 }

 private resetTechStackForm(): void {
  this.newTechStack = {
   cat_name: '',
   skills: [],
  };

  this.newTechStackSkill = '';
 }

 // ==================================================
 // HELPERS
 // ==================================================

 private cloneTechStack(techStack?: TechStack[]): TechStack[] | undefined {
  if (!techStack?.length) {
   return undefined;
  }

  return techStack.map((stack) => ({
   ...stack,
   skills: [...(stack.skills ?? [])],
  }));
 }

 private showError(message: string): void {
  this.toastService.error(message);
 }

 // ==================================================
 // NAVIGATION
 // ==================================================

 gotoLogin(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login]);
 }

 gotoPortfolio(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.portfolio]);
 }
}