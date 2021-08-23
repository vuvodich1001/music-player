var songs = [
    {
        title: 'Nevada',
        author: 'Cozi',
        path: './assests/music/nevada-ft-cozi-zuehlsdorff-lyrics.mp3',
        image: './assests/img/nevada-image.jpg'
    },
    {
        title: 'Summertime',
        author: 'Vu Nguyen',
        path: './assests/music/391-summertime-sunshine.mp3',
        image: './assests/img/summertime-image.jpg'
    },
    {
        title: 'Superhero',
        author: 'Mai Ngon',
        path: './assests/music/superhero-feat-chris-linton-ncs-release.mp3',
        image: './assests/img/superhero-image.jpg'
    }
]

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var audio = $('audio');
var btn_play = $('.btn-play');
var btn_next = $('.btn-next');
var btn_back = $('.btn-prev');
var btn_repeat = $('.btn-repeat');
var btn_random = $('.btn-random');
var range = $('#progress');
var songName = $('.header h2');
var songImage = $('.cd .cd-thumb');
var playlist = $('.playlist');
var volume = $('#volume');
var time = $('.time');
var duration = $('.duration');
var currentSong = 0;
var isPlaying = false;

audio.volume = volume.value;
function init(currentS) {
    audio.src = songs[currentS].path;
    songName.innerHTML = songs[currentS].title
    songImage.style.backgroundImage = `url(${songs[currentS].image})`;
}

function renderSong() {
    var musics = songs.map(function (value) {
        return `
        <div class="music">
        <img src="${value.image}" alt="">
        <div class="body">
            <h3 class="title">${value.title}</h3>
            <span>${value.author}</span>
        </div>
        <i class="fas fa-ellipsis-h"></i>
        </div>
        `;
    })
    playlist.innerHTML = musics.join(' ');

    var music = $$('.music');
    Array.from(music).forEach(function (music) {
        music.onclick = function (e) {
            var title = music.querySelector('.title');
            var index = songs.findIndex(function (song) {
                return title.innerText === song.title;
            })
            currentSong = index;
            init(currentSong);
            animationCd.play();
            audio.play();
        }
    })
}

init(currentSong);
renderSong();

btn_play.onclick = function (e) {
    if (isPlaying) {
        animationCd.pause();
        audio.pause();

    }
    else {
        animationCd.play();
        audio.play();
    }
}
btn_next.onclick = function (e) {
    if (currentSong < songs.length - 1) {
        init(++currentSong);
    }
    else {
        currentSong = 0;
        init(currentSong);
    }
    animationCd.play();
    audio.play();

}

btn_back.onclick = function (e) {
    currentSong > 0 ? init(--currentSong) : init(currentSong);
    animationCd.play();
    audio.play();
}

audio.onplay = function (e) {
    isPlaying = true;
    btn_play.innerHTML = `<i class="fas fa-pause-circle"></i>`;
}

audio.onpause = function (e) {
    isPlaying = false;
    btn_play.innerHTML = `<i class="fas fa-play-circle"></i>`;
}

function changeTime(second) {
    var s = second % 60;
    s < 10 ? s = `0${s}` : s;
    var m = Math.floor(second / 60);
    return m == 0 ? `00:${s}` : `${m}:${s}`;
}

audio.ontimeupdate = function (e) {
    if (audio.duration) {
        range.max = Math.floor(audio.duration);
        range.value = Math.floor(audio.currentTime);
        time.innerText = changeTime(Math.floor(audio.currentTime));
        duration.innerText = changeTime(Math.floor(audio.duration));
    }
}

range.onchange = function (e) {
    audio.currentTime = e.target.value;
}

audio.onended = function (e) {
    if (currentSong < songs.length - 1) {
        init(++currentSong);
    }
    else {
        currentSong = 0;
        init(currentSong);
    }
    audio.play();
    btn_play.innerHTML = `<i class="fas fa-pause-circle"></i>`;
}

volume.onchange = function (e) {
    audio.volume = e.target.value;
}

btn_repeat.onclick = function (e) {
    init(currentSong);
    audio.play();
}

btn_random.onclick = function (e) {
    var songNumber;
    do {
        songNumber = Math.floor(Math.random() * songs.length);
    } while (songNumber === currentSong);

    currentSong = songNumber;
    init(currentSong);
    audio.play();
}
// document.onscroll = function (e) {
//     var scroll = window.scrollY;
//     var cdWidth = songImage.offsetWidth;

//     var newCdWidth = cdWidth - scroll;
//     songImage.style.width = scroll >= 0 ? (cdWidth - scroll) + 'px' : 0;
//     console.log(scroll)
// }


var animationCd = songImage.animate([{
    transform: 'rotate(360deg)',
}], {
    duration: 20000,
    iterations: Infinity
})

animationCd.pause();