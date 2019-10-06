export class Bounds {

    /**
     * @param {Bounds} bounds 
     * @param {number} point 
     */
    static isWithin(bounds, point) {
        return point >= bounds.left
            && point < bounds.right;
    }

    /**
     * @param {number} left 
     * @param {number} right 
     */
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}
