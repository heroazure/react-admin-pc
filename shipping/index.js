// http://192.168.0.116:3000/?languageId=2&userId=145&orderId=302&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE0NSwiaXNzIjoiaHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FwcGxleWsiLCJpYXQiOjE1OTQ5MTExNDh9.PpWW64UaO_XQlNfDkArAiQIkw8COlsDAliobLaIfBcc

(function (doc, win) {
  // var HOST = 'http://chicmall.xiaoen.online' // 需要修改
  var HOST = location.origin
  // var HOST = 'http://localhost:3000'
  // var HOST = 'http://192.168.0.116:3000'
  var API = '/chicmall-app-api'

  // 处理URl
  var getQueryStringArgs = function(key, searchStr = location.search) {
    var argsObj = {};
  
    if (searchStr.length > 0) {
      var items = searchStr.substring(1).split('&');
      for (var item of items) {
        var vals = item.split('=');
        if (vals.length === 1 && vals[0]) argsObj[vals[0]] = undefined;
        else if (vals.length === 2 && vals[0]) argsObj[vals[0]] = vals[1];
      }
    }
  
    return key ? argsObj[key] : argsObj;
  };

  // 日期处理 yyyy-MM-dd HH:mm
  var timeFormatter = function(time) {
    date = new Date(time)
    year = date.getFullYear()
    month = date.getMonth()
    day = date.getDate()
    hours = date.getHours()
    min = date.getMinutes()

    return year + '-' + fix2(month + 1) + '-' + fix2(day) + ' ' + fix2(hours) + ':' + fix2(min)
  }
  var fix2 = function(val) {
    if (!val || typeof val !== 'number') return '00'
    if (val > 9) return val
    return String(val / 100).split('.')[1]
  }

  // xhr
  var xhr = new XMLHttpRequest();
  function setHeader() {
    xhr.setRequestHeader('Content-type', 'application/json');
  }
  var http = {
    get: function (url, callback) {
      xhr.open('GET', HOST + API + url);
      setHeader()
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          callback(xhr.responseText)
        }
      };
    },
    post: function (url, params, callback) {
      xhr.open('POST', HOST + API + url);
      setHeader()
      xhr.send(JSON.stringify(params));
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          callback(JSON.parse(xhr.responseText))
        }
      };
    }
  }

  // render
  function render (data, ele, nullMsg = 'No logistics information') {
    if (!data || !Array.isArray(data)) return

    var len = data.length, str = '1';
    if (len < 1) {
      str = `<div class="tips">${nullMsg}</div>`
    } else if (len < 2) {
      str = renderItem(data[0], true);
    } else {
      var str = renderItem(data[0], true);
      for (var i of data.slice(1)) {
        str += renderItem(i)
      }
    }
    ele.innerHTML = str
  }
  function renderItem(val, isFirst) {
    if (!val) return ''
    return str = '<div class="item  ' +
          (isFirst ? 'current' : '')  +
          '"><div class="time">' + val.occerTimeStr + '</div>' + 
          '<div class="line"><i></i></div><div class="msg">' + val.trankingMsg + '</div></div>'
  }

  // 使用
  var params = getQueryStringArgs()
  var url = '/order/getTrackingByOrderId'
  var container = doc.getElementById('app')

  var unllMsgDic = {
    1: 'لا توجد معلومات الشحن',
    2: 'No logistics information',
  }

  var nullMsg = unllMsgDic[params['languageId']]

  http.post(url, params, function(res) {
    var data = (res && res.data && res.data.trackingDetail) ? JSON.parse(res.data.trackingDetail) : []
    if (data && Array.isArray(data)) {
      for (var item of data) {
        item.occerTimeStr = timeFormatter(item.occerTime * 1000)
      }
      render(data, container, nullMsg)
     // render([], container, nullMsg)
    } else {
      render([], container, nullMsg)
    }
  })

})(document, window)
