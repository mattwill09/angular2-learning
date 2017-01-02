import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  MediaItem
} from './MediaItem';

@Component({
  selector: 'mw-media-item',
  templateUrl: 'app/media-item.component.html',
  styleUrls: ['app/media-item.component.css']
})

export class MediaItemComponent {
  @Input() mediaItem: MediaItem;
  @Output() delete = new EventEmitter();

  onDelete() {
    console.log('deleting item');
    this.delete.emit(this.mediaItem);
  }
}
