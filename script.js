
const newsLanguage = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"];


async function gifsDisplay(order) {

    const rndNum = Math.floor(Math.random() * newsLanguage.length);
    let newsApi = "https://gnews.io/api/v4/top-headlines?country=" + newsLanguage[rndNum] + "&token=4d87631dbcc20e568dab4ee96b469041";

    // Setting News Api
    let newsResponse = await fetch(newsApi);
    let json1 = await newsResponse.json();
    let toTranslate = await json1.articles[0].title.split(' ').slice(0, 10).join(" ");
    let articleLink = await json1.articles[0].url;
    document.getElementById("header" + order).textContent = toTranslate;
    document.getElementById("link" + order).href = articleLink;
    const headerStyle = document.getElementById("header" + order).style;
    headerStyle.width = '100%';
    headerStyle.display = 'flex';
    headerStyle.display = 'flex';
    headerStyle.fontSize = '20px';
    headerStyle.textAlign = 'center';
    headerStyle.marginLeft = '5px';

    switch (order) {
        case 1:
            headerStyle.color = '#10FF04';
            break;
        case 2:
            headerStyle.color = '#FF0404';
            break;
        case 3:
            headerStyle.color = '#0038FF';
            break;
    }

    // Setting Google Api
    let googleApi = await "https://translation.googleapis.com/language/translate/v2?key=AIzaSyAlh2LwprjWTzc_EJ7nixFiGupDlUTZrXs&q=" + toTranslate + "&target=en";
    const transResponse = await fetch(googleApi);
    let json2 = await transResponse.json();
    let newsWords = await json2.data.translations[0].translatedText.toString().replace(/(&quot\;)/g,"\"").split(' ');
    let filtered = newsWords.filter(word => word.length > 2).filter(word => word != 'are').filter(word => word != 'the').slice(0, 5);

    // Setting Gifcities Api
    let gifApis = (await filtered.map(x => "https://gifcities.archive.org/api/v1/gifsearch?q=" + x));
    await console.log(gifApis);

    // Gif rendering function
    async function gifShow(num) {
        let gifResponse = await fetch(gifApis[num]);
        let jsonGif = await gifResponse.json();
        // await stall(500);
        let gift = await "https://web.archive.org/web/" + jsonGif[0].gif;
        let arr = await gift.split("/http:", 2);
        let gifnew = await arr[0] + "if_/http:" + arr[1];
        return gifnew;
    }

    // Displaying Gif translations
    promises = [gifShow(0), gifShow(1), gifShow(2), gifShow(3), gifShow(4)]
    Promise.all(promises)
        .then((gifnew) => {
            let imgs = document.querySelectorAll(".img-wrapper" + order + " img");
            for (let i = 0; i < imgs.length; i++) {
                imgs[i].src = gifnew[i];
                imgs[i].style.margin = 'auto 3px';
            }
        });
}



gifsDisplay(1);

gifsDisplay(2);

gifsDisplay(3);

// Sound setting

let playButton = document.getElementById("play");
let stopButton = document.getElementById("stop");


playButton.addEventListener("click", function () {
    playButton.style.display = 'none';
    stopButton.style.display = 'flex';
});


stopButton.addEventListener("click", function () {
    stopButton.style.display = 'none';
    playButton.style.display = 'flex';
});

// document.body("click", function () {
//     stopButton.style.display = 'none';
//     playButton.style.display = 'flex';
//     console.log('click');








