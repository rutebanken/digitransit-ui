export function open(actionContext) {
  actionContext.dispatch('openInformationPage');
}

export function close(actionContext) {
  actionContext.dispatch('closeInformationPage');
}
