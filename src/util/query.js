/**
 * @param {Document|HTMLElement} parent 
 */
export function query(parent = document) {

    /**
     * @param {string} selector 
     */
    function querySelector(selector) {
        const elementList = parent.querySelectorAll(selector);
        return Array.from(elementList);
    }

    return querySelector;
}
