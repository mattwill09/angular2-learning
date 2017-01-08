import { Component } from '@angular/core';

import { MediaItem } from './MediaItem';
import { MediaItemService } from './media-item.service';

@Component({
  selector: 'mw-media-item-list',
  templateUrl: 'app/media-item-list.component.html',
  styleUrls: ['app/media-item-list.component.css']
})

export class MediaItemListComponent {
  mediaItems: MediaItem[] = [];
  medium: string = '';

  constructor(private mediaItemService: MediaItemService) {}

  ngOnInit() {
    this.getMediaItems(this.medium);
  }

  onMediaItemDelete(mediaItem: MediaItem) {
    this.mediaItemService.delete(mediaItem)
      .subscribe(() => {
        this.getMediaItems(this.medium);
      });
  }

  getMediaItems(medium: string) {
    this.medium = medium;
    this.mediaItemService.get(this.medium)
    .subscribe(mediaItems => {
      this.mediaItems = mediaItems;
    });
  }
};
