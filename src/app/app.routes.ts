import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Route[] = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'create-quiz',
        loadChildren: () =>
            import('./create/create-quiz.module').then((m) => m.CreateModule),
    },
    {
        path: 'quiz/:id',
        loadChildren: () =>
            import('./challenge/challenge.module').then(
                (m) => m.ChallengeModule
            ),
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
