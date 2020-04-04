import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material";
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
      CommonModule,
      MatDialogModule,
      MatIconModule,
      MatCardModule
    ],
    exports: [
      CommonModule,
      MatDialogModule,
      MatIconModule,
      MatCardModule
    ]
})

export class MaterialModule {}