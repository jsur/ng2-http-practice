import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { SearchResult } from './youtube-search.model';
import { YouTubeSearchService } from './youtube-search.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-box',
  template: `
    <input type="text" class="form-control" style="width:100%;" placeholder="Search" autofocus>
  `
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(
    private youtube: YouTubeSearchService, 
    private el: ElementRef) {}

    ngOnInit(): void {
      Observable.fromEvent(this.el.nativeElement, 'keyup')
        .map((e: any) => e.target.value)
        .filter((text: string) => text.length > 1)
        .debounceTime(250)
        .do(() => this.loading.emit(true))
        .map((query: string) => this.youtube.search(query))
        .switch()
        .subscribe(
          (results: SearchResult[]) => { // on success
            this.loading.emit(false);
            this.results.emit(results);
          },
          (err: any) => { // on error
            console.log(err);
            this.loading.emit(false);
          },
          () => { // on completion
            this.loading.emit(false);
          }
        );
      }
  }