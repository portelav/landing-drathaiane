/**
 * The practice's contact channels. The header is a Client Component and the
 * footer a Server Component, so both read from this neutral module rather than
 * one importing from the other across the client boundary.
 */
export const PHONE_DISPLAY = "(82) 99387-1990";
export const PHONE_HREF = "tel:+5582993871990";
export const WHATSAPP_HREF = "https://wa.me/5582993871990";
export const INSTAGRAM_HANDLE = "@thaiane_lessa";
export const INSTAGRAM_HREF = "https://instagram.com/thaiane_lessa";

/**
 * Where the practice is and when it is open. The office address only, never a
 * home address (PRD, D34).
 */
export const ADDRESS_LINES = [
  "Norcon Empresarial, 14º andar, sala 1401",
  "Av. Comendador Gustavo Paiva, 2789",
];
export const PARKING =
  "Estacionamento no prédio anexo, com acesso pela lateral, em direção à ladeira do Jacintinho.";
export const HOURS = "08h às 18h, de segunda a sexta.";

/** The office, as read off the map by hand: the geocoder does not find the building. */
export const OFFICE_LATITUDE = -9.648999;
export const OFFICE_LONGITUDE = -35.717484;

/** Route by coordinates, so the link lands where the map pin is. */
export const ROUTE_HREF = `https://www.google.com/maps/search/?api=1&query=${OFFICE_LATITUDE},${OFFICE_LONGITUDE}`;

/** Mapbox static image of the office (ADR 0005); undefined without a token. */
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
export const MAP_SRC = MAPBOX_TOKEN
  ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+163000(${OFFICE_LONGITUDE},${OFFICE_LATITUDE})/${OFFICE_LONGITUDE},${OFFICE_LATITUDE},16,0/800x450@2x?access_token=${MAPBOX_TOKEN}`
  : undefined;
