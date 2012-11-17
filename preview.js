/**
 * Initialize `Preview`.
 */

function Preview() {
  this.scrollTop = 0;
  this.closeTimeout = 0;
  this.effects = { open: 'bounceInUp', close: 'bounceOutDown' };
  this.initializeElements();
  this.bindEvents();
}

/**
 * Add `css` classes when opening or closing the preview window.
 *
 * @param {String} open
 * @param {String} close
 * @return {Preview}
 * @api public
 */

Preview.prototype.effects = function(open, close){
  this.effects.open = open;
  this.effects.close = close;
  return this;
};

/**
 * Bind `click` event of `selector` to open preview.
 *
 * @param {String} sel
 * @return {Preview}
 * @api public
 */

Preview.prototype.bind = function(sel){
  $(sel).click($.proxy(this.open, this));
  return this;
};

/**
 * Event binding.
 *
 * @return {Preview}
 * @api private
 */

Preview.prototype.bindEvents = function(){
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

Preview.prototype.initializeElements = function(){
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

Preview.prototype.open = function(event){
  var images;

  if (typeof event !== 'undefined'){
    images = $(event.target).parents('a').parent().find('img').clone();
    this.$container.children().remove();
    this.$container.append(images);
    event.preventDefault();
  }

  this.scrollTop = this.$window.scrollTop();
  this.$overlay.removeAttr("style").fadeIn('fast');
  this.$container
    .removeAttr("style").show()
    .removeClass(this.effects.close)
    .addClass('animated')
    .addClass(this.effects.open);

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

Preview.prototype.close = function(event){
  var that = this;

  $('html, body').animate({ scrollTop: this.scrollTop }, 'fast', function(){
    that.$container.removeClass(that.effects.open).addClass(that.effects.close);
    setTimeout(function(){
      that.$overlay.fadeOut('fast');
      that.$container.hide();
    }, this.closeTimeout);
  });
};

/**
 * Resize overlay and container divs according to the window.
 *
 * @return {Preview}
 * @api private
 */

Preview.prototype.resize = function(){
  var height = 0;

  this.$container.find('img').each(function(){
    height += parseInt($(this).attr('height'), 10);
    height += parseInt($(this).css('margin-top'), 10);
    height += parseInt($(this).css('margin-bottom'), 10);
  });

  this.$overlay.add(this.$container).css({ width: this.$window.width(), height: height });

  return this;
};
