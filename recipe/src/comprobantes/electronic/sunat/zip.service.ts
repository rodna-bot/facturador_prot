import AdmZip from 'adm-zip';

export function xmlToZipBase64(xmlFilename: string, xmlContent: string) {
  const zip = new AdmZip();
  zip.addFile(xmlFilename, Buffer.from(xmlContent, 'utf8'));

  const zipBuffer = zip.toBuffer();
  return zipBuffer.toString('base64'); // para SOAP
}
