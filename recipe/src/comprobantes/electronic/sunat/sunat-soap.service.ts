import { Injectable } from '@nestjs/common';
import * as soap from 'soap';

@Injectable()
export class SunatSoapService {
  async sendBill(params: {
    wsdlUrl: string;
    username: string; // normalmente "RUCUSUARIO"
    password: string;
    fileName: string; // "RUC-TIPO-SERIE-NRO.zip"
    contentFileBase64: string;
  }) {
    const client = await soap.createClientAsync(params.wsdlUrl);

    // Basic Auth (según el WSDL/servicio)
    client.setSecurity(new soap.BasicAuthSecurity(params.username, params.password));

    // El nombre exacto del método depende del WSDL
    // Ejemplo típico: sendBillAsync({ fileName, contentFile })
    const [result] = await client.sendBillAsync({
      fileName: params.fileName,
      contentFile: params.contentFileBase64,
    });

    return result;
  }
}
