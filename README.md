# @intothesource/slider

Slider for sliding things.

## Example

```html
<div data-its-slider>
    <div data-its-slider-slides-container>
        <div data-its-slider-slide> <!-- Slide 1 Content --> </div>
        <div data-its-slider-slide> <!-- Slide 2 Content --> </div>
        <div data-its-slider-slide> <!-- Slide 3 Content --> </div>
    </div>
    <button data-its-slider-button
        data-its-slider-button-prev
        data-its-slider-button-disabled
        disabled>prev</button>
    <button data-its-slider-button
        data-its-slider-button-next
        data-its-slider-button-disabled
        disabled>next</button>
</div>
<script src="slider.js"></script>
<script>
    var sliders = slider.Slider.init();
</script>
```

## Progressive enhancement

You'll want to make sure that the content of the slider doesn't jump around the
page before the slider JS has fully loaded. To mitigate this, make sure to
include the following CSS in your project CSS (or inline it on the page).

```css
[data-its-slider] {
    display: block;
    position: relative;
}

[data-its-slider-slides-container] {
    position: relative;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    margin: 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

[data-its-slider-slides-container]::-webkit-scrollbar {
    display: none;
}

@media (hover: none) and (pointer: coarse) {
    [data-its-slider-slides-container] {
        -webkit-overflow-scrolling: touch;
    }
}
```

## Polyfill smooth scrolling

If you want Safari and IE to use smooth scrolling, you'll need to include a
polyfill to your project.

```html
<script src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.js"></script>
```

## Building

```console
$ npm run build
```

## Publishing changes

```console
$ npm i -g np
$ np
```
