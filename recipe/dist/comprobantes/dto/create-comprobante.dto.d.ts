export declare class CreateComprobanteDto {
    fecha_emision: string;
    fecha_vencimiento: string;
    moneda: string;
    igv: number;
    tipo_pago: string;
    nro_cuotas?: number;
    codigo_cliente: number;
    codigo_usuario: number;
    codigo_sede: number;
    codigo_producto_servicio: number;
    codigo_tipo_documento: number;
}
