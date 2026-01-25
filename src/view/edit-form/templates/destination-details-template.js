export function createDestinationDetailsTemplate(destination) {
  if (!destination) {
    return '';
  }

  const { description } = destination;

  return `
    <section class='event__section event__section--destination'>
      <h3 class='event__section-title event__section-title--destination'>Destination</h3>
      ${description ? `<p class='event__destination-description'>${description}</p>` : ''}
    </section>
  `;
}
