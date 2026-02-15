import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrService {
  async toPngBuffer(text: string): Promise<Buffer> {
    return QRCode.toBuffer(text, { type: 'png', errorCorrectionLevel: 'M' });
  }

  async toDataUrl(text: string): Promise<string> {
    return QRCode.toDataURL(text);
  }
}
