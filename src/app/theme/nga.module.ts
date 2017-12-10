import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent,
  PaginationComponent
} from './components';

const NGA_COMPONENTS = [
  TableComponent,
  PaginationComponent
];

@NgModule({
  declarations: [
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...NGA_COMPONENTS
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
      ]
    };
  }
}
