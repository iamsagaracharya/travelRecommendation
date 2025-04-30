let data = {};

fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    console.log("Data loaded:", data);
  })
  .catch(error => console.error("Failed to load data:", error));

function search() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const resultDiv = document.getElementById('recommendations');
  resultDiv.innerHTML = '';

  if (!keyword) return;

  let matches = [];

  if (keyword.includes("beach")) {
    matches = data.beaches;
  } else if (keyword.includes("temple")) {
    matches = data.temples;
  } else {
    const countryMatch = data.countries.find(c =>
      c.name.toLowerCase().includes(keyword)
    );
    if (countryMatch) {
      matches = countryMatch.cities;
    }
  }

  if (matches.length > 0) {
    matches.forEach(item => {
      resultDiv.innerHTML += `
        <div class="result-card">
          <h3>${item.name}</h3>
          <img src="${item.imageUrl}" alt="${item.name}" width="300">
          <p>${item.description}</p>
        </div>
      `;
    });
  } else {
    resultDiv.innerHTML = `<p>No matching results found. Try another keyword!</p>`;
  }
const options = { timeZone: 'Asia/Kathmandu', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const kathmanduTime = new Date().toLocaleTimeString('en-US', options);
resultDiv.innerHTML += `<p>Current time in ${options.timeZone}: ${kathmanduTime}</p>`;
}

function clearResults() {
  document.getElementById('searchInput').value = '';
  document.getElementById('recommendations').innerHTML = '';
}

document.getElementById('searchBtn').addEventListener('click', search);
document.getElementById('clearBtn').addEventListener('click', clearResults);