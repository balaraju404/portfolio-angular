import { Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioAPI } from '@core/api/portfolio/portfolio-api.service';
import { StorageService } from '@shared/services/storage.service';
import { PortfolioCreateRequest, UserInfo, Service, Project, TechStack, ContactInfo } from '@core/api/portfolio/portfolio-api.interface';
import { APP_ROUTES, LAYOUT_ROUTES } from '@constants/route.constants';
import { STORAGE_CONSTANTS } from '@constants/storage.constants';
import { UserData } from '@core/api/login/login-api.interface';

@Component({
 selector: 'app-portfolio-create',
 standalone: true,
 imports: [NgClass, FormsModule],
 templateUrl: './portfolio-create.html',
 styleUrls: ['./portfolio-create.scss']
})
export class PortfolioCreate implements OnInit {
 private readonly portfolioApi = inject(PortfolioAPI);
 private readonly storageService = inject(StorageService);
 private readonly router = inject(Router);

 // Form state
 portfolioName = '';
 userInfo: UserInfo = {
  name: '',
  role: '',
  about: '',
  img: undefined
 };
 services: Service[] = [];
 projects: Project[] = [];
 contactInfo: ContactInfo = {
  mobile_no: '',
  email: '',
  address: '',
  alternative_number: undefined,
  alternative_email: undefined
 };

 // UI state
 isSubmitting = false;
 feedbackMessage = '';
 feedbackType: 'success' | 'error' = 'success';
 userId = '';

 // Temporary service/project forms
 newService: Partial<Service> = { title: '', description: [] };
 newServiceDescLine = '';
 newProject: Partial<Project> = { title: '', description: '', url: '', tech_stack: [] };
 newTechStack: Partial<TechStack> = { cat_name: '', skills: [] };
 newTechStackSkill = '';

 ngOnInit() {
  const userData = this.storageService.getItem<UserData>(STORAGE_CONSTANTS.token)
  if (!userData) {
   this.gotoLogin()
   return;
  }
  this.userId = userData?.user_id || '';
 }

 addServiceDescription() {
  if (!this.newServiceDescLine.trim()) return;
  if (!this.newService.description) this.newService.description = [];
  this.newService.description.push(this.newServiceDescLine);
  this.newServiceDescLine = '';
 }

 removeServiceDescription(index: number) {
  if (this.newService.description) {
   this.newService.description.splice(index, 1);
  }
 }

 addService() {
  if (!this.newService.title?.trim() || !this.newService.description?.length) {
   this.setFeedback('Service must have a title and at least one description line.', 'error');
   return;
  }
  this.services.push({
   id: this.services.length + 1,
   title: this.newService.title,
   description: this.newService.description
  });
  this.newService = { title: '', description: [] };
  this.newServiceDescLine = '';
 }

 removeService(index: number) {
  this.services.splice(index, 1);
 }

 addTechStack() {
  if (!this.newTechStack.cat_name?.trim() || !this.newTechStackSkill.trim()) {
   this.setFeedback('Tech stack must have a category and at least one skill.', 'error');
   return;
  }
  if (!this.newTechStack.skills) this.newTechStack.skills = [];
  this.newTechStack.skills.push(this.newTechStackSkill);
  this.newTechStackSkill = '';
 }

 removeSkill(stackIndex: number, skillIndex: number) {
  if (this.newProject.tech_stack && this.newProject.tech_stack[stackIndex]) {
   this.newProject.tech_stack[stackIndex].skills?.splice(skillIndex, 1);
  }
 }

 confirmTechStack() {
  if (!this.newTechStack.cat_name?.trim()) {
   this.setFeedback('Tech stack category is required.', 'error');
   return;
  }
  if (!this.newProject.tech_stack) this.newProject.tech_stack = [];
  this.newProject.tech_stack.push({
   id: this.newProject.tech_stack.length + 1,
   cat_name: this.newTechStack.cat_name,
   skills: this.newTechStack.skills || []
  });
  this.newTechStack = { cat_name: '', skills: [] };
  this.newTechStackSkill = '';
 }

 removeTechStack(index: number) {
  if (this.newProject.tech_stack) {
   this.newProject.tech_stack.splice(index, 1);
  }
 }

 addProject() {
  if (!this.newProject.title?.trim() || !this.newProject.description?.trim()) {
   this.setFeedback('Project must have a title and description.', 'error');
   return;
  }
  this.projects.push({
   id: this.projects.length + 1,
   title: this.newProject.title,
   description: this.newProject.description,
   url: this.newProject.url,
   tech_stack: this.newProject.tech_stack
  });
  this.newProject = { title: '', description: '', url: '', tech_stack: [] };
 }

 removeProject(index: number) {
  this.projects.splice(index, 1);
 }

 setFeedback(message: string, type: 'success' | 'error') {
  alert(message)
  // this.feedbackMessage = message;
  // this.feedbackType = type;
  // setTimeout(() => {
  //  this.feedbackMessage = '';
  // }, 5000);
 }

 submitPortfolio() {
  if (!this.portfolioName.trim()) {
   this.setFeedback('Portfolio name is required.', 'error');
   return;
  }
  if (!this.userInfo.name?.trim() || !this.userInfo.role?.trim()) {
   this.setFeedback('User name and role are required.', 'error');
   return;
  }
  if (!this.contactInfo.email?.trim() || !this.contactInfo.mobile_no?.trim()) {
   this.setFeedback('Email and mobile number are required.', 'error');
   return;
  }

  this.isSubmitting = true;
  const request: PortfolioCreateRequest = {
   user_id: this.userId,
   portfolio_name: this.portfolioName,
   user_info: this.userInfo,
   services: this.services.length > 0 ? this.services : undefined,
   projects: this.projects.length > 0 ? this.projects : undefined,
   contact_info: this.contactInfo
  };

  this.portfolioApi.create(request).subscribe({
   next: (response) => {
    this.isSubmitting = false;
    this.setFeedback('Portfolio created successfully!', 'success');
    setTimeout(() => {
     this.gotoPortfolio()
    }, 2000);
   },
   error: (err) => {
    this.isSubmitting = false;
    this.setFeedback(`Error: ${err?.error?.msg || 'Failed to create portfolio'}`, 'error');
   }
  });
 }

 gotoLogin(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.login])
 }
 gotoPortfolio(): void {
  this.router.navigate([APP_ROUTES.layout, LAYOUT_ROUTES.portfolio])
 }
}