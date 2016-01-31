class Dashing.ClickableWidget extends Dashing.Widget
  constructor: ->
    super
    $(@node).on 'click', (evt) => @handleClick evt
    $(@node).on 'touchstart', (evt) => @handleTouchStart evt
    $(@node).on 'touchmove', (evt) => @handleTouchMove evt
    $(@node).on 'touchend', (evt) => @handleTouchEnd evt
    $(@node).on 'change', (evt) => @handleChange evt
    $(@node).on 'input', (evt) => @handleInput evt

  handleChange: (evt) ->
    @onChange evt
    
  handleInput: (evt) ->
    @onInput evt
    
  handleClick: (evt) ->
    @onClick evt

  handleTouchStart: (evt) ->
    evt.preventDefault()
    @onTouchStart evt

  handleTouchMove: (evt) ->
    @onTouchMove evt

  handleTouchEnd: (evt) ->
    @onTouchEnd evt
    @onClick evt


  onInput: (evt) ->
    # override for input events
  
  onChange: (evt) ->
    # override for change events
  
  onClick: (evt) ->
    # override for click events

  onTouchStart: (evt) ->
    # override for touchstart events

  onTouchMove: (evt) ->
    # override for touchmove events

  onTouchEnd: (evt) ->
    # override for touchend events
