import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SearchResult } from './youtube-search.model';

/**
 * YouTubeService connects to the YouTube API
 * See: * https://developers.google.com/youtube/v3/docs/search/list
 */

export const YOUTUBE_API_KEY: string = "AIzaSyAhoLIly5K15u59nNqdThqWhWYgM6fh1NY";
export const YOUTUBE_API_URL: string = "https://www.googleapis.com/youtube/v3/search";

@Injectable()
export class YouTubeSearchService {

  constructor(
    private http: Http, 
    @Inject(YOUTUBE_API_KEY) private apiKey: string, 
    @Inject(YOUTUBE_API_URL) private apiUrl: string) { }


  
  search(query: string): Observable<SearchResult[]> { 
    const params: string = [
      `q=${query}`, 
      `key=${this.apiKey}`, 
      `part=snippet`, 
      `type=video`, 
      `maxResults=10`
  ].join('&');
  const queryUrl = `${this.apiUrl}?${params}`;

  console.log(queryUrl);

  return this.http.get(queryUrl)
    .map((res: Response) => {
      return (<any>res.json()).items.map(item => {
        // console.log("raw item", item); // uncomment if you want to debug
        return new SearchResult({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      })
    })
  }
}