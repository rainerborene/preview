# Preview

Light-weight lightbox for jQuery. Kinda Quick Look for images.

![js preview component](http://f.cl.ly/items/13350j151m3x0u283M40/Screen%20Shot%202012-11-11%20at%203.18.53%20PM.png)

## Example

```js
var preview = new Preview;
preview.bind('.screenshot a');
```

You might want to use [animate.css](http://daneden.me/animate/), which is great
for emphasis, home pages, sliders, and general just-add-water-awesomeness

## API

### Preview#bind(selector)

Bind `click` event of `selector` to open preview.

### Preview#effects(open, close)

Add `css` classes when opening or closing the preview window.

### Preview#open

Open preview.

### Preview#close

Close preview.

## License

MIT
