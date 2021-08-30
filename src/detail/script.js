function getByCode(code) {
  $.get(
    "https://restcountries.eu/rest/v2/alpha/" + code,
    function (data, status) {
      console.log("DATA", data);
      fillData(data);
    }
  ).fail(function () {
    console.log("FAIL");
  });
}

function generateButtonByCode(code) {
  $.get(
    "https://restcountries.eu/rest/v2/alpha/" + code,
    function (data, status) {
      let detailUrl = "./detail.html?code=" + data.alpha3Code;
      $("#border-countries").append(
        '<a href="' +
          detailUrl +
          '" class="mx-1"><button class="btn btn-sm btn-outline-secondary" type="button" id="back-button">' +
          data.name +
          "</button></a>"
      );
    }
  ).fail(function () {});
}

function fillData(data) {
  const currencies = data.currencies.map(function (obj) {
    return obj.name;
  });
  const languages = data.languages.map(function (obj) {
    return obj.name;
  });

  $("#flag-image").attr("src", data.flag);
  $("#country-name").html(data.name);
  $("#country-native").html(data.nativeName);
  $("#country-population").html(data.population);
  $("#country-region").html(data.region);
  $("#country-sub").html(data.subregion);
  $("#country-capital").html(data.capital);
  $("#country-domain").html(data.topLevelDomain.join(", "));
  $("#country-currencies").html(currencies.join(", "));
  $("#country-languages").html(languages.join(", "));

  for (let i = 0; i < data.borders.length; i++) {
    const code = data.borders[i];
    generateButtonByCode(code);
  }
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
}

$(document).ready(function () {
  // flag-image
  // country-name
  // country-native
  // country-population
  // country-region
  // country-sub
  // country-capital
  // country-domain
  // country-currencies
  // country-languages
  getByCode(getUrlParameter("code"));
});
