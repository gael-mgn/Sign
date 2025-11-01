async function fetchSheetData() {
  const spreadsheetId = "1sVCmgprkNQLroXlowU-Rp0PlUySAFZ331x3H5t3VT7A";
  const sheetName = "posts";

  const url = `https://script.google.com/macros/s/AKfycbwEZj9RKrO2c502VHhL8OaznlZJtHTLl_pOXRMeqOs0BOUaBEf-OGsGBBj-0_YNazBo/exec?spreadsheetId=${spreadsheetId}&sheetName=${sheetName}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur lors de l'appel à la Web App Google");
    }

    const data = await response.json();
    console.log("✅ Données récupérées :", data);

    // ⬇️ On renvoie le tableau pour pouvoir le réutiliser
    return data;

  } catch (error) {
    console.error("❌ Erreur fetchSheetData :", error);
    return null;
  }
}

// Exemple d'utilisation :
(async () => {
  const data = await fetchSheetData();

  if (data) {
    // Tu peux maintenant utiliser 'data' ici
    console.log("Nombre de lignes :", data.length);
    // Par exemple, afficher le premier élément :
    console.log("Première ligne :", data[0]);







const map = L.map('map').setView([46.8, 2.5], 6);

// 🌍 Fond de carte moderne
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://carto.com/">CARTO</a> | © OpenStreetMap contributors',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

const markersCluster = L.markerClusterGroup();
map.addLayer(markersCluster);

const sidebar = document.getElementById('sidebar');

async function getCoords(city) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(city, parseFloat(data[0].lat), parseFloat(data[0].lon));
  if (data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  console.warn("city introuvable :", city);
  return null;
}

async function afficherPoints() {
  for (const poi of data) {
    const coords = [parseFloat(poi.lat), parseFloat(poi.lon)];
    if (coords) {
      const marker = L.marker(coords)
        .bindPopup(`<strong>${poi.title}</strong><br>${poi.description}<br><em>${poi.city}</em>`);

      markersCluster.addLayer(marker);

      const item = document.createElement('div');
      item.className = 'poi';
      item.innerHTML = `<h3>${poi.title}</h3><p>${poi.city}</p><p>${poi.description}</p>`;
      item.addEventListener('click', () => {
        map.setView(coords, 12);
        marker.openPopup();
      });
      sidebar.appendChild(item);
    }
  }
}

afficherPoints();

  }
})();







