/**
 * jquery.selectfilter.js
 * Copyright (c) 2013 Crocos Inc., All rights reserved.
 *
 * @author Keisuke SATO <sato@crocos.co.jp>
 * @license BSD License
 */

;(function($){

  'use strict';

  $.fn.selectfilter = function(options) {
    var options = $.extend({}, $.fn.selectfilter.defaults, options)
      , $select = $(this)
      , $filter = $(options.filter)
      , choices = []
      , lastText = '@'
      , interval;

    if (!$filter) {
      return;
    }

    $('option', $select).each(function() {
      var $option = $(this)
        , attrs = {};

      $($option.get(0).attributes).each(function() {
        attrs[this.nodeName] = this.nodeValue;
      });

      choices[choices.length] = {
        text: $option.text(),
        attrs: attrs
      };
    });

    interval = setInterval(function() {
      var text = $filter.val();

      if (text == lastText) {
        return;
      }

      console.log('call');
      $select.empty();

      $.each(choices, function(i, choice) {
        if (text == "" || choice.text.indexOf(text) != -1) {
          $select.append($('<option>').text(choice.text).attr(choice.attrs));
        }
      });

      lastText = text;
    }, options.interval);
  };

  // defaults
  $.fn.selectfilter.defaults = {
    interval: 100
  };

  // auto-execution
  $(function() {
    $('[data-selectfilter]').each(function() {
      var $self = $(this)
        , $select = $($self.attr('data-selectfilter'));

      if ($select) {
        $select.selectfilter({
          filter: $self
        });
      }
    });
  });
}(jQuery));
