const express = require('express');
const { GarminConnect } = require('garmin-connect');
const app = express();

app.get('/datos', async (req, res) => {
  try {
    console.log("Intentando conectar con:", process.env.GARMIN_EMAIL);
    const client = new GarminConnect();
    await client.login(process.env.GARMIN_EMAIL, process.env.GARMIN_PASSWORD);
    const sleepData = await client.getSleepData(new Date());
    res.json({ status: "Éxito", data: sleepData });
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({ 
      error: "Error de conexión", 
      mensaje: error.message,
      causa: error.stack 
    });
  }
});

app.listen(process.env.PORT || 10000, () => {
  console.log("Servidor escuchando en puerto", process.env.PORT || 10000);
});

