function logout() {
  let url = `${location.origin}/api/user/v1/logout`;
  let token = localStorage.getItem('token');
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(() => {
    location.href = location.origin + location.pathname;
    localStorage.clear();
  });
}
/**
 * 获取 cookie
 * @param {string} name 键
 */
function getCookie(name) {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookieSplit = cookies[i].split('=');
    let cookieName = cookieSplit[0].trim();
    if (cookieName == name) {
      let cookieValue = cookieSplit[0];
      return cookieValue;
    }
  }
  return null;
}

(function () {
  'use strict';
  let hasLogin = getCookie('hasLogin');
  if (hasLogin == null) {
    window.localStorage.clear();
  }

  let token = localStorage.getItem('token');
  let userID = localStorage.getItem('userID');

  if (!token) {
    return;
  }

  // let userType = localStorage.getItem('userType');

  // 只有子用户需要获取对应租户
  // if (userType == 'Subuser' || userType == 'Tenant') {
  //   console.log(2);
  //   get_current_userinfo();
  //   return;
  // }
  // get_vip_info();
})();

function set_current_userinfo() {
  let routes = [
    {
      url: $config.BASE_ADDRESS + `backend/#/productCenter/product`,
      icon: 'iconavw-app',
      name: '产品中心',
    },
    {
      url: $config.BASE_ADDRESS + `backend/#/account`,
      icon: 'iconavw-ask',
      name: '账户管理',
    },
    {
      url: $config.BASE_ADDRESS + `backend/#/paymentManagement/payment`,
      icon: 'iconavw-money',
      name: '支付管理',
      // mustAdmin: true,
    },
    {
      url: $config.BASE_ADDRESS + `backend/#/authorizationManagement/authorization`,
      icon: 'iconavw-empowerment',
      name: '授权管理',
      // mustAdmin: true,
    },
  ];
  let userType = localStorage.getItem('userType');
  let isAdmin = localStorage.getItem('isAdmin') == 'true';
  let menus = [];

  if (!userType) {
    menus = [];
  }
  menus = routes.filter((f) => {
    if (!f.excludeUserType && !f.mustAdmin) {
      return true;
    } else if (f.mustAdmin) {
      return isAdmin;
    } else if (f.excludeUserType) {
      return f.excludeUserType.indexOf(userType) == -1;
    }
  });
  let timer = setInterval(() => {
    let loginDom = document.querySelector('#btnLogin');
    let registerDom = document.querySelector('#btnRegister');
    let loginBox = document.querySelector('.login-box');
    let userPhone = document.querySelector('.iconnav_icon_phone_register_signin');
    // let headerFreeBotton = document.querySelector('.header-botton-free');

    if (!(loginDom && registerDom)) {
      return;
    }
    // 隐藏立即免费试用按钮
    // if (headerFreeBotton) {
    //   headerFreeBotton.style.display = 'none';
    // }
    clearInterval(timer);

    let userName = localStorage.getItem('userName');
    let companyName = localStorage.getItem('companyName');

    loginDom.style.display = 'none';
    registerDom.style.display = 'none';
    loginBox.style.display = 'none';
    userPhone.style.display = 'none';

    let userDom = document.querySelector('#userBar');
    userDom.style.display = 'flex';
    // userDom.style.width = "200px";
    userDom.style.justifyContent = 'center';
    // userDom.style.maxWidth = "200px";
    // userDom.style.minWidth = "60px";
    userDom.style.flexBasis = 'auto';

    let phoneUserDom = document.querySelector('#phoneUserBar');
    phoneUserDom.style.display = 'flex';
    phoneUserDom.style.width = '100px';
    phoneUserDom.style.flexBasis = 'auto';

    let linkHtm = '';
    menus.forEach((menu) => {
      linkHtm += `<li><a class="dropdown-item" target="_blank" href="${menu.url}"><i class="iconfont ${menu.icon}"></i>${menu.name}</a></li>`;
    });
    let vipIdentityLevel = localStorage.getItem('vipIdentityLevel');
    // 默认标准版
    let className = 'non-vip-title-bg';
    let userIconSrc = '/img/header/non-vip-icon.png';
    if (vipIdentityLevel === 'Professional') {
      // 专业版
      className = 'vip-professional-title-bg';
      userIconSrc = '/img/header/vip-professional-icon.png';
    } else if (vipIdentityLevel === 'Private') {
      // 私享版
      className = 'vip-private-title-bg';
      userIconSrc = '/img/header/vip-private-icon.png';
    }
    let userHtml = `
          <ul class="navbar-nav">
              <li class="nav-item dropdown user-dropdown">
                <img class="user-icon" src="${userIconSrc}" alt="">
                <a class="nav-link dropdown-toggle" href="#" style="${
                  vipIdentityLevel === 'Private' ? 'color:#8B611B' : ''
                }" id="menuLink" role="button" title="${userName}" data-bs-toggle="dropdown" aria-expanded="false">
                  ${userName}
                </a>
                  <ul class="dropdown-menu" aria-labelledby="menuLink" style="position: absolute;">
                      <li class="nav-display dropdown-title-bg ${className}">
                        <span class="userName" title="${userName}">${userName}</span>
                        <p class="nav-display companyName company" title="${companyName}">${companyName}</p>
                        ${vipIdentityLevel !== 'Non' ? '<p class="expire-day">剩余 <span>' + expireDay + '</span> 天到期</p>' : ''}
                            <a class="" target="_blank" href="${$config.PAYMENT_PAGE}">
                        ${
                          vipIdentityLevel === 'Private'
                            ? `<button onclick="window.localStorage.setItem('scrollClassName', 'refuel-table')" class="dropdown-title-btn">产品扩容</button>`
                            : `<button class="dropdown-title-btn">去升级</button>`
                        }
                        </a>
                      </li>
                      ${linkHtm}
                      <li>
                          <a id="lnkLogout" class="dropdown-item logout" href="javascript:logout();"><i class="iconfont iconavw-signout"></i>退出</a>
                      </li>
                  </ul>
              </li>
          </ul>
        `;

    let phoneUserHtml = `
          <ul class="navbar-nav w-100">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-truncate" href="#" id="menuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ${userName}
              </a>
              <ul class="dropdown-menu right-menu w-100" aria-labelledby="menuLink" style="position: absolute;">
                <li class="nav-display text-truncate">${userName}</li>
                <li>
                  <a id="lnkLogout" class="dropdown-item" href="javascript:logout();"><i class="bi bi-box-arrow-right"></i>退出</a>
                </li>
              </ul>
            </li>
          </ul>
        `;

    userDom.innerHTML = userHtml;
    phoneUserDom.innerHTML = phoneUserHtml;
  }, 100);
}
// 添加 401 判断
function get_current_userinfo() {
  let action = `${$config.USER_API_SERVER_URL}user/companyName`;
  let token = localStorage.getItem('token');
  fetch(action, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else if (response.status == 401 || response.status == 403 || response.status == 444) {
        logout();
      } else {
        console.error(`${response.status} ${response.statusText} ${response.url}`);
      }
    })
    .then((data) => {
      console.log('userinfo');
      let resData = JSON.parse(data);
      if (!resData || !resData.success) {
        console.warn('当前用户信息请求失败！');
        return;
      }

      let companyName = resData.companyName;
      localStorage.setItem('companyName', companyName);

      get_vip_info();
    })
    .catch((error) => {
      console.error(error);
    });
}
let expireDay = 0;
// 获取vip信息
function get_vip_info() {
  let action = `${$config.USER_API_SERVER_URL}vip/my/detailInfo`;
  let token = localStorage.getItem('token');
  fetch(action, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        console.error(`${response.status} ${response.statusText} ${response.url}`);
      }
    })
    .then((data) => {
      let resData = JSON.parse(data);
      if (resData.success) {
        let { vipIdentityLevel, expireDays } = resData.editorVipInfo;
        expireDay = expireDays;
        localStorage.setItem('vipIdentityLevel', vipIdentityLevel);
      }
      set_current_userinfo();
    })
    .catch((error) => {
      console.error(error);
    });
}

//单独给后台加了一段初始化用户菜单的逻辑，实际官网也可以按照这个修改防止如果有异步情况先执行菜单初始化时token或配置文件还没有请求成功
var initTimer = null;
function initUserMenu() {
  if (!$config.USER_API_SERVER_URL) {
    return;
  }

  clearInterval(initTimer);
  initTimer = null;

  let token = localStorage.getItem('token');
  let userType = localStorage.getItem('userType');
  if (!token) {
    return;
  }

  // 只有子用户需要获取对应租户
  if (userType == 'Subuser' || userType == 'Tenant') {
    get_current_userinfo();

    return;
  }
  get_vip_info();
}

(function () {
  'use strict';
  let hasLogin = getCookie('hasLogin');
  if (hasLogin == null) {
    window.localStorage.clear();
  }

  let token = localStorage.getItem('token');
  let userID = localStorage.getItem('userID');
  if (!token) {
    return;
  }

  initTimer = setInterval(() => {
    initUserMenu();
  }, 500);
})();
