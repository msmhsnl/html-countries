function getByCode(code) {
  $.get(
    "https://restcountries.eu/rest/v2/alpha/" + code,
    function (data, status) {
      console.log("DATA", data);
    }
  ).fail(function () {
    // clearCards();
  });
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
  getByCode(getUrlParameter("code"));
});
