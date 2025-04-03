const express = require('express');
const Excel = require('exceljs');
const router = express.Router();

router.post('/generar-factura', async (req, res) => {
  try {
    const formData = req.body; //recibe los datos enviado de react
    const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const fileName = `Factura-${fechaActual}.xlsx`; //nombre de archivo con fecha
    
    const workbook = new Excel.Workbook(); //nuevo xlsx
    const worksheet = workbook.addWorksheet('Factura'); //hoja de trabajo excel y empezar a escibir

    //columnas
    worksheet.columns = [
      { header: 'Código de Orden', key: 'codigoOrden', width: 20 },
      { header: 'Descripción', key: 'descripcionOrden', width: 40 },
      { header: 'Fecha de Ingreso', key: 'fechaIngreso', width: 15 },
      { header: 'Fecha de Venta', key: 'fechaVenta', width: 15 },
      { header: 'Cliente', key: 'nombreCliente', width: 25 },
      { header: 'Vehículo', key: 'vehiculo', width: 25 },
      { header: 'Monto Total', key: 'montoTotal', width: 15 },
      { header: 'Dinero Vuelto', key: 'dineroVuelto', width: 15 },
      { header: 'Método de Pago', key: 'metodoPago', width: 20 }
    ];

    //fila de header en negrita
    worksheet.getRow(1).font = { bold: true };
    
    //Fila con datos segun los datos recibidos (formData)
    worksheet.addRow({
      codigoOrden: formData.codigoOrden || 'N/A',
      descripcionOrden: formData.descripcionOrden || 'N/A',
      fechaIngreso: formData.fechaIngreso ? formData.fechaIngreso.split('T')[0] : 'N/A',
      fechaVenta: formData.fechaVenta ? formData.fechaVenta.split('T')[0] : 'N/A',
      nombreCliente: formData.nombreCliente || 'N/A',
      vehiculo: formData.vehiculo || 'N/A',
      montoTotal: formData.montoTotal || 0,
      dineroVuelto: formData.dineroVuelto || 0,
      metodoPago: formData.metodoPago || 'Tarjeta'
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    await workbook.xlsx.write(res);
    res.end(); //terminar edicion de archivo y retornar
  } catch (error) {
    console.error('Error al generar el archivo XLSX:', error);
    res.status(500).json({ error: 'Error al generar el archivo XLSX' });
  }
});

module.exports = router;
