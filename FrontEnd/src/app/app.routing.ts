import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/services/authguard/auth.guard';
import { ProductsAuthGuard } from './shared/services/authguard/products_auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule), canActivate: [AuthGuard] },
            { path: 'manage-buondeal', loadChildren: () => import('./pages/manage-buondeal/manage-buondeal.module').then(m => m.ManageBuondealModule), canActivate: [AuthGuard] },
            { path: 'compare', loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule) },
            { path: 'wishlist', loadChildren: () => import('./pages/wishlist/wishlist.module').then(m => m.WishlistModule) },
            { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule) },
            { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
            { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
            { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule) },
            { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
            { path: 'brands', loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule) },
            { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule), canActivate: [ProductsAuthGuard] },
            { path: 'deals', loadChildren: () => import('./pages/deals/deals.module').then(m => m.DealsModule), canActivate: [ProductsAuthGuard] },
            { path: 'confirm', loadChildren: () => import('./pages/confirm-registration/confirm-registration.module').then(m => m.ConfirmRegistrationModule) },
            { path: 'await-confirm', loadChildren: () => import('./pages/await-confirm/await-confirm.module').then(m => m.AwaitConfirmModule) }
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,  // <- comment this line for disable lazy load
    // useHash: true
});
