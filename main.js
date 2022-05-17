const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playList = $('.playlist')
const cd = $('.cd')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const app = {
    currentIndex: 5,
    isPlaying: false,
    songs: [
        {
          name: "Click Pow Get Down",
          singer: "Raftaar x Fortnite",
          path: "https://mp3.vlcmusic.com/download.php?track_id=34737&format=320",
          image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "https://mp3.vlcmusic.com/download.php?track_id=34213&format=320",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "Naachne Ka Shaunq",
          singer: "Raftaar x Brobha V",
          path:
            "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
          image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
          name: "Mantoiyat",
          singer: "Raftaar x Nawazuddin Siddiqui",
          path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Aage Chal",
          singer: "Raftaar",
          path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
          image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
          name: "Ghe Qua",
          singer: "Tofu-Disk",
          path: "../music/Ghe-Qua-Dick-Tofu-PC.mp3",
          image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/a/e/b/8/aeb88408626df7aef9c92f89afbcc179.jpg"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
    ],
    render: function() {
        const htmls= this.songs.map((song, index) => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3
                    <p class="author">${song.singer}</p>
                </div>
            </div>
            `
        })
        playList.innerHTML = htmls.join('')
    },
    handleEvents: function() {
      const _this = this
      const cdWidth = cd.offsetWidth
      document.onscroll = function() {
        const scrollTop = window.scrollTop || document.documentElement.scrollTop
        const newWidth = cdWidth - scrollTop
        
        cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
        cd.style.opacity = newWidth / cdWidth
      },
      playBtn.onclick = function() {
        if (_this.isPlaying) {
          audio.pause()
          player.classList.remove('playing')
          _this.isPlaying = !(_this.isPlaying)
        }
        else {
          audio.play()
          player.classList.add('playing')
          _this.isPlaying = !(_this.isPlaying)
        }
      }
    },
    defineProperties: function () {
      Object.defineProperty(this, 'currentSong', {
        get: function () {
          return this.songs[this.currentIndex]
        }
      })
    },
    loadCurrentSong : function() {
      
      heading.textContent = this.currentSong.name
      cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
      audio.src = this.currentSong.path
      console.log(heading, cdThumb, audio)
    },
    
    start: function() {
      // define properties for app
      this.defineProperties()
      // handle changes events
      // handle when user click play button
      this.handleEvents()

      // load current Song
      this.loadCurrentSong()

      this.render()
    }

}
app.start()

