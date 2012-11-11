/**
 * Initialize `Preview`.
 */

function Preview() {
  this.scrollTop = 0;
  this.initializeElements();
  this.bindEvents();
}

/**
 * Bind `click` event of `selector` to open preview.
 *
 * @param {String} sel
 * @return {Preview}
 * @api public
 */

Preview.prototype.attach = function(sel) {
  $(sel).click($.proxy(this.open, this));
  return this;
};

/**
 * Event binding.
 *
 * @return {Preview}
 * @api private
 */

Preview.prototype.bindEvents = function() {
  this.$window.resize($.proxy(this.resize, this));
  this.$container.click($.proxy(this.close, this));
  return this;
};

/**
 * Append elements to `document.body`.
 *
 * @return {Preview}
 * @api private
 */

Preview.prototype.initializeElements = function() {
  this.$body = $(document.body);
  this.$overlay = $('<div>').addClass('preview-overlay').appendTo(this.$body);
  this.$container = $('<div>').addClass('preview-container').appendTo(this.$body);
  this.$window = $(window);
  return this;
};

/**
 * Open preview lightbox.
 *
 * @param {jQuery.Event} event
 * @return {Preview}
 * @api public
 */

Preview.prototype.open = function(event) {
  var images;

  if (typeof event !== "undefined") {
    images = $(event.target).parents('a').parent().find('img').clone();
    this.$container.children().remove();
    this.$container.append(images).fadeIn('fast');
    event.preventDefault();
  }

  this.scrollTop = this.$window.scrollTop();
  this.$overlay.fadeIn('fast');
  this.resize();

  return this;
};

/**
 * Close preview lightbox.
 *
 * @param {jQuery.Event} event
 * @return {Preview}
 * @api public
 */

Preview.prototype.close = function(event) {
  var self = this;

  if (typeof event === "undefined" || event.target === this.$container.get(0)) {
    $('html, body').animate({ scrollTop: this.scrollTop }, "fast", function() {
      self.$overlay.fadeOut('fast');
      self.$container.fadeOut('fast', function() {
        $(this).removeAttr("style");
      });
    });
  }
};

/**
 * Resize overlay and container divs according to the window.
 *
 * @return {Preview}
 * @api private
 */

Preview.prototype.resize = function() {
  var height = 0;

  this.$container.find("img").each(function() {
    height += parseInt($(this).attr("height"), 10);
    height += parseInt($(this).css("margin-top"), 10);
    height += parseInt($(this).css("margin-bottom"), 10);
  });

  this.$overlay.add(this.$container).css({ width: this.$window.width(), height: height });

  return this;
};
