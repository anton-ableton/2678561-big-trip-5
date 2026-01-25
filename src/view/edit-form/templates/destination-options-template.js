export function createDestinationOptionsTemplate(destinations = []) {
  return `
    <datalist id='destination-list'>
      ${destinations.map((destination) => `<option value='${destination.name}'></option>`).join('')}
    </datalist>
  `;
}
