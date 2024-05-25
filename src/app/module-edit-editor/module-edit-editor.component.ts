import {Component, Input, OnInit} from '@angular/core';
import {ModuleDetail, ModuleTranslation} from "../../shared/module/module.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {TextAutocompleteService} from "../../shared/text-autocomplete/text-autocomplete.service";

@Component({
  selector: 'app-module-edit-editor',
  standalone: true,
  imports: [
    InputNumberModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    AutoCompleteModule
  ],
  providers: [TextAutocompleteService],
  templateUrl: './module-edit-editor.component.html',
  styleUrl: './module-edit-editor.component.sass'
})
export class ModuleEditEditorComponent implements OnInit{

  constructor(private autocomplete: TextAutocompleteService) {
  }

    ngOnInit(): void {
      this.autocomplete.getAutocompleteSuggestions(this.languageId).subscribe((suggestions) => {
          this.suggestions = suggestions;
          this.filteredSuggestions = suggestions;
      });
    }

  @Input() module!: ModuleDetail;
  @Input() languageId!: number;
  @Input() moduleText!: ModuleTranslation;

    suggestions!: any[];
    filteredSuggestions!: any[];

    search(event: AutoCompleteCompleteEvent) {
        this.filteredSuggestions = this.suggestions.filter((suggestion) => {
            return suggestion.toLowerCase().includes(event.query.toLowerCase());
        });
    }
}