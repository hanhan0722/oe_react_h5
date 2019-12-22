import country_zh from "@/assets/lang/zh_country";
import country_en from "@/assets/lang/en_country";
const lang = localStorage.getItem('lang') || navigator.language.split('-')[0];

export function computeLength(str) {
  var l = 0;
  str.split("").forEach(function (letter) {
    var code = letter.charCodeAt(0);
    code > 256 ? (l += 1) : (l += 0.5);
  });
  return l;
}

export function getCountry(code) {
  var countryList = lang === "en" ? country_en : country_zh;
  var result = "";
  for (var country of countryList) {
    if (country["-Code"] === code) {
      result = country["-Name"];
    }
  }
  return result;
}

export function getCity(countryCode, cityCode) {
  var countryList = lang === "en" ? country_en : country_zh;
  var result = "";
  for (let country of countryList) {
    if (country["-Code"] === countryCode) {
      if (country.State) {
        for (let city of country.State) {
          if (city["-Code"] === cityCode) {
            result = city["-Name"];
          }
        }
      } else if (country.StateOnly) {
        for (let city of country.StateOnly.City) {
          if (city["-Code"] === cityCode) {
            result = city["-Name"];
          }
        }
      }
    }
  }
  return result;
}

export function setCountryLang() {
  var country = lang === "en" ? country_en : country_zh;
  var countryOption = [];
  country.map((elem, index) => {
    countryOption.push({
      label: elem["-Name"],
      value: elem["-Code"],
      index: index
    });
    return elem
  });
  return countryOption;
}

export function timeFormat(time) {
  return new Date(time).toLocaleDateString().replace(/[/]/g, "-");
}

export function getLabel(optionList,value){
  var result="";
  for(var p of optionList){
    if(value!==undefined && p.value==value){
      result=p.label;
    }
  }
  return result;
}

