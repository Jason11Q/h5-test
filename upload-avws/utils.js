export default {
  fetchContentLastModified: (url, headers, body) => {
    let method = 'HEAD';
    return new Promise(function (resolve, reject) {
      try {
        if (!url || url === '') {
          reject();
          return;
        }
        if (url.indexOf('data:') === 0) {
          resolve('0');
        }
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          // 设置回调函数
          if (xhr.readyState == 4) {
            // 这里的 4 是请求的状态码，代表请求已经完成
            if (xhr.status == 200 || xhr.status == 204 || xhr.status == 304) {
              let lastModified = xhr.getResponseHeader('Last-Modified');
              let hasAVWSSetting = xhr.getResponseHeader('Has-Avws-Setting')?.toString()?.toLocaleLowerCase() == 'true';
              // let sCode = xhr.getResponseHeader('sCode') || '';
              let sCode = '';
              resolve({ lastModified, hasAVWSSetting, sCode });
            } else if (xhr.status == 404 || xhr.status == 405) {
              return;
            } else {
              reject(new Error(xhr.statusText));
            }
          }
        };
        xhr.open(method, url, true);
        if (headers instanceof Array) {
          for (let header of headers) {
            xhr.setRequestHeader(header.key, header.value);
          }
        }
        xhr.send(JSON.stringify(body));
      } catch (e) {
        reject(e);
      }
    });
  },

  // 通过 XmlHttpRequest 获取或提交指定的 JSON 资源
  fetchJSON: (url, method = 'GET', headers, body) => {
    switch (method.toLowerCase()) {
      case 'get':
      case 'delete':
      case 'head':
      case 'post':
      case 'put':
        break;
      default:
        method = 'GET';
        break;
    }
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        // 设置回调函数
        if (xhr.readyState == 4) {
          // 这里的 4 是请求的状态码，代表请求已经完成
          if (xhr.status == 200 || xhr.status == 204 || xhr.status == 304) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(xhr.statusText));
          }
        }
      };
      xhr.open(method, url, true);
      if (headers instanceof Array) {
        for (let header of headers) {
          xhr.setRequestHeader(header.key, header.value);
        }
      }
      xhr.send(JSON.stringify(body));
    });
  },
};
