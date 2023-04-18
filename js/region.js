// 1.전체 url가져오기
const currentURL = location.href;
console.log(currentURL);

//2.쿼리스트링 파라메터 가져오기
const urlObj = new URL(currentURL);

//파라메터에 대한 정보가 들어있다.
const params = urlObj.searchParams;
console.log(params);

//파라메터의 값을 구한다. params.get("변수명");
const q = params.get("q");
const krcity = params.get("krcity");
console.log(q, krcity);

//3. ajax 이용해 전체 날씨 정보 얻어오기
function getWeatherWithCity(q) {
  var temp = {};
  var urlAPI =
    "https://api.openweathermap.org/data/2.5/weather?appid=7b2d62f9b0048eac4a57d66e7bb38658&units=metric&lang=kr"; // city가 계속 붙으므로 url 초기화를 위해 반드시 넣어준다
  urlAPI += "&q=" + q;

  $.ajax({
    type: "GET",
    url: urlAPI,
    dataType: "json",
    async: false, // 결과 데이터를 리턴시키기 위해 동기 방식으로 변경
    success: function (data) {
      console.log(data);
      //정상 응답시 처리 작업
      temp.celsius = data.main.temp.toFixed(0); // 소수점 버림;
      temp.icon = data.weather[0].icon;
      temp.feels_like = data.main.feels_like;
      temp.humidity = data.main.humidity;
      temp.wind_speed = data.wind.speed;
    },
    error: function (request, status, error) {
      //응답 에러시 처리 작업
      console.log("code:" + request.status);
      console.log("message:" + request.responseText);
      console.log("error:" + error);
    },
  });

  console.log(temp);

  return temp;
}

//4.데이터 바인딩 작업
$(".register-title").text(`${krcity} 상세날씨`);
let temp = getWeatherWithCity(q);
$(".celsius").text(`RealFeel shadow ${temp.celsius} ℃`);
$(".feels_like").text(`대기질 ${temp.feels_like}`);
$(".humidity").text(`바람 ${temp.humidity} km/h`);
$(".wind_speed").text(`돌풍 ${temp.wind_speed} km/h`);

var iconURL = "https://openweathermap.org/img/wn/";
$(".weather_img").attr("src", iconURL + temp.icon + ".png");
