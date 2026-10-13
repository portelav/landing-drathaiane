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
 * home address; no embedded map, so the route is a plain link (PRD, D34).
 */
export const ADDRESS_LINES = [
  "Norcon Empresarial, 14º andar, sala 1401",
  "Av. Comendador Gustavo Paiva, 2789",
];
export const PARKING =
  "Estacionamento no prédio anexo, com acesso pela lateral, em direção à ladeira do Jacintinho.";
export const HOURS = "08h às 18h, de segunda a sexta.";
/** Maps search by address; the city is added so the query lands on the building. */
export const ROUTE_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Norcon Empresarial, Av. Comendador Gustavo Paiva, 2789, Maceió, AL",
)}`;
