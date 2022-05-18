const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playList = $('.playlist')
const cd = $('.cd')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const nextBtn = $('.btn-next')
const progress = $('#progress')
const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
          name: "ILOVEYOU2NE1",
          singer: "remix",
          path: "./assets/music/i-love-u-2ne1-ft-boom-pi-seven-remix-nhac-hot-tik-tok-2022.mp3",
          image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/c/4/b/0/c4b0da67bae11731685f79432dc462b7.jpg"
        },
        {
          name: "Hôm Nay Tôi Buồn",
          singer: "Phùng Khánh Linh",
          path: "./assets/music/HomNayToiBuon-PhungKhanhLinh-5383740.mp3",
          image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_png/covers/0/8/08193d6fe58d511c3cf519a0cc856c91_1517889125.png"
        },
        {
          name: "Đúng Người Đúng Thời Điểm",
          singer: "Thanh Hung",
          path:
            "./assets/music/DungNguoiDungThoiDiem8DAudio-ThanhHungIdol-6058059.mp3",
          image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/0/6/b/406b5324276ed23168cfc11822039372.jpg"
        },
        {
          name: "Anh Sẽ Đón Em",
          singer: "Nguyên, Trang",
          path: "./assets/music/AnhSeDonEmCukakRemix-NguyenTrang-7202625.mp3",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Phi Hành Gia",
          singer: "Raftaar",
          path: "https://mp3-s1-zmp3.zmdcdn.me/136884ef90ae79f020bf/1641773109473754030?authen=exp=1653030356~acl=/136884ef90ae79f020bf/*~hmac=557b01813ba71f01c8c54e8fe4932458&fs=MTY1Mjg1NzU1NjY2Mnx3ZWJWNnwwfDM2LjM3LjE3OS4xOTU",
          image:
            "https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/8/6/d/6/86d68a321a1b7562b1bbf8e37642343a.jpg"
        },
        {
          name: "Ghe Qua",
          singer: "Tofu-Disk",
          path: "./assets/music/Ghe-Qua-Dick-Tofu-PC.mp3",
          image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/a/e/b/8/aeb88408626df7aef9c92f89afbcc179.jpg"
        },
        {
          name: "Sao Cha Không",
          singer: "Phan Mạnh Quỳnh",
          path: "https://mp3-s1-zmp3.zmdcdn.me/f24ae75bce1d27437e0c/2224528644319819820?authen=exp=1653031228~acl=/f24ae75bce1d27437e0c/*~hmac=5de3f5b6e3813c6db46dccccc751e67e&fs=MTY1Mjg1ODQyODY4NHx3ZWJWNnwxMDmUsICzNDmUsICwMzE0fDExNS43OC4yMTEdUngOTY",
          image:
            "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/f/3/1/e/f31efb0da9bc984d7246866e6d529d78.jpg"
        },
    ],
    defineProperties: function () {
      Object.defineProperty(this, 'currentSong', {
        get: function () {
          return this.songs[this.currentIndex]
        }
      })
    },
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
      }

      const cdThumbAnimate = cdThumb.animate([
        {transform:'rotate(360deg)'}
      ], {
        duration: 10000,
        iterations: Infinity
      })
      cdThumbAnimate.pause()
      // play music when click button is clicked
      playBtn.onclick = function() {
        if (_this.isPlaying) {
          audio.pause()
        }
        else {
          audio.play()
        }
      }

      audio.onplay = function() {
        _this.isPlaying = true
        player.classList.add('playing')
        cdThumbAnimate.play()
      }

      audio.onpause = function() {
        _this.isPlaying = false
        player.classList.remove('playing')
        cdThumbAnimate.pause()
      }

      nextBtn.onclick = function() {
        if (_this.currentIndex  !== _this.songs.length ) {
          _this.loadCurrentSong()
          audio.play()
          _this.currentIndex++
        }else {
          _this.currentIndex = 0
        }
      }

      audio.ontimeupdate = function() {
        if (audio.duration) {
          const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
          progress.value = progressPercent
        }
      }

      progress.onchange = function(e) {
        if (audio.duration){
          audio.currentTime = e.target.value /100 * audio.duration
          audio.play()
        }
      }

    },
    loadCurrentSong : function() {
      heading.textContent = this.currentSong.name
      cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
      audio.src = this.currentSong.path
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

