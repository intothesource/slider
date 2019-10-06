import './slider-slides-container.css';
import { query } from './util/query';
import { noop } from './util/noop';
import { Slide } from './slider-slide';
import { Bounds } from './bounds';
import { SELECTOR_SLIDER_SLIDES_CONTAINER, SELECTOR_SLIDER_SLIDE } from './constants';

export class SlidesContainer {

    /**
     * @param {Object} options 
     * @param {Document|HTMLElement} options.parent
     * @param {string} options.selector
     * @param {Function} options.onScrollCallback
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
     * @param {HTMLElement} element 
     * @param {Object} options
     * @param {string} options.selectorSlide
     * @param {Function} options.onScrollCallback
     */
    constructor(element, options = {}) {
        const {
            onScrollCallback = noop,
            selectorSlide = SELECTOR_SLIDER_SLIDE,
        } = options;

        this.element = element;

        this.scrollCallback = onScrollCallback;

        this.slides = Slide.init({
            parent: this.element,
            selector: selectorSlide,
        });

        this.element.addEventListener('scroll', () => {
            this.onScroll();
        });

        window.addEventListener('resize', () => {
            this.bounds = this.calculateBounds();
        });

        this.bounds = this.calculateBounds();

        // ---------------------------------------------------------------------
        // Handle mouse drag gestures to emulate touch scrolling
        // ---------------------------------------------------------------------

        const tolerance = 10;
        let xStart = 0;
        let xEnd = 0;

        const onMousedown = (event) => {
            document.addEventListener('mousemove', onMousemove);
            document.addEventListener('mouseup', onMouseup);
            xStart = event.screenX;
        };

        const onMousemove = (event) => {
            xEnd = event.screenX;
        };

        const onMouseup = () => {
            document.removeEventListener('mousemove', onMousemove);
            document.removeEventListener('mouseup', onMouseup);
            const xMoved = xStart - xEnd;
            if (xMoved < tolerance * -1) { this.goToNext(); }
            if (xMoved > tolerance) { this.goToPrev(); }
            xStart = 0;
            xEnd = 0;
        };

        this.element.addEventListener('mousedown', onMousedown);
    }

    get lastSlide() {
        return this.slides[this.slides.length - 1];
    }

    get rect() {
        return this.element.getBoundingClientRect();
    }

    calculateBounds() {
        return this.slides
            .map(slide => slide.width)
            .map((width, index, array) => {
                const prev = array.filter((_, index1) => index1 < index);
                const left = prev.reduce((acc, curr) => acc + curr, 0);
                const right = left + width;
                return new Bounds(left, right);
            });
    }

    get left() {
        return this.element.scrollLeft;
    }

    get currentBoundsIndex() {
        return this.bounds.findIndex((bounds) => Bounds.isWithin(bounds, this.left));
    }

    get nextBounds() {
        const { currentBoundsIndex } = this;
        return this.bounds[currentBoundsIndex + 1];
    }

    get prevBounds() {
        const { currentBoundsIndex } = this;
        return this.bounds[currentBoundsIndex - 1];
    }

    goToNext() {
        const { nextBounds } = this;
        if (nextBounds) {
            this.scrollBy(nextBounds.left - this.left);
        }
    }

    goToPrev() {
        const { prevBounds } = this;
        if (prevBounds) {
            this.scrollBy(prevBounds.left - this.left);
        }
    }

    /**
     * @param {number} left 
     */
    scrollBy(left) {
        this.element.scrollBy({
            behavior: 'smooth',
            left,
        });
    }

    onScroll() {
        this.scrollCallback();
    }
}
