/**
 * 검색창 제어
 */
const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');
// 검색창 요소를 클릭할 때 실행
searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});
// 검색창 요소 내부 실제 input 요소에 포커스되면 실행
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});
// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

/**
 * 페이지 스크롤 제어
 */
// 페이지 스크롤에 영향을 받는 요소를 검색
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// 페이지에 스크롤 이벤트 추가
// 스크롤이 지나치게 자주 발샐하는 것을 조절(throttle, 일부러 부하를 줌)
// lodash _.throttle
window.addEventListener('scroll', _.throttle(function () {
  // 페이지 스크롤 위치가 500px이 넘으면
  if ( window.scrollY > 500 ) {
    // Badge 요소 숨기기
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 상단으로 스크롤 버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  }
  else {
    // Badge 요소 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 상단으로 스크롤 버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0
  });
})


/**
 * 순서대로 나타나는 기능
 */
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,
    opacity: 1
  });
});

/**
 * 슬라이드 요소 관리
 */
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true // 반복 재생 여부
});

new Swiper('.promotion .swiper-container', {
  // direction 수평 슬라이드가 기본 옵션
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드를 바꿈
  }, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  slidesPerView: 3, // 한번에 보여주는 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: 1, // 1번 슬라이드가 가운데 보이기
  pagination: {
    el: '.promotion .swiper-pagination',
    clickable: true
  }
});

new Swiper('.awards .swiper-container', {
  // direction 수평 슬라이드가 기본 옵션
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  slidesPerView: 5, // 한번에 보여주는 슬라이드 개수
  spaceBetween: 30, // 슬라이드 사이 여백
  navigation: {
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
});

/**
 * Promotion 슬라이드 토글 기능
 */
// 슬라이드 영역 요소 검색
const promotionEl = document.querySelector('.promotion');
// 슬라이드 영역을 토글하는 버튼 검색
const promotionToggleBtn = document.querySelector('.toggle-promotion');
// 슬라이드 영역 숨김 여부 기본값
let isHidePromotion = false;
// 토글 버튼을 클릭하면
promotionToggleBtn.addEventListener('click', function() {
  // 슬라이드 영역 숨김 여부를 반댓값으로 할당
  isHidePromotion = !isHidePromotion;
  // 요소를 숨겨야 하면
  if ( isHidePromotion ) {
    promotionEl.classList.add('hide');
  // 요소를 보여야 하면
  } else {
    promotionEl.classList.remove('hide');
  }
});

/**
 * 부유하는 요소 관리
 */
// 범위 랜덤 함수(소수점 2자리까지)
// toFixed를 통해 반환된 문자 데이터를
// parseFloat를 통해 소수점을 가지는 숫자 데이터로 변환
function random(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 부유하는 (떠다니는) 요소를 만드는 함수
function floatingObject(selector, delay, size) {
  gsap.to(
    selector,
    random(1.5, 2.5),
    {
      delay: random(0, delay),
      y: size,
      repeat: -1,
      yoyo: true,
       ease: Power1.easeInOut
    }
  )
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

/**
 * 요소가 화면에 보여짐 여부에 따른 요소 관리
 */
// 관리할 요소를 검색
const spyEls = document.querySelectorAll('section.scroll-spy');
// 요소를 반복 처리
spyEls.forEach( function (spyEl) {
  new ScrollMagic
    .Scene({ // 검사할 장면(SCene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에 보여짐 여부 검사
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스를 추가
    .addTo(new ScrollMagic.Controller()) // 컨트럴러에 장면을 할당(필수)
});

/**
 * 올해가 몇년도인지 계산
 */
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();
