class Dashing.SlideDimmer extends Dashing.ClickableWidget
  constructor: ->
    super
    @queryState()    

  @accessor 'state',
    get: -> @_state ? '0'
    set: (key, value) -> @_state = value
    
  @accessor 'slider_state',
    get: -> @_slider_state
    set: (key, value) -> @_slider_state = value
    
  @accessor 'icon',
    get: -> if @['icon'] then @['icon'] else
      if parseInt(@get('state')) > 0 then @get('iconon') else @get('iconoff')
    set: Batman.Property.defaultAccessor.set

  @accessor 'iconon',
    get: -> @['iconon'] ? 'circle'
    set: Batman.Property.defaultAccessor.set

  @accessor 'iconoff',
    get: -> @['iconoff'] ? 'circle-thin'
    set: Batman.Property.defaultAccessor.set

  @accessor 'icon-style', ->
    if parseInt(@get('state')) >0 then 'dimmer-icon-on' else 'dimmer-icon-off' 

  toggleState: ->
    newState = if @get('state') > 0  then '0' else '100'    
    @set 'state', newState       
    return newState
  
  postState: (val) ->
    $.post '/openhab/dispatch',
      deviceId: @get('device'),
      command: val    
    
  queryState: ->
   $.get '/openhab/dispatch',
      widgetId: @get('id'),
      deviceId: @get('device'),
      deviceType: 'switch'
      (data) =>
        json = JSON.parse data        
        @set 'state', level        
    
  ready: ->

  onData: (data) ->
    debugger
    	
  onChange: (event) ->
    newLevel = $(event.target).val()
    @set 'state', newLevel
    @postState( newLevel )
    
  onInput: (event) ->
    newLevel = $(event.target).val()
    @set 'state', newLevel
             
  
  onClick: (event) ->
    if event.target.id == "switch"
      newState = @toggleState()
      @postState(newState)
    
