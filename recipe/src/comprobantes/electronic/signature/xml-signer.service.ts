import { Injectable } from '@nestjs/common';
import { SignedXml } from 'xml-crypto';
import { pfxToPem } from './pfx-to-pem';

@Injectable()
export class XmlSignerService {
  signXml(xml: string, opts: { pfxPath: string; pfxPass: string }) {
    const { privateKeyPem, certPem } = pfxToPem(opts.pfxPath, opts.pfxPass);

    const sig = new SignedXml();

    sig.addReference(
      "//*[local-name(.)='Invoice']",
      ['http://www.w3.org/2000/09/xmldsig#enveloped-signature'],
      'http://www.w3.org/2001/04/xmlenc#sha256',
    );

    sig.signingKey = privateKeyPem;

    // Inserta el certificado en KeyInfo
    sig.keyInfoProvider = {
      getKeyInfo: () =>
        `<X509Data><X509Certificate>${certPem
          .replace('-----BEGIN CERTIFICATE-----', '')
          .replace('-----END CERTIFICATE-----', '')
          .replace(/\r?\n|\r/g, '')}</X509Certificate></X509Data>`,
    } as any;

    // Dónde insertar la firma (varía según el UBL)
    sig.computeSignature(xml, {
      location: { reference: "//*[local-name(.)='Invoice']", action: 'append' },
    });

    return sig.getSignedXml();
  }
}
