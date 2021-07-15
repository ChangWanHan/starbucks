  // Load the IFrame Player API code asynchronously.
  // Youtube IFrame API를 비동기로 로드합니다.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  // onYouTubePlayerAPIReady 함수 이름은,
  // Youtube IFrame Player API에서 사용하는 이름이기 때문에,
  // 다르게 지정하면 동작하지 않습니다.
  // 그리고 함수는 전역(Global)으로 등록해야 합니다.
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
    videoId: 'An6LvWQuj_8',
      playerVars: {
        autoplay: true,
        loop: true,
        playlist: 'An6LvWQuj_8'
      },
      events: {
        onReady: function (event) {
          event.target.mute(); 
        }
      }
    })
  }