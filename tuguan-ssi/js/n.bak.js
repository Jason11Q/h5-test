/* 插入统计 */
var _hmt = _hmt || [];

// 优化header加载（临时版）
let headerDom = null;
let hasHeader = false;
let hfTimer = null;

// 在backend内window.$config为空，需要初始值
if (!window.$config) {
  window.$config = { DOC_SERVER_URL: '/doc/' };
}
// 自定义接口地址
window._docUrl = window.$config.DOC_SERVER_URL;
function loadHeader() {
  headerDom = document.querySelector('#header');
  if (!headerDom) {
    return;
  }
  hasHeader = true;
  clearInterval(hfTimer);

  let token = localStorage.getItem('token');

  if (!token) {
    let registerDom = document.querySelector('#btnRegister');
    let loginDom = document.querySelector('#btnLogin');
    loginDom.style.display = 'block';
    registerDom.style.display = 'block';

    // 没有登录就显示 免费试用按钮
    // document.querySelector('.header-botton-free').style.display = 'block';
  } else {
    // document.querySelector('.header-botton-free').style.display = 'none';
  }
}

function onNotice() {
  let once = sessionStorage.getItem('once') == 'true';
  if (window.$config.NOTICE && !once) {
    location.href = '../notice.html';
    return;
  }  
}

onNotice();

window.onload = function header() {
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
 
  let menuSum = document.getElementsByClassName('secondary-menu');
  for (let i = 0; i < menuSum.length; i++) {
    menuSum[i].onmouseover = function () {
      // if (i == 0 || i == 1) {
      //   menuSum[i].style.display = "flex"
      // } else {
      menuSum[i].style.display = 'flex';
      // }
    };
    // menuSum[i].onmouseout = function () {
    //   menuSum[i].style.display = 'none';
    // };
  }
  let footerMenuSum = document.getElementsByClassName('footer-menu-a');
  for (let i = 0; i < footerMenuSum.length; i++) {
    footerMenuSum[i].style.display = 'none';
  }
  try {
    onpageshow();
  } catch {}
};
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
function interlocution() {
  let url = 'https://' + window.location.host + '/bbs';
  window.location.href = url;
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

function scene(e) {
  $('html,body').animate({ scrollTop: $(e).offset().top - 120 }, 1000);
}

$(document).click(function (e) {
  let _headerMenu = $('.header-right');
  if (!_headerMenu.is(e.target) && _headerMenu.has(e.target).length === 0) {
    $('.secondary-menu').hide();
  }
});
// phone端登录注册
function loginShow() {
  let _mask = document.getElementsByClassName('mask');
  let _loginBox = document.getElementsByClassName('login-box');
  let _menuList = document.getElementById('menu-list');
  if (_mask[0].style.display === 'block' && _menuList.style.display === 'none') {
    _mask[0].style.display = 'none';
    _loginBox[0].style.display = 'none';
  } else {
    _mask[0].style.display = 'block';
    _loginBox[0].style.display = 'flex';
  }
  _menuList.style.display = 'none';
}
