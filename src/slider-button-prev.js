import { query } from './util/query';
import { Button } from './slider-button';
import { SELECTOR_SLIDER_BUTTON_PREV } from './constants';

export class ButtonPrev extends Button {

    static init(options = {}) {
        const {
            parent = document,
            selector = SELECTOR_SLIDER_BUTTON_PREV,
            ...constructorOptions
        } = options;

        return query(parent)(selector).map((element) =>
            new this(element, constructorOptions));
    }

    constructor(element, options = {}) {
        super(element, options);
    }
}
