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
  },  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'forgotpassword',
    loadComponent: () => import('./forgotpassword/forgotpassword.page').then( m => m.ForgotpasswordPage)
  },
  {
    path: 'otp',
    loadComponent: () => import('./otp/otp.page').then( m => m.OtpPage)
  },
  {
    path: 'resetpassword',
    loadComponent: () => import('./resetpassword/resetpassword.page').then( m => m.ResetpasswordPage)
  },
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog.page').then( m => m.BlogPage)
  },
  {
    path: 'changepassword',
    loadComponent: () => import('./changepassword/changepassword.page').then( m => m.ChangepasswordPage)
  },
  {
    path: 'deleteaccount',
    loadComponent: () => import('./deleteaccount/deleteaccount.page').then( m => m.DeleteaccountPage)
  },
  {
    path: 'partnersurveys',
    loadComponent: () => import('./partnersurveys/partnersurveys.page').then( m => m.PartnersurveysPage)
  },
  {
    path: 'partners',
    loadComponent: () => import('./partners/partners.page').then( m => m.PartnersPage)
  },

];
