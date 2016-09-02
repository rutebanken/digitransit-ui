Store       = require 'fluxible/addons/BaseStore'
storage     = require './localStorage'
config      = require '../config'

class PreferencesStore extends Store
  @storeName: 'PreferencesStore'

  constructor: (dispatcher) ->
    super(dispatcher)
    @preferences = @loadPreferences()

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

  setShowFirstTimeMessage: (showFirstTimeMessage) ->
    @preferences.showFirstTimeMessage = showFirstTimeMessage
    @storePreferences()
    @emitChange("showFirstTimeMessage")

  getShowFirstTimeMessage: ->
    if @preferences.showFirstTimeMessage != undefined
      @preferences.showFirstTimeMessage
    else
      true

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
      showFirstTimeMessage: preferences.showFirstTimeMessage
    }

  storePreferences: () ->
    storage.setPreferencesStorage(@preferences)

  @handlers:
    "SetLanguage": 'setLanguage',
    "SetShowFirstTimeMessage": 'setShowFirstTimeMessage'

module.exports = PreferencesStore
