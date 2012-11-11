# Preview

Light-weight lightbox for jQuery. Kinda Quick Look for images.

![js preview component](http://f.cl.ly/items/13350j151m3x0u283M40/Screen%20Shot%202012-11-11%20at%203.18.53%20PM.png)

## Example

```js
var preview = new Preview;

preview.attach('.screenshot a');
preview.attach(...);
```

## API

### Preview#attach(selector)

Bind `click` event of `selector` to open preview.

### Preview#open

Open preview lightbox.

### Preview#close

Close preview lightbox.

## License

MIT
