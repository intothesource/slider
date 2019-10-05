import { query } from './util/query';
import { Button } from './slider-button';
import { SELECTOR_SLIDER_BUTTON_NEXT } from './constants';

export class ButtonNext extends Button {

    /**
     * @param {Object} options 
     * @param {Document|HTMLElement} options.parent 
     * @param {string} options.selector
     * @param {Function} options.onClick
     */
    static init(options = {}) {
        const {
            parent = document,
            selector = SELECTOR_SLIDER_BUTTON_NEXT,
            ...constructorOptions
        } = options;

        return query(parent)(selector).map((element) =>
            new this(element, constructorOptions));
    }

    /**
     * @param {HTMLElement} element 
     * @param {Object} options 
     * @param {Function} options.onClick
     */
    constructor(element, options = {}) {
        super(element, options);
    }
}
