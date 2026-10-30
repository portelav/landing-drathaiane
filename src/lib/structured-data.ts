import {
  ADDRESS_LINES,
  INSTAGRAM_HREF,
  OFFICE_LATITUDE,
  OFFICE_LONGITUDE,
  OPENING_HOURS,
  PHONE_HREF,
  ROUTE_HREF,
} from "./contact";
import { SITE_URL } from "./site";

/**
 * What the practice is, for search engines (schema.org `Dentist`). It repeats
 * only what the page already shows: no price range, although Google suggests
 * one (PRD, D29), no "especialista" (Código de Ética, art. 44, II), no postcode
 * the page does not carry.
 */
export const PRACTICE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}/#consultorio`,
  name: "Dra. Thaiane Lessa",
  description: "Cirurgiã-Dentista em Maceió, CRO/AL-6418.",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  telephone: PHONE_HREF.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: [...ADDRESS_LINES].reverse().join(", "),
    addressLocality: "Maceió",
    addressRegion: "AL",
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: OFFICE_LATITUDE, longitude: OFFICE_LONGITUDE },
  hasMap: ROUTE_HREF,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OPENING_HOURS.days,
      opens: OPENING_HOURS.opens,
      closes: OPENING_HOURS.closes,
    },
  ],
  sameAs: [INSTAGRAM_HREF],
  employee: { "@type": "Person", name: "Thaiane Lessa", jobTitle: "Cirurgiã-Dentista" },
};
