const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/tile/:z/:x/:y', async (req, res) => {
  const { z, x, y } = req.params;
  const url = `https://gis.maps.by/arcgis/rest/services/Hosted/VectorTile_240522/VectorTileServer/tile/${z}/${x}/${y}.pbf`;

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer' 
    });


    res.setHeader('Content-Type', 'application/x-protobuf');
    res.setHeader('Content-Disposition', `attachment; filename="${z}-${x}-${y}.pbf"`);


    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error(`Error fetching tile: ${error.message}`);
    res.status(500).send('Error fetching tile');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
