import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Detail } from './components/detail/detail';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'pokemon/:name', component: Detail},
    { path: '**', redirectTo: '' },
];
