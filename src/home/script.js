function cardGenerator(linkUrl, imgUrl, name, population, region, capital) {
  const cardHtml =
    '<div class="col-xl-3 col-lg-4 col-md-6 col-12 d-flex justify-content-center p-4">' +
    '<a href="' +
    linkUrl +
    '">' +
    '<div class="card h-100" style="width: 100%;">' +
    '<img src="' +
    imgUrl +
    '" class="card-img-top" alt="...">' +
    '<div class="card-body">' +
    '<div class="card-text">' +
    '<h5 class="p-1">' +
    name +
    "</h5>" +
    '<div><span class="semi-bold">Population: </span><span>' +
    population +
    "</span></div>" +
    '<div><span class="semi-bold">Region: </span><span>' +
    region +
    "</span></div>" +
    '<div><span class="semi-bold">Capital: </span><span>' +
    capital +
    "</span></div>" +
    "</div></div></div></a></div>";

  $("#card-list").append(cardHtml);
}

function clearCards() {
  $("#card-list").html("");
}

function getAll() {
  $.get("https://restcountries.eu/rest/v2/all", function (data, status) {
    fillCards(data);
  }).fail(function () {
    clearCards();
  });
}

function getByName(name) {
  $.get(
    "https://restcountries.eu/rest/v2/name/" + name,
    function (data, status) {
      fillCards(data);
    }
  ).fail(function () {
    clearCards();
  });
}

function getByRegion(region) {
  $.get(
    "https://restcountries.eu/rest/v2/region/" + region,
    function (data, status) {
      fillCards(data);
    }
  ).fail(function () {
    clearCards();
  });
}

function getByRegionAndName(region, name) {
  $.get(
    "https://restcountries.eu/rest/v2/name/" + name,
    function (data, status) {
      fillCardsByRegion(data, region);
    }
  ).fail(function () {
    clearCards();
  });
}

function fillCards(data) {
  clearCards();

  $(data).each(function () {
    let countryData = $(this)[0];
    let detailUrl = "../detail/detail.html?code=" + countryData.alpha2Code;

    cardGenerator(
      detailUrl,
      countryData.flag,
      countryData.name,
      countryData.population,
      countryData.region,
      countryData.capital
    );
  });
}

function fillCardsByRegion(data, region) {
  clearCards();

  const filteredData = data.filter(function (x) {
    return x.region == region;
  });

  fillCards(filteredData);
}

function searchAction() {
  const searchValue = $("#search-input").val();
  const selectValue = $("#region-select").val();

  if (
    (searchValue != null) &
    (searchValue != "") &
    (searchValue != undefined)
  ) {
    if (selectValue != "placeholder") {
      getByRegionAndName(selectValue, searchValue);
    } else {
      getByName(searchValue);
    }
  } else {
    if (selectValue != "placeholder") {
      getByRegion(selectValue);
    }
  }
}

function initSearchButton() {
  $("#search-button").click(function () {
    searchAction();
  });
}

function initSearchInput() {
  $("#search-input").keypress(function (e) {
    if (e.which == 13) {
      searchAction();
    }
  });
}

function initRegionDropdown() {
  $("#region-select").on("change", function () {
    const searchValue = $("#search-input").val();
    const selectValue = $("#region-select").val();

    if (
      (selectValue != null) &
      (selectValue != "") &
      (selectValue != undefined) &
      (selectValue != "placeholder")
    ) {
      if (
        (searchValue != null) &
        (searchValue != "") &
        (searchValue != undefined)
      ) {
        getByRegionAndName(selectValue, searchValue);
      } else {
        getByRegion(selectValue);
      }
    } else if (selectValue == "placeholder") {
      getAll();
    }
  });
}

$(document).ready(function () {
  // search-button
  // search-input
  // region-select
  initSearchButton();
  initSearchInput();
  initRegionDropdown();
  getAll();
});
