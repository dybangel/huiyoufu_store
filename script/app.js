//公共方法
(function(window) {
    var x = {};
    // 导航的高度
    x.headerHeight = 0;
    x.footerHeight = 0;
    /**
     * 初始化
     *
     **/
    x.ready = function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    };

    //  获取节点的高度
    x.getHeight = function(id) {
            var dom = $api.byId(id);
            var height = $api.offset(dom).h;
            return height;
        }
        /**
         * 状态栏设置
         * param dom 节点 【header / app】
         **/
    x.fixStatusBar = function(id) {
        var dom = $api.byId(id);
        $api.fixStatusBar(dom);
        // 保存导航的高度
        x.headerHeight = $api.offset(dom).h;
    };
    /**
     * 一个打开窗口的简便方法
     * 无其他过多的设置内容可以使用
     * 如有复杂内容 请直接使用 api.openWin
     **/
    x.closeWin = function() {
        api.closeWin();
    }
    x.openWin = function(options) {
        var name = options.name || 'BarHome';
        var bounces = options.bounces || false;
        var pageParam = options.pageParam || {};
        var slidBackEnabled = options.slidBackEnabled || true;
        var rect = options.rect || {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        };
        api.openWin({
            name: name,
            url: '../' + name + '/indexWin.html',
            bounces: bounces,
            pageParam: pageParam,
            rect: rect,
            slidBackEnabled: slidBackEnabled
        })
    };
    /**
     * 一个打开 frame 的简便方法
     * 无其他过多的设置内容可以使用
     * 如有复杂内容 请直接使用 api.openFrame
     **/
    x.openFrame = function(options) {
        var name = options.name || 'BarHome';
        var bounces = options.bounces || true;
        var pageParam = options.pageParam || {};
        var rect = options.rect || {
            x: 0,
            y: x.headerHeight,
            w: 'auto',
            h: 'auto'
        };
        api.openFrame({
            name: name,
            url: './indexFrm.html',
            bounces: bounces,
            pageParam: pageParam,
            rect: rect
        })
    };
    /**
     * 公共配置内容
     *
     **/
    x.config = {
        // origin: 'http://192.168.31.183',
        origin: 'http://aft.wx.wygoo.com',
        userImages: '/public/upload/user_images/',
        goodsImages: '/public/upload/goods_images/',
        marketImages: '/public/upload/market_resources/',

        // 内容对应id
        ContentStrToId: {
            'fullRule': 2,
            'discountRule': 3,
            'shopPromotionRule': 4,
            'adRule': 5,
            'shopPromotionProvision': 6,
            'adProvision': 7
        }
    };
    // 请求的 api 集合
    x.apiUrl = {
        // 登录和 首页内容修改
        login: 'api_business/business_accounts/login',
        resetPassword: 'api_business/business_accounts/reset_password',
        changeMobile: 'api_business/business_accounts/change_mobile',
        isSetPayPass: 'api_query/business/is_set_pay_password',
        setPayPass: 'api_business/business_accounts/reset_pay_password',
        sendCode: 'api_systems/helper/send_code',
        isSetPayPass: 'api_query/business/is_set_pay_password',

        indexData: 'api_query/shops/info',
        updateShopInfo: 'api_shops/shops/update',
        readShopInfo: 'api_shops/shops/read',
        changeBusinessStatus: 'api_shops/shops/change_business_status',
        shopUpdate: 'api_shops/shops/update',

        // 文件上传
        uploadFile: "api_systems/helper/upload_file",

        // 店铺分类
        cateRead: 'api_goods/goods_cates/read',
        cateIndex: 'api_goods/goods_cates/index',
        cateIndexTree: 'api_goods/goods_cates/index_tree',
        cateUpdate: 'api_goods/goods_cates/update',
        cateSave: 'api_goods/goods_cates/save',
        cateDelete: 'api_goods/goods_cates/delete',
        cateReadChild: 'api_query/goods_cates/child_goods_cates',

        // 规格模板
        specsUpdate: 'api_goods/spec_templates/update',
        specsSave: 'api_goods/spec_templates/save',
        specsDelete: 'api_goods/spec_templates/delete',
        specsIndex: 'api_goods/spec_templates/index',
        specsRead: 'api_goods/spec_templates/read',

        // 商品相关
        goodsSave: 'api_goods/goods/save',
        goodsRead: 'api_goods/goods/read',
        goodsUpdate: 'api_goods/goods/update',
        goodsIndex: 'api_goods/goods/index',
        goodsChangeStatus: 'api_goods/goods/change_status',
        goodsList: 'api_goods/goods/index',

        // 资产相关
        assetRead: 'api_business/business_assets/read',
        assetList: 'api_business/business_asset_logs/index',
        bankCardList: 'api_users/bank_cards/lists',
        bankCardDelete: 'api_users/bank_cards/delete',
        bankCardSava: 'api_users/bank_cards/save',
        drawcash: 'api_business/business_drawcashs/save',
        financeRecordList: 'api_orders/orders/shop_lists',

        // 系统参数
        systemParams: 'api_systems/params/index',

        // 营销活动
        fullActivities: 'api_market/full_activities/index',
        fullActivityAdd: 'api_market/full_activities/save',
        fullActivityUpdate: 'api_market/full_activities/update',
        discountActivites: 'api_market/discount_activities/index',
        discountActivityAdd: 'api_market/discount_activities/save',
        discountActivityUpdate: 'api_market/discount_activities/update',
        shopPromotions: 'api_market/shop_promotions/index',
        shopPromotionAdd: 'api_market/shop_promotions/save',
        adReleases: 'api_market/ad_releases/index',
        adReleaseAdd: 'api_market/ad_releases/save',
        adReleaseView: 'api_market/ad_releases/view',

        // 内容相关
        ruleRead: 'api_articles/rules/read',

    };

    // 需要验证token的 window
    x.checkTokenWin = [

    ];

    // 重新封装 ajax
    x.ajax = function(options) {
            options = {
                url: options.url,
                method: options.method || 'POST',
                data: options.data || {},
                headers: options.headers || {},
                callback: options.callback || function(ret) {
                    x.toast(ret.msg);
                },
                type: options.type || 'body',
                values: options.values || {},
            }
            options.headers = x.handleHeaders(options.headers);

            var obj = {
                url: x.config.origin + '/index.php/' + options.url,
                method: options.method,
                timeout: 20,
                headers: options.headers
            }
            switch (options.type) {
                case 'body':
                    obj.data = {
                        body: options.data
                    }
                    obj.headers['Content-Type'] = 'application/json;charset=utf-8';
                    break;
                case 'files':
                    obj.data = {
                        files: options.data,
                        values: options.values
                    }
                    break;
                case 'stream':
                    obj.data = {
                        stream: options.data
                    }
                    break;
                default:
                    obj.data = {
                        body: options.data
                    }
            }
            return new Promise(function(resolve, reject) {
                api.ajax(obj, function(ret, err) {
                    api.refreshHeaderLoadDone();
                    api.hideProgress();
                    if (ret) {
                        if (ret.code == 0) {
                            x.toast(ret.msg);
                        } else if (ret.code == 1) {
                            resolve(ret);
                        } else if (ret.code == 900001) {
                            api.alert({
                                title: '您暂未开启店铺，请联系平台',
                            }, function(ret, err){
                                api.sendEvent({
                                    name: 'logout',
                                });
                            });
                        } else {
                            x.plog(ret)
                        }
                    } else {
                        x.plog(err)
                    }
                });
            })
        }
        // headers 处理
    x.handleHeaders = function(headers) {
        headers = headers;
        headers['auth'] = 'Basic_Ivj6eZRxMTx2yiyunZvnG8R67';
        headers['client-type'] = 'app';
        if ($api.getStorage('token')) {
            headers.token = $api.getStorage('token');
        }
        return headers;
    }

    // toast
    x.toast = function(msg) {
        api.toast({
            msg: msg || '',
            duration: 2000,
            location: 'middle'
        });
    }

    // 校验
    x.validate = {
        mobile: function(value) {
            return /^1[34578]\d{9}$/.test(value);
        },
        password: function(value) {
            return /[0-9a-zA-Z]{6,20}/.test(value);
        }
    }

    // 打印日志
    x.plog = function(obj) {
        console.log(JSON.stringify(obj))
    }

    // 选择时间
    x.selectTime = function(callback) {
        var time = '';
        if (api.systemType == 'android') {
            api.openPicker({
                type: 'date',
                title: '选择日期'
            }, function(ret, err) {
                ret.month = ret.month < 10 ? ('0' + ret.month) : ret.month
                ret.day = ret.day < 10 ? ('0' + ret.day) : ret.day
                time += ret.year + '-' + ret.month + '-' + ret.day + ' ';
                api.openPicker({
                    type: 'time',
                    title: '选择时间'
                }, function(ret, err) {
                    if (ret) {
                        ret.hour = ret.hour < 10 ? ('0' + ret.hour) : ret.hour
                        ret.minute = ret.minute < 10 ? ('0' + ret.minute) : ret.minute
                        time += ret.hour + ':' + ret.minute + ':' + '00';
                        callback(time)
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            });

        } else if (api.systemType == 'ios') {
            api.openPicker({
                type: 'data_time',
                title: '选择日期时间'
            }, function(ret, err) {
                if (ret) {
                    ret.month = ret.month < 10 ? ('0' + ret.month) : ret.month
                    ret.day = ret.day < 10 ? ('0' + ret.day) : ret.day
                    ret.hour = ret.hour < 10 ? ('0' + ret.hour) : ret.hour
                    ret.minute = ret.minute < 10 ? ('0' + ret.minute) : ret.minute
                    time = ret.year + '-' + ret.month + '-' + ret.day + ' ' + ret.hour + ':' + ret.minute + ':' + '00';
                    callback(time)
                } else {
                    alert(JSON.stringify(err));
                }
            });
        }
    }
    window.$app = x;
})(window);
