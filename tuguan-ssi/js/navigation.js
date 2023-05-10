// 排他，只是展示当前弹窗设置显示隐藏
function menuShow(obj) {
  let menuSum = document.getElementsByClassName('secondary-menu');
  let menuList = obj.getElementsByClassName('secondary-menu');
  // if (menuList[0].style.display == 'block') {
  if (menuList[0].style.display == 'flex') {
    menuList[0].style.display = 'none';
  } else {
    for (let i = 0; i < menuSum.length; i++) {
      menuSum[i].style.display = 'none';
    }
    // if (obj.innerText == "技术产品") {
    //   menuList[0].style.display = "block"
    // } else if (obj.innerText == "开发指南") {
    //   menuList[0].style.display = "block"
    // } else {
    menuList[0].style.display = 'flex';
    // }
  }
  menuList[0].addEventListener('click', function (e) {
    e.cancelBubble = true;
  });
}

function showMenu() {
  let _mask = document.getElementsByClassName('mask');
  let _loginBox = document.getElementsByClassName('login-box');
  let _menuList = document.getElementById('menu-list');
  let _menuTop = document.getElementsByClassName('header-top');
  _loginBox[0].style.display = 'none';
  if (_menuList.style.display == '' || _menuList.style.display == 'none') {
    _mask[0].style.display = 'block';
    $(_menuList).slideDown('1000');
    _menuList.style.display = 'block';
    _menuTop[0].style.boxShadow = 'none';
  } else {
    $(_menuList).slideUp('1000');
    setTimeout(() => {
      _mask[0].style.display = 'none';
    }, 600);
    let _menuShow = document.getElementsByClassName('mini-menu');
    for (let i = 0; i < _menuShow.length; i++) {
      $(_menuShow[i]).slideUp('1000');
    }
  }
}

function closeShowMenu() {
  let _mask = document.getElementsByClassName('mask');
  let _menuList = document.getElementById('menu-list');
  $(_menuList).slideUp('1000');
  setTimeout(() => {
    _mask[0].style.display = 'none';
  }, 600);
  let _menuShow = document.getElementsByClassName('mini-menu');
  for (let i = 0; i < _menuShow.length; i++) {
    $(_menuShow[i]).slideUp('1000');
  }
}

function menuListShow(obj) {
  let _menuShow = obj.getElementsByClassName('mini-menu');
  if (_menuShow[0].style.display == '' || _menuShow[0].style.display == 'none') {
    $(_menuShow[0]).slideDown('1000');
    _menuShow[0].style.display = 'block';
  } else {
    $(_menuShow[0]).slideUp('1000');
  }
}

function footerMenuShow(obj) {
  let _ul = obj.getElementsByClassName('footer-menu-a');
  for (let i = 0; i < _ul.length; i++) {
    let _ulDisplay = _ul[i].style.display;
    if (_ulDisplay != 'none') {
      $(_ul[i]).slideUp('1000');
    } else {
      $(_ul[i]).slideDown('1000');
      _ul[i].style.display = 'block';
    }
  }
}

function loadHeader() {
  let token = localStorage.getItem('token');

  if (!token) {
    let registerDom = document.querySelector('#btnRegister');
    let loginDom = document.querySelector('#btnLogin');
    loginDom.style.display = 'block';
    registerDom.style.display = 'block';

    // 没有登录就显示 免费试用按钮
    // document.querySelector('.header-botton-free').style.display = 'block';
  }
}

function onNotice() {
  let once = sessionStorage.getItem('once') == 'true';
  if (window.$config.NOTICE && !once) {
    location.href = '../notice.html';
    return;
  }

  loadHeader();
}

$(document).click(function (e) {
  let _headerMenu = $('.header-right');
  if (!_headerMenu.is(e.target) && _headerMenu.has(e.target).length === 0) {
    $('.secondary-menu').hide();
  }
});

$(function () {
  if (window.$config.BAIDU_REPORT && window.$config.BAIDU_REPORT.ENABLE) {
    var s = document.getElementsByTagName('script')[0];
    var hm = document.createElement('script');
    hm.src = window.$config.BAIDU_REPORT.ADDRESS;
    s.parentNode.insertBefore(hm, s);

    var hmSelf = document.createElement('script');
    hmSelf.innerHTML = `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?8a4623c0a74eb94c5761b3e6d1e259b4";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`;
    s.parentNode.insertBefore(hmSelf, s);
  }
  onNotice();
});
