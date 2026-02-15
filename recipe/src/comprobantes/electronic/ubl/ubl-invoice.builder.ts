import { create } from 'xmlbuilder2';

export class UblInvoiceBuilder {
  buildInvoiceXml(data: {
    rucEmisor: string;
    razonSocialEmisor: string;
    serie: string;
    numero: string;
    fechaEmision: string; // YYYY-MM-DD
    moneda: 'PEN' | 'USD';
    total: number;
  }): string {
    // OJO: esto es un ejemplo mínimo para estructura.
    // Para SUNAT real debes completar namespaces + nodos obligatorios.
    const xml = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('Invoice', {
        xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
        'xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
        'xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
      })
      .ele('cbc:ID').txt(`${data.serie}-${data.numero}`).up()
      .ele('cbc:IssueDate').txt(data.fechaEmision).up()
      .ele('cbc:DocumentCurrencyCode').txt(data.moneda).up()

      .ele('cac:AccountingSupplierParty')
        .ele('cac:Party')
          .ele('cac:PartyIdentification')
            .ele('cbc:ID', { schemeID: '6' }).txt(data.rucEmisor).up()
          .up()
          .ele('cac:PartyLegalEntity')
            .ele('cbc:RegistrationName').txt(data.razonSocialEmisor).up()
          .up()
        .up()
      .up()

      .ele('cac:LegalMonetaryTotal')
        .ele('cbc:PayableAmount', { currencyID: data.moneda }).txt(data.total.toFixed(2)).up()
      .up()

      .end({ prettyPrint: true });

    return xml;
  }
}
