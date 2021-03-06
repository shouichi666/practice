'user static'

//sp-navの制御
{
  const icon = document.getElementById('icon');
  const nav = document.querySelector('.sp-nav');
  const body = document.getElementById('main');

  icon.addEventListener( 'click', () => {
    icon.classList.toggle('open');
    nav.classList.toggle('open');
    body.classList.toggle('open');
    console.log('open');
  });
}

// リターンボタン設定
{
  scrollTop('return-btn', 400);

  function scrollTop(elem,duration) {
    let target = document.getElementById(elem);

    target.addEventListener('click', () => {
      let currentY = window.pageYOffset; 
      let step = duration/currentY > 1 ? 10 : 100;
      let timeStep = duration/currentY * step;
      let intervalID = setInterval(scrollUp, timeStep);
  
      function scrollUp(){
        currentY = window.pageYOffset;
        if(currentY === 0) {
            clearInterval(intervalID);
        } else {
            scrollBy( 0, -step );
        }
      }
    });
  }
}

// スクロールイベント
{
  window.addEventListener( 'scroll', () => {
    
    function changeColorClassPrx() {
      const returnBtn = document.getElementById('return-btn');
      const firstVisual = document.querySelector('.first-visual');
      const headerParts = document.querySelector('.header');
      let scrollY = window.pageYOffset;
      let windowHY = firstVisual.offsetHeight;
      if( scrollY > windowHY &&  window.innerWidth > 768){
        returnBtn.classList.add('show');
        headerParts.style.backgroundColor = "#ff7316";
      } else {
        returnBtn.classList.remove('show');
        headerParts.style.backgroundColor = "transparent";
      }
  
      const prxParts = document.querySelector('.first-visual');
      prxParts.style.top =  -scrollY * 0.4 + 'px';
      prxParts.style.transform = "rotateX(" + scrollY * 0.1 + "deg)";
    }
    // フェードインの処理をまとめた関数
    function fadeinEvent() {

      // getElementsByClassName で、fadein-x-left のクラスを持つ要素を取得し配列として保持
      var fadeinXClass = Array.prototype.slice.call(document.getElementsByClassName("leftIn"));
      // getElementsByClassName で、fadein-x-right のクラスを持つ要素を取得し配列として保持
      var fadeinXRClass = Array.prototype.slice.call(document.getElementsByClassName("rightIn"));

      var fadeinYTClass = Array.prototype.slice.call(document.getElementsByClassName("topIn"));

      var fadeinYDClass = Array.prototype.slice.call(document.getElementsByClassName("bottomIn"));

      // 先に取得した配列を一つの配列にする
      // Array.prototype.push.apply(fadeinXClass, fadeinXRClass,fadeinYTClass,fadeinYDClass);
      let animationAllClass = fadeinXClass.concat( fadeinXRClass, fadeinYTClass, fadeinYDClass);

      // 配列の数だけ処理を行う
      animationAllClass.forEach( ( element ) => {

      // getBoundingClientRect で要素の位置や幅や高さなどを取得
      var boundingClientRect = element.getBoundingClientRect();

      // スクロールの位置情報（html のスクロールがなければ、body のスクロール）を取得
      var scroll = document.documentElement.scrollTop || document.body.scrollTop;

      // ブラウザウィンドウの ビューポートの高さ
      var windowHeight = window.innerHeight;

      // スクロールの位置が、フェードインしたい要素の位置にいるかどうか判定する
      if (scroll > scroll + boundingClientRect.top - windowHeight + 100){

          // 要素を表示する場合は、要素の透明度を無くし、X方向の移動距離を無くす。これで表示される
          // element.style.opacity = "1";
          element.classList.add('move');
        }
  });
    }
    // 画面がロードされたときに行う処理を記載
    window.onload = () => {
      // 画面が中途半端なスクロール位置でリロードされても表示するべきものが表示されるようにするため、ロードですぐに呼び出す
      fadeinEvent();

      // スクロールしたら動くエベントとして用意しておく。スクロールするたびに動くようにする
      window.addEventListener('scroll', fadeinEvent, false);
    }
    
    changeColorClassPrx();
    fadeinEvent();
  });
}