import './slider.css';
import { query } from './util/query';
import { Slide } from './slider-slide';
import { ButtonNext } from './slider-button-next';
import { ButtonPrev } from './slider-button-prev';
import {
    SELECTOR_SLIDER, SELECTOR_SLIDER_SLIDE, SELECTOR_SLIDER_SLIDES_CONTAINER,
    SELECTOR_SLIDER_BUTTON_PREV, SELECTOR_SLIDER_BUTTON_NEXT,
} from './constants';
import { SlidesContainer } from './slider-slides-container';

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
            selectorSlide = SELECTOR_SLIDER_SLIDE,
            selectorSlidesContainer = SELECTOR_SLIDER_SLIDES_CONTAINER,
            selectorButtonNext = SELECTOR_SLIDER_BUTTON_NEXT,
            selectorButtonPrev = SELECTOR_SLIDER_BUTTON_PREV,
        } = options;

        this.element = element;

        this.slidesContainer = SlidesContainer.init({
            parent: element,
            selector: selectorSlidesContainer,
        })[0];

        this.slides = Slide.init({
            parent: this.slidesContainer.element,
            selector: selectorSlide,
        });

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

        this.containerWidth = this.element.getBoundingClientRect().width;
        this.containerScrollWidth = this.element.scrollWidth;
        this.employeeWidth = this.element.children[0].clientWidth;
        this.scrollPosition = 0;

        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.element.addEventListener('scroll', this.onScroll.bind(this));

        this.setButtonActive();

        console.log(this);
    }

    /**
     * @param {number} left 
     */
    scrollTo(left) {
        this.element.scrollBy({
            behavior: 'smooth',
            left: left,
        });
    }

    goToNext() {
        this.scrollTo(-this.slideWidth);
    }

    goToPrev() {
        this.scrollTo(this.slideWidth);
    }

    /**
     * @param {MouseEvent} event 
     */
    onNextClick(event) {
        event.preventDefault();
        this.goToNext();
    }

    /**
     * @param {MouseEvent} event 
     */
    onPrevClick(event) {
        event.preventDefault();
        this.goToPrev();
    }

    // Window resize handler

    onWindowResize() {
        this.containerWidth = this.element.getBoundingClientRect().width;
        this.employeeWidth = this.element.children[0].getBoundingClientRect().width;
    }

    // Scroll handler

    onScroll() {
        this.scrollPosition = this.element.scrollLeft;
        this.setButtonActive();
    }

    setButtonActive() {
        this.buttonPrev.disabled = this.scrollPosition === 0;
        this.buttonNext.disabled = this.scrollPosition + this.containerWidth === this.containerScrollWidth;
    }

    setButtonVisible() {
        this.buttonPrev.visible = this.scrollPosition === 0;
        this.buttonNext.visible = this.scrollPosition + this.containerWidth === this.containerScrollWidth;
    }
}
