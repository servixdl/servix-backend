import { Router } from "express";
const transbankRouter = Router();
import pkg from "transbank-sdk";
const {
  Options,
  IntegrationApiKeys,
  Environment,
  IntegrationCommerceCodes,
  WebpayPlus,
} = pkg;
import { transactionModelos } from "../src/models/transaction.models.js";
import { salesModelos } from "../src/models/sale.model.js";
import { appointmentModel } from "../src/models/appointment.model.js";

// Configura el entorno de pruebas
const transaction = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  )
);

// Ruta para crear transacción
transbankRouter.post("/crear", async (req, res) => {
  const { venta } = req.body;
  const { amount } = req.body;
  console.log(req.body);

  const buyOrder = "orden_" + Math.floor(Math.random() * 1000000);
  const sessionId = "sesion_" + Math.floor(Math.random() * 1000000);
  // const returnUrl = 'http://localhost:3000/webpay/retorno';
  const returnUrl = "https://servix-backend.onrender.com/webpay/retorno";

  try {
    const ventaProvisional = {
      buyOrder,
      usuario_id: venta.usuario_id,
      servicio_id: venta.servicio_id,
      fecha_venta: new Date().toISOString().split("T")[0],
      total: amount,
      fecha_cita: venta.fecha_cita,
      hora_inicio: venta.hora_inicio,
      hora_termino: venta.hora_termino,
      estado: "pendiente",
    };

    const ventap = await transactionModelos.createProvisionalSale(
      ventaProvisional
    );
    console.log(ventap);
    const response = await transaction.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    // Devuelve URL y token al frontend
    res.json({
      url: response.url,
      token: response.token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar transacción" });
  }
});

// Ruta de retorno (para recibir resultado después del pago)
transbankRouter.get("/retorno", async (req, res) => {
  const token = req.query.token_ws;
  if (!token) {
    // return res.redirect("http://localhost:5173/error-pago");
    return res.redirect("https://servix-backend.onrender.com/error-pago");
  }
  try {
    const result = await transaction.commit(token);
    console.log("RESULTADO TRANSBANK:", result);
    const { buy_order, amount, status } = result;
    const ventaProvisional = await transactionModelos.getByOrder(buy_order);
    console.log(ventaProvisional);
    const {
      usuario_id,
      servicio_id,
      fecha_venta,
      total,
      fecha_cita,
      hora_inicio,
      hora_termino,
      estado,
    } = ventaProvisional;
    const id_venta = await salesModelos.create({
      usuario_id,
      servicio_id,
      fecha_venta,
      total,
    });
    const venta_id =id_venta
    const id_cita = await appointmentModel.create({
      venta_id,
      fecha_cita,
      hora_inicio,
      hora_termino,
      usuario_id,
      estado,
    });


    res.redirect(
      // `http://localhost:5173/salePay?venta_id=${id_venta}&cita_id=${id_cita}`
      `https://servix.netlify.app/salePay?venta_id=${id_venta}&cita_id=${id_cita}`
    );
  } catch (error) {
    console.error(error);
    // res.redirect("http://localhost:5173/error-pago");
    res.redirect("https://servix.netlify.app/error-pago");
  }
});

export default transbankRouter;
