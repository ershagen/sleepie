/** Legal seller behind the Sleepie brand */
export const COMPANY = {
  legalName: "Alectiv Group AB",
  orgNr: "559283-6042",
  vatNr: "SE559283604201",
  address: "Skomakaregatan 6",
  zip: "211 34",
  city: "Malmö",
  country: "Sverige",
  email: "hej@sleepie.se",
  brand: "Sleepie",
} as const;

export function companyBlockLines(): string[] {
  return [
    COMPANY.legalName,
    `Org.nr ${COMPANY.orgNr}`,
    `Momsreg.nr ${COMPANY.vatNr}`,
    `${COMPANY.address}, ${COMPANY.zip} ${COMPANY.city}`,
    COMPANY.email,
  ];
}
