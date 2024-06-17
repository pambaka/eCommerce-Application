export default function restrictKeys(event: KeyboardEvent) {
  // restrict input dot, plus, minus
  if (
    event.keyCode === 190 ||
    event.keyCode === 191 ||
    event.keyCode === 107 ||
    event.keyCode === 187 ||
    event.keyCode === 109 ||
    event.keyCode === 189
  ) {
    event.preventDefault();
  }
}
