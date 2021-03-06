import './slider.css';
import debounce from 'debounce';
import { query } from './util/query';
import { SlidesContainer } from './slider-slides-container';
import { ButtonNext } from './slider-button-next';
import { ButtonPrev } from './slider-button-prev';
import {
    SELECTOR_SLIDER, SELECTOR_SLIDER_SLIDE, SELECTOR_SLIDER_SLIDES_CONTAINER,
    SELECTOR_SLIDER_BUTTON_PREV, SELECTOR_SLIDER_BUTTON_NEXT, ATTR_SLIDER_ENHANCED,
} from './constants';

export class Slider {

    static init(options = {}) {
        const {
            parent = document,
            selector = SELECTOR_SLIDER,
            ...constructorOptions
        } = options;

        return query(parent)(selector).map((element) =>
            new this(element, constructorOptions));
    }

    /**
     * @param {HTMLElement} element 
     * @param {Object} options 
     */
    constructor(element, options = {}) {
        const {
            selectorSlidesContainer = SELECTOR_SLIDER_SLIDES_CONTAINER,
            selectorButtonNext = SELECTOR_SLIDER_BUTTON_NEXT,
            selectorButtonPrev = SELECTOR_SLIDER_BUTTON_PREV,
            selectorSlide = SELECTOR_SLIDER_SLIDE,
        } = options;

        this.element = element;

        this.slidesContainer = SlidesContainer.init({
            parent: element,
            selector: selectorSlidesContainer,
            onScrollCallback: debounce(this.onScrollCallback.bind(this), 100),
            selectorSlide,
        })[0];

        this.buttonNext = ButtonNext.init({
            parent: element,
            selector: selectorButtonNext,
            onClick: this.onNextClick.bind(this),
        })[0];

        this.buttonPrev = ButtonPrev.init({
            parent: element,
            selector: selectorButtonPrev,
            onClick: this.onPrevClick.bind(this),
        })[0];

        this.buttonActive();

        this.element.setAttribute(ATTR_SLIDER_ENHANCED, '');
    }

    /**
     * @param {MouseEvent} event 
     */
    onNextClick(event) {
        event.preventDefault();
        this.slidesContainer.goToNext();
    }

    /**
     * @param {MouseEvent} event 
     */
    onPrevClick(event) {
        event.preventDefault();
        this.slidesContainer.goToPrev();
    }

    buttonActive() {
        const { isAtEnd, isAtStart } = this.slidesContainer;

        // Disable prev button if we're already at the start
        this.buttonPrev.disabled = isAtStart;

        // Disable next button if we're already at the end
        this.buttonNext.disabled = isAtEnd;

        // Disable next and prev button if there's nothing to scroll
        this.buttonNext.hidden = this.buttonPrev.disabled && this.buttonNext.disabled;
        this.buttonPrev.hidden = this.buttonPrev.disabled && this.buttonNext.disabled;
    }

    onScrollCallback() {
        this.buttonActive();
    }
}
