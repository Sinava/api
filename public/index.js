document.getElementById('tileForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const z = document.getElementById('z').value;
    const x = document.getElementById('x').value;
    const y = document.getElementById('y').value;

    const url = `/tile/${z}/${x}/${y}`;
    const message = document.getElementById('message');

    try {
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${z}-${x}-${y}.pbf`;
        link.click();
        message.textContent = 'Tile downloaded successfully.';
      } else {
        message.textContent = 'Error fetching tile.';
      }
    } catch (error) {
      message.textContent = 'Error fetching tile.';
    }
  });