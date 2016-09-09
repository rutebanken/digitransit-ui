module.exports.setLanguage = (actionContext, language) ->
  actionContext.dispatch "SetLanguage", language

module.exports.closeFirstTimeMessage = (actionContext) ->
  actionContext.dispatch "CloseFirstTimeMessage"
