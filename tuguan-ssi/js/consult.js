let code = 0;
//发送邮件
function sendMail() {
  //公司名称
  let userCompany = $('#exCompany').val(),
    //姓名
    userName = $('#exName').val(),
    //手机号
    userPhone = $('#exPhone').val(),
    //备注
    userRemark = $('#exremark').val();

  let _httpUrl = window.$config.ACTIVITYCODE_API_SERVER_URL;

  let root_err_ele = document.getElementById('error-message-length');
  if (root_err_ele) {
    root_err_ele.remove();
  }
  // 验证手机号、公司名称、客户名称为必填项
  if (!userCompany || !userPhone || !userName) {
    let eror_ele = document.createElement('div');
    eror_ele.setAttribute('id', 'error-message-length');

    eror_ele.style.color = 'red';
    eror_ele.style.textAlign = 'center';
    eror_ele.style.fontSize = '14px';
    eror_ele.innerHTML = '请完成必填项!';
    $('.form-submit-message')[0].appendChild(eror_ele);
    return false;
  }
  if (userCompany !== '' && userPhone !== '' && userName !== '') {
    let url = _httpUrl + `registerConsult`,
      data = JSON.stringify(generateMailBody());

    // console.log(data, '提交')
    // return
    $.ajax({
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      url: url,
      data: data,
      dataType: 'json',
      success: function (res) {
        if (res.statusCode == 200) {
          $('#exCompany').val('');
          $('#exName').val('');
          $('#exPhone').val('');
          $('#exampleInputEmail1').val('');
          $('#exIndustry').val('');
          $('#exremark').val('');
          $('#verificationVal').val('');

          let eror_ele = document.createElement('div');
          eror_ele.setAttribute('id', 'error-message-length');

          eror_ele.style.color = '#38d038';
          eror_ele.style.textAlign = 'center';
          eror_ele.style.fontSize = '14px';
          eror_ele.innerHTML = '提交成功!';
          $('.form-submit-message')[0].appendChild(eror_ele);
          setTimeout(() => {
            eror_ele.innerHTML = '';
          }, 3000);
        } else {
          let eror_ele = document.createElement('div');
          eror_ele.setAttribute('id', 'error-message-length');

          eror_ele.style.color = 'red';
          eror_ele.style.textAlign = 'center';
          eror_ele.style.fontSize = '14px';
          let _flag = res.validations.find((e) => e.field === 'ValidCode');
          if (_flag) {
            eror_ele.innerHTML = _flag.message;
          } else {
            eror_ele.innerHTML = '提交失败！';
          }
          $('.form-submit-message')[0].appendChild(eror_ele);
        }

        //// change jc 20210702 fix 提示位置，长度为0数组异常 优化提示逻辑
        // else {
        //     let eror_ele = document.createElement("div");
        //     eror_ele.setAttribute("id", "error-message-length");
        //     eror_ele.style.color = "red";
        //     eror_ele.style.textAlign = "center";
        //     eror_ele.style.fontSize = "14px";
        //     eror_ele.innerHTML = res.message || "提交失败！";
        //     $(".form-submit-message")[0].appendChild(eror_ele);
        // }

        // test for response result
        // console.log(res, '<<<<< res');
        // if (res.type == 'ERROR') {
        //     sendMailStatusChange('ERROR');
        // } else {
        //     sendMailStatusChange('ok');
        // }
      },
      error: function (e) {
        // response code : 400 429 503 etc
        // let status = e.status;
        // console.log(status, '<<<<< status')
        // according dif status give dif tips
        // sendMailStatusChange(`${status}`);
      },
    });
  } else {
    alert('请您完善信息，再提交！');
  }
}
//获取填写内容
function generateMailBody() {
  return {
    enterpriseName: $('#exCompany').val(),
    Name: $('#exName').val(),
    phone: $('#exPhone').val(),
    // email: $("#exampleInputEmail1").val(),
    // industry: $("#exIndustry").val(),
    remarks: $('#exremark').val(),
    // validCode: $("#verificationVal").val(),
    source: $('#title').text() ? $('#title').text() : '首页',
  };
}
