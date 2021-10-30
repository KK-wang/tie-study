window.addEventListener('load', () => {
  var player = new Aliplayer({
    id: 'player-con',
    width:"1920px",
    height:"1280px",
    vid:'[[${VideoId}]]',
    playauth:'[[${PlayAuth}]]',
    cover:'[[${Cover}]]'
  })
})