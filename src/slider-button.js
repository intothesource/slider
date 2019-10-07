import { query } from './util/query';
import { noop } from './util/noop';
import {
    SELECTOR_SLIDER_BUTTON,
    ATTR_SLIDER_BUTTON_DISABLED, ATTR_SLIDER_BUTTON_ENABLED, ATTR_SLIDER_BUTTON_HIDDEN, ATTR_SLIDER_BUTTON_VISIBLE,
} from './constants';

export class Button {

    static init(options = {}) {
        const {
            parent = document,
            selector = SELECTOR_SLIDER_BUTTON,
            ...constructorOptions
        } = options;

        return query(parent)(selector).map((element) =>
            new this(element, constructorOptions));
    }

    /**
     * @param {HTMLElement} element 
     * @param {Object} options
     * @param {function} options.onClick
     */
    constructor(element, options = {}) {
        const { onClick = noop } = options;
        this.onClick = onClick;
        this.element = element;
        this.element.addEventListener('click', this.onClick);
    }

    get disabled() {
        return this.$disabled;
    }

    /**
     * @param {boolean} disabled
     */
    set disabled(disabled) {
        this.$disabled = disabled;

        if ('disabled' in this.element) {
            this.element.disabled = disabled;
        }

        if (disabled === true) {
            this.element.setAttribute(ATTR_SLIDER_BUTTON_DISABLED, '');
            this.element.setAttribute('aria-disabled', 'true');
            this.element.removeAttribute(ATTR_SLIDER_BUTTON_ENABLED);
        } else {
            this.element.removeAttribute(ATTR_SLIDER_BUTTON_DISABLED);
            this.element.removeAttribute('aria-disabled', '');
            this.element.setAttribute(ATTR_SLIDER_BUTTON_ENABLED, '');
        }
    }

    get hidden() {
        return this.$hidden;
    }

    /**
     * @param {boolean} hidden
     */
    set hidden(hidden) {
        this.$hidden = hidden;

        if ('hidden' in this.element) {
            this.element.hidden = hidden;
        }

        if (hidden === true) {
            this.element.setAttribute(ATTR_SLIDER_BUTTON_HIDDEN, '');
            this.element.removeAttribute(ATTR_SLIDER_BUTTON_VISIBLE);
        } else {
            this.element.removeAttribute(ATTR_SLIDER_BUTTON_HIDDEN);
            this.element.setAttribute(ATTR_SLIDER_BUTTON_VISIBLE, '');
        }
    }

    destroy() {
        this.element.removeEventListener('click', this.onClick);
    }
}
