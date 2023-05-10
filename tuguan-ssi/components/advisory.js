// form name validate
function pe_name(obj, type = '姓名') {
  obj.style.borderColor = '#808695';
  let re_ele = document.getElementById('error-message');
  if (re_ele) {
    re_ele.remove();
  }
  if (obj.value.length !== 0) {
    // error message
    if ((type === '姓名' || type === '公司名称') && !/^[a-zA-Z\u4e00-\u9fa5]+$/.test(obj.value)) {
      let eror_ele = document.createElement('div');
      eror_ele.setAttribute('id', 'error-message');
      eror_ele.style.color = 'red';
      eror_ele.style.textAlign = 'right';
      eror_ele.style.fontSize = '14px';
      eror_ele.style.position = 'absolute';
      eror_ele.style.bottom = '-21px';
      eror_ele.style.right = '17px';
      eror_ele.innerHTML = '只能输入中文或英文！';
      obj.parentNode.appendChild(eror_ele);
      obj.style.borderColor = 'red';
      return false;
    }
  }
  return true;
}

// 备注 (需求)
function pe_remark(obj, type = '姓名') {
  obj.style.borderColor = '#808695';
  let re_ele = document.getElementById('error-message-remark');
  if (re_ele) {
    re_ele.remove();
  }

  return true;
}

function pe_company(obj, type = '姓名') {
  obj.style.borderColor = '#808695';
  let re_ele = document.getElementById('error-message-company');
  if (re_ele) {
    re_ele.remove();
  }
  if (obj.value.length == 0) {
    // error message
    let eror_ele = document.createElement('div');
    eror_ele.setAttribute('id', 'error-message-company');
    eror_ele.style.color = 'red';
    eror_ele.style.textAlign = 'right';
    eror_ele.style.fontSize = '14px';
    eror_ele.style.position = 'absolute';
    eror_ele.style.bottom = '-21px';
    eror_ele.style.right = '17px';
    eror_ele.innerHTML = `${type}不能为空！`;
    obj.parentNode.appendChild(eror_ele);
    obj.style.borderColor = 'red';
    return false;
  } else if (
    (type === '姓名' || type === '公司名称') &&
    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im.test(obj.value)
  ) {
    let eror_ele = document.createElement('div');
    eror_ele.setAttribute('id', 'error-message-company');
    eror_ele.style.color = 'red';
    eror_ele.style.textAlign = 'right';
    eror_ele.style.fontSize = '14px';
    eror_ele.style.position = 'absolute';
    eror_ele.style.bottom = '-21px';
    eror_ele.style.right = '17px';
    eror_ele.innerHTML = '只能输入中文、数字或英文！';
    obj.parentNode.appendChild(eror_ele);
    obj.style.borderColor = 'red';
    return false;
  }
  return true;
}

// form phone validate
function pe_phone(mobile) {
  mobile.style.borderColor = '#808695';
  let re_ele = document.getElementById('error-message-phone');
  if (re_ele) {
    re_ele.remove();
  }
  if (mobile.value.length == 0) {
    // error message
    let eror_ele = document.createElement('div');
    eror_ele.setAttribute('id', 'error-message-phone');
    eror_ele.style.color = 'red';
    eror_ele.style.textAlign = 'right';
    eror_ele.style.fontSize = '14px';
    eror_ele.style.position = 'absolute';
    eror_ele.style.bottom = '-21px';
    eror_ele.style.right = '17px';
    eror_ele.innerHTML = `手机号码不能为空！`;
    mobile.parentNode.appendChild(eror_ele);
    mobile.style.borderColor = 'red';
    return false;
  }

  if (mobile.value.length != 11) {
    // error message
    let eror_ele = document.createElement('div');
    eror_ele.setAttribute('id', 'error-message-phone');
    eror_ele.style.color = 'red';
    eror_ele.style.textAlign = 'right';
    eror_ele.style.fontSize = '14px';
    eror_ele.style.position = 'absolute';
    eror_ele.style.bottom = '-21px';
    eror_ele.style.right = '17px';
    eror_ele.innerHTML = `请输入有效的手机号码，需要是11位！`;
    mobile.parentNode.appendChild(eror_ele);
    mobile.style.borderColor = 'red';
    return false;
  }

  var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(mobile.value)) {
    let eror_ele = document.createElement('div');
    eror_ele.setAttribute('id', 'error-message-phone');
    eror_ele.style.color = 'red';
    eror_ele.style.textAlign = 'right';
    eror_ele.style.fontSize = '14px';
    eror_ele.style.position = 'absolute';
    eror_ele.style.bottom = '-21px';
    eror_ele.style.right = '17px';
    eror_ele.innerHTML = `请输入有效的手机号码！`;
    mobile.parentNode.appendChild(eror_ele);
    mobile.style.borderColor = 'red';
  }
}

// form value length
function length(params) {
  params.style.borderColor = '#808695';
  let re_ele = document.getElementById('error-message-length');
  if (re_ele) {
    re_e;
    if ($(params).val().length > 50) {
      // error messagele.remove()
      params.style.borderColor = '#808695';
    }
    let eror_ele = document.createElement('div');
    eror_ele.setAttribute('id', 'error-message-length');
    eror_ele.style.color = 'red';
    eror_ele.style.textAlign = 'right';
    eror_ele.style.fontSize = '14px';
    eror_ele.style.position = 'absolute';
    eror_ele.style.bottom = '-21px';
    eror_ele.style.right = '17px';
    eror_ele.innerHTML = `不能超过50个字符！`;
    params.parentNode.appendChild(eror_ele);
    params.style.borderColor = 'red';
    $(params).focus();
    return false;
  }
}

var onshow = (function pageShow() {
  // get element
  let parent = document.getElementById('product-advisory');
  let titleInnerText = parent.innerText || '项目合作';
  parent.innerText = '';
  let head = document.getElementsByTagName('head')[0];
  // create element
  let child = document.createElement('div');
  child.classList.add('advisory-container');
  // import stylesheet
  let style = document.createElement('link');
  style.href = '/css/components/advisory.css';
  style.rel = 'stylesheet';
  // import icon stylesheet
  let script = document.createElement('script');
  script.href = '/fonts/iconfonts.js';
  // create and append html content
  let child_content = `
  <section id="product-advisory">
  <div id="advisory-container">
    <!-- section title -->
    <!-- <div class="introduction-section-title">
      <span id="advantages">咨询预约</span>
    </div> -->

    <div class="tg-modular-default-title">${titleInnerText}</div>
    <span class="tg-title-bottom-line"></span>

    <!-- product advisory card -->

    <div class="advisory-card">
      <!-- advisory form -->
      <div class="advisory-form">
        <!-- advisory form area -->
        <div class="advisory-form-area">
          <div class="advisory-form-box">
          <div class="advisory-form-item">
              <div>
                <span class="text-style-1">*</span>
                <span>您的姓名</span>
              </div>
              <input
                type="text"
                maxlength="8"
                id="exName"
                onChange="pe_name(this)"
                placeholder="请输入您的姓名"
              />
            </div>
            <div class="advisory-form-item">
              <div>
                <span class="text-style-1">*</span>
                <span>您的联系方式</span>
              </div>
              <input
                type="text"
                id="exPhone"
                maxlength="11"
                onChange="pe_phone(this)"
                placeholder="请输入您的联系方式"
              />
            </div>

            <div class="advisory-form-item">
              <div>
                <span class="text-style-1">*</span>
                <span>公司名称</span>
              </div>
              <input
                type="text"
                id="exCompany"
                onChange="pe_company(this,'公司名称')"
                placeholder="请输入公司名称"
              />
            </div>
            <div class="advisory-form-item">
              <div>
                <span class="text-style-1" style="opacity: 0;">*</span>
                <span>需求</span>
              </div>
              <input
                type="text"
                id="exremark"
                onChange="pe_remark(this,'备注')"
                placeholder="请输入需求"
              />
            </div>
            
            <!--  <div class="advisory-form-item">
              <div>
                <span class="text-style-1">*</span>
                <span>验证码</span>
              </div>
              <input
                type="text"
                maxlength="8"
                id="verificationVal"
                placeholder="输入验证码"
              />
              <label id="verification" onclick="sendVerification()"
                >发送验证码</label
              >
            </div>
            <div class="advisory-form-item">
              <div>
                <span class="text-style-1">*</span>
                <span>工作邮箱</span>
              </div>
              <input
                type="text"
                id="exampleInputEmail1"
                onChange="email(this)"
                placeholder="请输入邮箱"
              />
            </div>  -->
            
          </div>
          <!-- advisory title -->
          <div class="advisory-title">
            填写信息, 工作人员将于1个工作日内与您取得联系
          </div>
          <div class="form-submit-message"></div>
          <button type="button" onclick="sendMail()">提&emsp;交</button>
        </div>
        <!-- advisory QR code -->
        <!--
        <div class="advisory-qr">
          <div class="advisory-qr-public">
            <div class="advisory-title">官方公众号</div>
            <div class="advisory-qr-image">
              <img
                src="../../img/product/end_rendering/advisory/advisory-public.png"
                alt=""
              />
            </div>
            <div class="advisory-qr-tooltip">
              <p>关注公众号</p>
              <p>获取更多资讯</p>
            </div>
          </div>
          <div class="advisory-qr-wechat">
            <div class="advisory-title">客服微信</div>
            <div class="advisory-wechat-image">
              <img
                src="../../img/product/end_rendering/advisory/advisory-wechat.jpg"
                alt=""
              />
            </div>
            <div class="advisory-wechat-tooltip">
              <p>添加微信</p>
              <p>图观™咨询预约</p>
            </div>
          </div>
        </div>
        -->
      </div>
    </div>
  </div>
</section>`;
  child.innerHTML = child_content;
  // append element and style
  head.appendChild(style);
  parent.appendChild(child);
})();
