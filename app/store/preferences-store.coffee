Store       = require 'fluxible/addons/BaseStore'
storage     = require './localStorage'
config      = require '../config'

class PreferencesStore extends Store
  @storeName: 'PreferencesStore'

  constructor: (dispatcher) ->
    super(dispatcher)
    @preferences = @loadPreferences()
    @showFirstTimeMessage = true

  getLanguage: ->
    @preferences.language || config.defaultLanguage

  setLanguage: (language) ->
    if language not in config.availableLanguages
      console.error  "Could not set language " + language + " as it is not configured as availableLanguage"
      return

    @preferences.language = language
    @storePreferences()
    if document
      document.cookie = "lang=" + language

    @emitChange(language)

  closeFirstTimeMessage: () ->
    @showFirstTimeMessage = false
    if @preferences.firstTimeMessageClosedCount != undefined
      @preferences.firstTimeMessageClosedCount += 1
    else
      @preferences.firstTimeMessageClosedCount = 1

    @storePreferences()
    @emitChange("showFirstTimeMessage")

  getShowFirstTimeMessage: ->
    if @showFirstTimeMessage
      if @preferences.firstTimeMessageClosedCount != undefined
        @preferences.firstTimeMessageClosedCount < 5
      else if @preferences.firstTimeMessageClosedCount == undefined
        true
    else
      false

  loadPreferences: ->
    preferences = storage.getPreferencesStorage()
    language =
      if preferences.language
        preferences.language
      else if window? && window.locale
        window.locale
      else
        config.defaultLanguage

    {
      language: language,
      firstTimeMessageClosedCount: preferences.firstTimeMessageClosedCount
    }

  storePreferences: () ->
    storage.setPreferencesStorage(@preferences)

  @handlers:
    "SetLanguage": 'setLanguage',
    "CloseFirstTimeMessage": 'closeFirstTimeMessage'

module.exports = PreferencesStore
