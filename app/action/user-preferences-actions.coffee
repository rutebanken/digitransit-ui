module.exports.setLanguage = (actionContext, language) ->
  actionContext.dispatch "SetLanguage", language

module.exports.setShowFirstTimeMessage = (actionContext, showFirstTimeMessage) ->
  actionContext.dispatch "SetShowFirstTimeMessage", showFirstTimeMessage
