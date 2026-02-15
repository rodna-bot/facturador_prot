import * as fs from 'fs';
import * as forge from 'node-forge';

export function pfxToPem(pfxPath: string, pass: string) {
  const p12Der = fs.readFileSync(pfxPath).toString('binary');
  const p12Asn1 = forge.asn1.fromDer(p12Der);
  const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, pass);

  const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
  const keyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag]?.[0];
  const privateKeyPem = forge.pki.privateKeyToPem(keyBag.key);

  const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
  const certBag = certBags[forge.pki.oids.certBag]?.[0];
  const certPem = forge.pki.certificateToPem(certBag.cert);

  return { privateKeyPem, certPem };
}
