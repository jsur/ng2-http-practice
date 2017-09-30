import { 
  Component, 
  OnInit, 
  Input
} from '@angular/core';
import { SearchResult } from './youtube-search.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './youtube-search-result.component.html'
})
export class SearchResultComponent implements OnInit {
  @Input() result: SearchResult;
  
  constructor() { }
  
  ngOnInit() { }

}