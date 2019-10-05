import './slider-slides-container.css';
import { query } from './util/query';
import { SELECTOR_SLIDER_SLIDES_CONTAINER } from './constants';

export class SlidesContainer {

    /**
     * @param {Object} options 
     * @param {Document|HTMLElement} options.parent
     * @param {string} options.selector
     */
    static init(options = {}) {
        const {
            parent = document,
            selector = SELECTOR_SLIDER_SLIDES_CONTAINER,
            ...constructorOptions
        } = options;

        return query(parent)(selector).map((element) =>
            new this(element, constructorOptions));
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element;
    }
}
