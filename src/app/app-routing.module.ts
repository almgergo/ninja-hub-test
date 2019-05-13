import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'test',
    pathMatch: 'full'
  },
  {
    path: 'test',
    loadChildren: './test/test.module#TestModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'disabled',
      useHash: true
      // enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
