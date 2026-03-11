const express = require('express');
const { GarminConnect } = require('garmin-connect');
const app = express();

app.get('/datos', async (req, res) => {
  try {
    const client = new GarminConnect();
    await client.login(process.env.GARMIN_EMAIL, process.env.GARMIN_PASSWORD);
    const sleepData = await client.getSleepData();
    res.json(sleepData);
  } catch (error) {
    res.status(500).json({ error: "Error de conexión", detalle: error.message });
  }
});

app.listen(process.env.PORT || 3000);
