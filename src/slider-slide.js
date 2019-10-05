import './slider-slide.css';
import { query } from './util/query';
import { SELECTOR_SLIDER_SLIDE } from './constants';

export class Slide {

    static init(options = {}) {
        const {
            parent = document,
            selector = SELECTOR_SLIDER_SLIDE,
            ...constructorOptions
        } = options;

        return query(parent)(selector).map((element) =>
            new this(element, constructorOptions));
    }

    constructor(element) {
        this.element = element;
    }
}
