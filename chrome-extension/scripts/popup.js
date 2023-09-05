/**
 * fe-tools Chrome plugin
 * @author Wayne
 * @time 2019.10.08
 */

const HOME_URL = 'https://github.com/MichealWayne/fe-tools';
const DEFAULT_SEARCH_LIST = ['mdn', 'github', 'npmjs', 'caniuse', 'stackoverflow', 'baidu'];

let FEToolsData = null; // 请求插件数据
let MarkList = null;

/**
 * 获取书签
 */
function getMarkTree() {
  let result = [];

  function clearUpFavorite(data) {
    let i = data.length - 1;
    while (i >= 0) {
      let item = data[i];

      if (item.url && item.title) {
        result.push({
          title: item.title,
          url: item.url,
        });
      }

      if (item.children && item.children.length) {
        clearUpFavorite(item.children);
      }
      i--;
    }
  }
  chrome.bookmarks.getTree(function(bookmarkArray) {
    try {
      clearUpFavorite(bookmarkArray);

      MarkList = result;
    } catch (e) {
      console.warn(e);
    }
  });
}

/**
 * 跳转页面
 */
function jumpAction(url) {
  chrome.tabs.create({
    url: url,
  });
}

const DOMS = {
  input: document.querySelector('#search'),
  logoCtn: document.querySelector('.j-logo_ctn'),
  searchList: document.querySelector('.j-searchList'),
  QRCode: document.querySelector('.j-qrcode'),
  fixCtn: document.querySelector('.j-fixctn'),
};

window.HandleSearch = {
  tomdn: function(name) {
    jumpAction('https://developer.mozilla.org/zh-CN/search?q=' + name);
  },
  tobaidu: function(name) {
    jumpAction('https://www.baidu.com/s?ie=UTF-8&wd=' + name);
  },
  togithub: function(name) {
    jumpAction('https://github.com/search?q=' + name);
  },
  tostackoverflow: function(name) {
    jumpAction('https://stackoverflow.com/search?q=' + name);
  },
  tocaniuse: function(name) {
    jumpAction('https://caniuse.com/#search=' + name);
  },
  tonpmjs: function(name) {
    jumpAction('https://www.npmjs.com/search?q=' + name);
  },
};

const FeTools = {
  setListeners: function() {
    // Enter
    document.addEventListener(
      'keydown',
      function(e) {
        if (e) {
          if (e.keyCode === 13) alert('enter');
        }
      },
      false
    );

    // focus and blur
    DOMS.input.addEventListener(
      'focus',
      function() {
        if (DOMS.input.value) DOMS.logoCtn.style.height = '0';
      },
      false
    );
    DOMS.input.addEventListener(
      'blur',
      function() {
        if (!DOMS.input.value) {
          DOMS.logoCtn.style.height = '90px';
          DOMS.searchList.innerHTML = '';
        }
      },
      false
    );

    // input change
    DOMS.input.addEventListener(
      'input',
      function() {
        var val = DOMS.input.value;
        if (DOMS.input.value) DOMS.logoCtn.style.height = '0';
        FeTools.handleSearch(val);
      },
      false
    );
  },

  fetchListData: function() {
    // get marks data
    getMarkTree();

    // get fe-tools data
    axios
      .get(
        'https://blog.michealwayne.cn/fe-tools/datas/tools.json',
        {},
        {
          timeout: 8000,
        }
      )
      .then(function(data) {
        FEToolsData = data.data;
      })
      .catch(function(e) {
        alert(e || '请求失败');
      });
  },

  handleSearch: function(value) {
    if (!value) {
      DOMS.logoCtn.style.height = '90px';
      DOMS.searchList.innerHTML = '';
      return false;
    }

    value = value.toLowerCase();

    // url 地址
    if (~value.indexOf('http')) {
      DOMS.searchList.innerHTML =
        '<li><a s-cr_blue2 href="' +
        value +
        '" target="_blank">前往地址>></a></li>' +
        '<li id="buildURLQR">生成二维码</li>';
      DOMS.searchList.querySelector('#buildURLQR').onclick = FeTools.handleQRCode;
      return false;
    }

    let resultList = [];
    for (let i = 0, len = FEToolsData.length; i < len; i++) {
      const item = FEToolsData[i];

      for (const j in item.target) {
        if (~value.indexOf(item.target[j])) {
          item.label = 'fe-tools';
          item.color = 'orange';
          resultList.push(item);
          break;
        }
      }
    }
    // 收藏夹
    if (MarkList) {
      for (let i = 0, len = MarkList.length; i < len; i++) {
        let item = MarkList[i];

        if (~item.title.toLowerCase().indexOf(value)) {
          resultList.push({
            link: item.url,
            name: item.title,
            color: 'red',
            label: 'mark',
          });
        }
      }
    }

    const defaultHTML = DEFAULT_SEARCH_LIST.map(function(item) {
      return (
        '<li data-type="' +
        item +
        '" data-val="' +
        value +
        '"><a>在' +
        item +
        '中搜索：<strong>' +
        value +
        '</strong></a></li>'
      );
    }).join('');
    DOMS.searchList.innerHTML =
      resultList
        .map(function(item) {
          return (
            '<li><a class="u-w" href="' +
            item.link +
            '" target="_blank"><em class="u-icon_il icon-label" s-' +
            item.color +
            '>' +
            item.label +
            '</em><span s-ft_base>' +
            item.name.replace(value, '<b s-cr_blue>' + value + '</b>') +
            '</span></a></li>'
          );
        })
        .join('') || defaultHTML;

    if (resultList.length) {
      // 其他搜索
      var other = document.createElement('li');
      other.innerHTML = '更多...';
      other.id = 'otherOpen';
      other.dataset.html = defaultHTML;
      DOMS.searchList.appendChild(other);
    }
  },

  handleQRCode: function() {
    chrome.tabs.getSelected(null, function(tab) {
      let url = tab.url,
        value = DOMS.input.value;
      if (value && ~value.indexOf('http')) url = value;
      const qrnode = new AraleQRCode({
        text: url,
      });

      DOMS.fixCtn.innerHTML =
        '<div>\
                    <img title="右键可保存二维码图片" class="u-icon" src="' +
        qrnode.toDataURL('image/png') +
        '"/>\
                    <button data-url="' +
        url +
        '" id="downloadQR" class="u-btn u-w100 u-h40 g-center g-mt20" s-color="blue">下载SVG文件</button>\
                </div>';
      DOMS.fixCtn.style.display = '';
    });
  },
  handleDownloadQR: function(url) {
    const qrnode = new AraleQRCode({
      text: url,
      render: 'svg',
    });

    const ctn = document.createElement('div');
    ctn.appendChild(qrnode);

    const blobContent = new Blob([ctn.innerHTML], {
      type: 'application/svg',
    });
    const blobUrl = window.URL.createObjectURL(blobContent);
    const eleLink = document.createElement('a');
    eleLink.download = 'qr-code.svg';
    eleLink.style.display = 'none';
    eleLink.href = blobUrl;
    // 触发点击
    DOMS.fixCtn.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    DOMS.fixCtn.removeChild(eleLink);
  },

  setEvents: function() {
    // result item click
    DOMS.searchList.addEventListener(
      'click',
      function(e) {
        const target = e.target;
        const $target = $(target).parents('li');
        $target = ($target.length && $target) || $(target);

        const _searchType = $target.data('type');

        if (_searchType) {
          HandleSearch['to' + _searchType]($target.data('val') || '');
        }
        if (target.id === 'otherOpen') {
          const ul = document.createElement('ul');
          ul.innerHTML = target.dataset.html;
          DOMS.searchList.appendChild(ul);
          target.style.display = 'none';
        }
      },
      false
    );

    // QR code
    DOMS.QRCode.addEventListener('click', FeTools.handleQRCode, false);

    // fix ctn
    DOMS.fixCtn.addEventListener(
      'click',
      function(e) {
        var target = e.target;
        if (target.id === 'downloadQR') {
          // download QR code
          FeTools.handleDownloadQR(target.dataset.url);
          return false;
        }
        DOMS.fixCtn.style.display = 'none';
      },
      false
    );

    document.querySelector('.m-logo').onclick = function() {
      jumpAction(HOME_URL);
    };
  },

  init: function() {
    FeTools.fetchListData();
    FeTools.setListeners();
    FeTools.setEvents();
  },
};

FeTools.init();
