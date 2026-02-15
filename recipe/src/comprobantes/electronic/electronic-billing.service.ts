import { Injectable } from '@nestjs/common';
import { UblInvoiceBuilder } from './ubl/ubl-invoice.builder';
import { XmlSignerService } from './signature/xml-signer.service';
import { SunatSoapService } from './sunat/sunat-soap.service';
import { xmlToZipBase64 } from './sunat/zip.service';
import { QrService } from './qr/qr.service';

@Injectable()
export class ElectronicBillingService {
  constructor(
    private readonly signer: XmlSignerService,
    private readonly soap: SunatSoapService,
    private readonly qr: QrService,
  ) {}

  async emitirFactura() {
    const builder = new UblInvoiceBuilder();

    // 1) XML
    const xml = builder.buildInvoiceXml({
      rucEmisor: '20123456789',
      razonSocialEmisor: 'MI EMPRESA SAC',
      serie: 'F001',
      numero: '00000001',
      fechaEmision: '2026-02-14',
      moneda: 'PEN',
      total: 100.0,
    });

    // 2) Firmar
    const signedXml = this.signer.signXml(xml, {
      pfxPath: process.env.PFX_PATH!,
      pfxPass: process.env.PFX_PASS!,
    });

    // 3) ZIP base64
    const xmlName = `20123456789-01-F001-00000001.xml`;
    const zipName = `20123456789-01-F001-00000001.zip`;
    const zipBase64 = xmlToZipBase64(xmlName, signedXml);

    // 4) SOAP
    const sunatResponse = await this.soap.sendBill({
      wsdlUrl: process.env.SUNAT_WSDL!,
      username: process.env.SUNAT_USER!,
      password: process.env.SUNAT_PASS!,
      fileName: zipName,
      contentFileBase64: zipBase64,
    });

    // 5) QR (texto armado según tu estándar)
    const qrText = `20123456789|01|F001|00000001|100.00|2026-02-14`;
    const qrPng = await this.qr.toPngBuffer(qrText);

    return { sunatResponse, signedXml, qrPng };
  }
}
