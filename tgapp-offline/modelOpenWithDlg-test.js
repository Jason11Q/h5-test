window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true,
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/su6gp5j9',
        }).then((res) => {
          _this.init(res.data.accessToken);
        });
      },
      // 初始化加载图观三维场景服务
      init(token) {
        let _this = this;
        //使用授权码读取模型文件初始化场景
        window.appInstance = new TGApp.App();
        window.appInstance.initService(
          {
            container: document.getElementById('container'),
            mode: 'scene',
            token: token,
            url: 'https://www.tuguan.net/publish/scene/api/su6gp5j9', //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
            origin: 'https://www.tuguan.net/api/sceneEditor',
          },
          (result) => {
            if (result.result == 1) {
              _this.isZZ = false;
              appInstance.uniCall(
                'switchState',
                {
                  name: '作业',
                  sceneName: '',
                },
                (result) => {
                  console.log(result);
                }
              );
            }
          }
        );
      },
      change(bool) {
        // let jsonData = {
        //   ids: ['火点1', '火点2', '火点3', '火点4', 'mask02'],
        //   visible: bool,
        // };
        // appInstance.uniCall('setModelVisibility', jsonData, (result) => {
        //   console.log(result);
        // });
        let jsonData = {
          ids: ['火点-all副本1'],
          visible: bool,
        };
        appInstance.uniCall('setModelVisibility', jsonData, (result) => {
          console.log(result);
        });
      },
      setModelArticulation(color) {
        let jsonData = {
          id: 'mask02', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
          data: [
            // 定义模型关节数据

            {
              articulation: '排气口颜色变化',
              type: 'enum',
              value: color,
            },
          ],
        };
        appInstance.uniCall('setModelArticulation', jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });

  window.setSettings = function () {
    fetch('./settings.json')
      .then((res) => res.json())
      .then((settings) => {
        debugger;
        coreInstance.applySettings(settings);
      });
  };
};
