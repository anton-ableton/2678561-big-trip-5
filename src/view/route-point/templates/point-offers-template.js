export function createPointOffersTemplate(offers) {
  if (!offers || !offers.length) {
    return "";
  }

  return `
    <h4 class='visually-hidden'>Offers:</h4>
    <ul class='event__selected-offers'>
      ${offers
        .map(
          (offer) => `
        <li class='event__offer'>
          <span class='event__offer-title'>${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class='event__offer-price'>${offer.price}</span>
        </li>
      `,
        )
        .join("")}
    </ul>
  `;
}
