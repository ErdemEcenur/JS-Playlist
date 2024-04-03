const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')
const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')
const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')
const currentProgress = document.getElementById('current-progress')

//Sequense
let index

//Loop
let loop = true

//SongList
const songList = [
    {
        name: "Yakışıklım",
        link: "assets/KÖFN X Simge - Yakışıklı (Official Video).mp3",
        artist: "KÖFN X Simge",
        image: "assets/ab67616d0000b27334faeb714d6b7ef035611b0f.jpeg"
    },
    {
        name: "Kehribar",
        link: "assets/Ebru Yaşar & Burak Bulut - Kehribar.mp3",
        artist: "Ebru Yaşar & Burak Bulut",
        image: "assets/artworks-v4ltOQyHWZ8o-0-t500x500.jpg"
    },
    {
        name: "I See Red",
        link: "assets/Everybody Loves An Outlaw - I See Red (Official Lyric Video).mp3",
        artist: "Everybody Loves An Outlaw",
        image: "assets/maxresdefault.jpg"
    },
    {
        name: "Wait a Minute!",
        link: "assets/Willow Smith - Wait a Minute! (Lyrics).mp3",
        artist: "Willow Smith",
        image: "assets/a0155134160_65.jpeg"
    }, 
    {
        name: "Yo Voy",
        link: "assets/Yo Voy (feat. Daddy Yankee).mp3",
        artist: "Daddy Yankee",
        image: "assets/ab67616d0000b27387d3146807ad53b05a7daaac.jpeg"
    }
]

//Assign Song
const setSong = (ArrayIndex) =>{
    let {name,link,artist,image} = songList [ArrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image
    audio.onloadeddata = () =>{     //time while playing music
    maxDuration.innerText = timeFormatter(audio.duration)
}
    playAudio()

    playListContainer.classList.add('hide')
}


const playAudio = () =>{
    audio.play()
    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')
}
const pauseAudio = () =>{
    audio.pause()
    playButton.classList.remove('hide')
    pauseButton.classList.add('hide')
}
const nextSong = () =>{
    if(loop){ //if loop is on
        if( index == songList.length - 1){
            index = 0
        } else {
            index = index + 1
        }
        setSong(index)
    } else{ // if shuffle is on
        let randIndex = Math.floor(Math.random() * songList.lenght)
        setSong(randIndex)
    }
}
const prevSong = () => {
    pauseAudio()
    if(index > 0){
        index = index - 1       
    } else {
        index  = songList.lenght - 1
    }
    setSong(index)
}

audio.onended = () =>{
    nextSong()
}

//click on repeat
repeatButton.addEventListener('click',()=>{
    if(repeatButton.classList.contains('active')){
        repeatButton.classList.remove('active')
        audio.loop = true
    } else{
        repeatButton.classList.add('active')
        audio.loop = false
    }
})

//click on shuffle
shuffleButton.addEventListener('click',()=>{
    if(shuffleButton.classList.contains('active')){
        shuffleButton.classList.remove('active')
        loop = false
    } else{
        shuffleButton.classList.add('active')
        loop = true
    }
})

//show playlist
playListButton.addEventListener('click', ()=>{
    playListContainer.classList.remove('hide')
})
//close playlist
closeButton.addEventListener('click', ()=>{
    playListContainer.classList.add('hide')
})

//Progress Bar
progressBar.addEventListener('click',(event)=>{
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(coordStart)

    let coordEnd = event.clientX
    console.log(coordEnd)

    console.log(progressBar.offsetWidth)
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"
    audio.currentTime = progress * audio.duration

    playAudio()
})

//Set Interval
setInterval(() => {
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);

//click on play
playButton.addEventListener('click',playAudio)
//click on pause
pauseButton.addEventListener('click',pauseAudio)
//click on next
nextButton.addEventListener('click',nextSong)
//click on previuos
prevButton.addEventListener('click',prevSong)

window.onload = () =>{
    index = 0
    setSong(index)
    pauseAudio()
    initPlaylist()
}

//TimeFormatter
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? '0' + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? '0' + second : second
    return `${minute}:${second}`;
}

audio.addEventListener('timeupdate',()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//create playlist
const initPlaylist = () =>{
   for (const i in songList) {
    playListSongs.innerHTML +=  `<li class="playlistSong" onclick="setSong(${i})">
    <div class="playlist-image-container">
    <img src="${songList[i].image}"/>
    </div>
    <div class="playlist-song-details">
    <span id="playlist-song-name">
    ${songList[i].name}
    </span>
    <span id="playlist-song-artist-album">
    ${songList[i].artist}
    </span>
    </div>
    </li>` 
    
   } 
}