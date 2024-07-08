import {Component, OnInit} from '@angular/core';
import {PickListModule} from "primeng/picklist";
import {JobService} from "../../shared/job/job.service";

@Component({
  selector: 'app-pdf-structure',
  standalone: true,
  imports: [
    PickListModule
  ],
  providers: [JobService],
  templateUrl: './pdf-structure.component.html',
  styleUrl: './pdf-structure.component.sass'
})

export class PdfStructureComponent implements OnInit {
  availableItems: PdfStructureItem[] | undefined;
  activeItems: PdfStructureItem[] | undefined;


  constructor(
    private jobService: JobService
  ) {
    this.activeItems = [];
    this.availableItems = [];
  }

  ngOnInit(): void {
    this.jobService.getStructure().subscribe((data: PdfStructureItem[]) => {
      const newTargetItems = data;

      // fill with spread operator
      this.activeItems = [...newTargetItems];
    });
  }

}

interface Field {
    id: number;
    path: string;
    suffix: string;
    moduleBased: boolean;
    subModuleBased: boolean;
}

interface Path {
    id: number;
    pdfStructureItemId: number;
    fieldId: number;
    position: number;
    field: Field;
}

interface Translation {
    id: number;
    name: string;
    languageId: number;
    pdfStructureItemId: number;
}

export interface PdfStructureItem {
    id: number;
    pdfStructureId: number;
    position: number;
    takeTwoColumns: boolean;
    moduleBased: boolean;
    subModuleBased: boolean;
    paths: Path[];
    translations: Translation[];
}
