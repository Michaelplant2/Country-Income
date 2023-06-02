const url = "http://api.worldbank.org/v2/country/?format=json";

const div = document.getElementById("country-list");
const prevPg = document.getElementById("prevPg");
const nextPg = document.getElementById("nextPg");

getCountries(url);

async function getCountries(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    listData(data);
  } catch (error) {
    console.log(error);
  }
}

function listData(data) {
  data[1].map(function (country) {
    const countryName = `
        <li id="country">${country.name}</li>
      `;
    const ul = document.createElement("ul");
    ul.innerHTML = countryName;
    div.appendChild(ul);
    ul.addEventListener("click", () => {
      ul.innerHTML = `
        <li><strong>Region:</strong>${country.region.value}</li>
        <li><strong>Capital:</strong>${country.capitalCity}</li>
        <li><strong>Income:</strong>${country.incomeLevel.value}</li>
      `;
      if (country.incomeLevel.value === "High income") {
        ul.style.backgroundColor = "green";
      } else if (
        country.incomeLevel.value === "Lower middle income" ||
        country.incomeLevel.value === "Upper middle income"
      ) {
        ul.style.backgroundColor = "yellow";
      } else if (country.incomeLevel.value === "Low income") {
        ul.style.backgroundColor = "red";
      } else {
      }
    });
  });
  main.appendChild(div);
}

let pageNum = 1;

nextPg.addEventListener("click", () => {
  if (pageNum > 5) {
  } else {
    div.innerHTML = "";
    pageNum++;
    let page = "&page=" + pageNum;
    getCountries(url + page);
  }
});

prevPg.addEventListener("click", () => {
  if (pageNum < 2) {
  } else {
    div.innerHTML = "";
    pageNum--;
    let page = "&page=" + pageNum;
    getCountries(url + page);
  }
});