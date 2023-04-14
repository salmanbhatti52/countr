import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'tutorial',
    loadComponent: () => import('./tutorial/tutorial.page').then( m => m.TutorialPage)
  },
  {
    path: 'setup-profile',
    loadComponent: () => import('./setup-profile/setup-profile.page').then( m => m.SetupProfilePage)
  },
  {
    path: 'social-links',
    loadComponent: () => import('./social-links/social-links.page').then( m => m.SocialLinksPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'explore',
    loadComponent: () => import('./explore/explore.page').then( m => m.ExplorePage)
  },
  {
    path: 'customer-support',
    loadComponent: () => import('./customer-support/customer-support.page').then( m => m.CustomerSupportPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'upcoming-rewards',
    loadComponent: () => import('./upcoming-rewards/upcoming-rewards.page').then( m => m.UpcomingRewardsPage)
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/notifications.page').then( m => m.NotificationsPage)
  },
];
