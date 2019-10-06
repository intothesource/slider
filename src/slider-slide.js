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

    /**
     * @param {HTMLElement} element 
     */
    constructor(element) {
        this.element = element;
        this.query = query(this.element);

        this.anchors = this.query('a');
        this.images = this.query('img');

        this.draggables = [this.element, ...this.anchors, ...this.images];
        this.clickables = [this.element, ...this.anchors];

        this.disableClickHandler = (e) => {
            e.preventDefault();
            return false;
        };
    }

    get rect() {
        return this.element.getBoundingClientRect();
    }

    get width() {
        const { width } = this.rect;
        return width;
    }

    disableClickables() {
        this.clickables.forEach(elm =>
            elm.addEventListener('click', this.disableClickHandler));
    }

    enableClickables() {
        this.clickables.forEach(elm =>
            elm.removeEventListener('click', this.disableClickHandler));
    }

    disableDraggables() {
        this.draggables.forEach(elm => elm.draggable = false);
    }

    enableDraggables() {
        this.draggables.forEach(elm => elm.draggable = true);
    }
}
