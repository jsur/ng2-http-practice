import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SimpleHttpComponent } from './components/simple-http/simple-http.component';
import { YoutubeSearchComponent } from './components/youtube-search/youtube-search.component';
import { SearchBoxComponent } from './components/youtube-search/youtube-searchbox.component';
import { SearchResultComponent } from './components/youtube-search/youtube-search-result.component';

import { youTubeSearchInjectables } from './components/youtube-search/youtube-search.injectables';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    YoutubeSearchComponent,
    SearchBoxComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    youTubeSearchInjectables
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
