import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MediaItem } from './MediaItem';

@Component({
    selector: 'mw-media-item-form',
    templateUrl: 'app/media-item-form.component.html',
    styleUrls: ['app/media-item-form.component.css']
})

export class MediaItemFormComponent {
    form: FormGroup;

    ngOnInit() {
        this.form = new FormGroup( {
            medium: new FormControl('Movies'),
            name: new FormControl('',Validators.compose([
                Validators.pattern('[\\w\\-\\s\\/]+'),
                Validators.required
            ])),
            category: new FormControl(''),
            year: new FormControl('')
        });
    }

    onSubmit(mediaItem: MediaItem) {
        console.log(mediaItem);
    }
}