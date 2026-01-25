export function createDestinationOptionsTemplate(destinations = []) {
  return `
    <datalist id='destination-list-1'>
      ${destinations.map((destination) => `<option value='${destination.name}'></option>`).join('')}
    </datalist>
  `;
}
