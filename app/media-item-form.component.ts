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
            year: new FormControl('', this.yearValidator)
        });
    }

    onSubmit(mediaItem: MediaItem) {
        console.log(mediaItem);
    }

    yearValidator(control: FormControl) {
        if (control.value.trim().length === 0) {
            return null;
        }

        let year = parseInt(control.value, 10);
        let minYear = 1900;
        let maxYear = 2017;
        if (year >= minYear && year <= maxYear) {
           return null;
        }

        return {'year': true};
    }
} 