// configstart
var config_paths = {
    //公用模块
    'jquery': 'pc/js/3rdlibs/jquery',
    'text': 'pc/js/3rdlibs/text',
    'compatible': 'pc/js/global/compatible', //ie9以下模拟placeholder
    'headerhtml': '/templates/pc/global/header.html',
    'footerhtml': '/templates/pc/global/footer.html',
    'header': 'pc/js/global/header',
    'footer': 'pc/js/global/footer',
    '_': 'pc/js/3rdlibs/underscore', // 如果设置了下面map版本控制,就不需要设置该paths
    'breadcrumbhtml': '/templates/pc/global/breadcrumb.html',
    'breadcrumb': 'pc/js/global/breadcrumb',

    'mscore': 'pc/js/global/mscore',
    'apiconfig': 'pc/js/pages/api/apiconfig',
    'homeinfoapi': 'pc/js/pages/api/homeinfoapi',
    'customserviceapi': 'pc/js/pages/api/customserviceapi',
    'insuranceschoolapi': 'pc/js/pages/api/insuranceschoolapi',
    'intomsapi': 'pc/js/pages/api/intomsapi',
    'productapi': 'pc/js/pages/api/productapi',
    'pubinfoapi': 'pc/js/pages/api/pubinfoapi',
    'usercenterapi': 'pc/js/pages/api/usercenterapi',
    'otherapi': 'pc/js/pages/api/otherapi',

    'paging': 'pc/js/3rdlibs/paging',
    'select2': 'pc/js/3rdlibs/select2.min',
    'downSelectMenu': 'pc/js/3rdlibs/downSelectMenu',
    'navScroll': 'pc/js/3rdlibs/nav',

    'Keyboard': 'pc/js/3rdlibs/Keyboard',
    'Enhance': 'pc/js/3rdlibs/Enhance',
    'Follow': 'pc/js/3rdlibs/Follow',
    'DateTime': 'pc/js/3rdlibs/DateTime',
    'autoComplete': 'pc/js/3rdlibs/autoComplete',
    // 图像裁剪
    'jcrop': 'pc/js/3rdlibs/jcrop',
    // 上传插件
    'html5uploader': 'pc/js/3rdlibs/html5uploader',

    // 滚动scrolling-element
    'scrollElement': 'pc/js/3rdlibs/scrolling-element',

    // 正则表达式验证
    'validate': 'pc/js/global/validate',
    'validateUtils': 'pc/js/global/validateutils',

    // 字体js
    'customServiceSvgFont': 'pc/js/svgfont/customService',
    'base': 'pc/js/pages/base',
    'pubinfoSvgFont': 'pc/js/svgfont/pubinfo',
    'userCenterSvgFont': 'pc/js/svgfont/userCenter',
    'productSvgFont': 'pc/js/svgfont/product',

    // 模态框
    'fullModal': 'pc/js/3rdlibs/fullModal',

    //非公用模块
    //首页
    'index': 'pc/js/pages/home/index',
    'search': 'pc/js/pages/home/search', //首页查询
    'slider': 'pc/js/3rdlibs/slider', //轮播
    'homeSvgFont': 'pc/js/svgfont/home',
    'conrisk': 'pc/js/pages/home/conrisk',
    //登录注册
    'login': 'pc/js/pages/login/login',
    'forgetPwd': 'pc/js/pages/login/forgetPwd',
    'resetPwdSucc': 'pc/js/pages/login/resetPwdSucc',
    'register': 'pc/js/pages/login/register',
    'registerSucc': 'pc/js/pages/login/registerSucc',
    //走进民生
    'imagetext': 'pc/js/pages/intoms/imagetext',
    'titledate': 'pc/js/pages/intoms/titledate',
    'titledownload': 'pc/js/pages/intoms/titledownload',
    // 公开信息披露
    'MSTreeMenu': 'pc/js/global/mstreemenu',
    'pubinfo': 'pc/js/pages/pubinfo/pubinfo',
    'inveaccountprice': 'pc/js/pages/pubinfo/inveaccountprice',
    // 基本信息->公司概况->公司基本情况
    'cpyBaseInfoHtml': '/templates/pc/pubinfo/cpyBaseInfo.html',
    // 基本信息->公司概况->各分支机构营业场所及联系方式
    'branchContactHtml': '/templates/pc/pubinfo/branchContact.html',
    // 基本信息->经营的保险产品目录及条款->团体保险
    'insuListClauseHtml': '/templates/pc/pubinfo/insuListClause.html',
    // 基本信息->经营的保险产品目录及条款->个人保险
    'insuListPersonalHtml': '/templates/pc/pubinfo/insuListPersonal.html',
    // 基本信息->公司治理概要->近三年股东大会主要决议
    'lastThrYearMtSugHtml': '/templates/pc/pubinfo/lastThrYearMtSug.html',
    // 基本信息->产品基本信息->审批或者备案的保险产品目录、条款->在售产品
    'prodInfoListOnSaleHtml': '/templates/pc/pubinfo/prodInfoListOnSale.html',
    // 公开信息披露  -> 年度信息 -> 年度信息披露报告
    'yearInfoReptHtml': '/templates/pc/pubinfo/yearInfoRept.html',
    // 公开信息披露  -> 年度信息 -> 投资账户单位价格 -> 详情
    'inveAccountPriceHtml': '/templates/pc/pubinfo/inveAccountPrice.html',
    // 年度信息 -> 年度企业社会责任报告
    'ytermCpySlReptHtml': '/templates/pc/pubinfo/ytermCpySlRept.html',
    // 年度信息 -> 年度次级定期债务专题财务报告 -> 年度次级定期债务专题财务报告
    'ytermLoanAccReptHtml': '/templates/pc/pubinfo/ytermLoanAccRept.html',
    // 年度信息 -> 年度次级定期债务专题财务报告 -> 财务报告详情
    'reportDetailHtml': '/templates/pc/pubinfo/reportDetail.html',
    // 年度信息  -> 投连险信息 -> 账户说明书 合规声明书
    'accRuleIntroHtml': '/templates/pc/pubinfo/accRuleIntro.html',
    // 公开信息披露  -> 重大事项 -> 重大事项
    'importantEventsHtml': '/templates/pc/pubinfo/importantEvents.html',
    // 公开信息披露  -> 重大事项 -> 重大事项
    'importantEventsDetailHtml': '/templates/pc/pubinfo/importantEventsDetail.html',
    // 专项信息 -> 重大关联交易 -> 重大关联交易
    'relationTradeHtml': '/templates/pc/pubinfo/relationTrade.html',
    // 专项信息 -> 偿付能力 -> 偿付能力
    'payAbilityHtml': '/templates/pc/pubinfo/payAbility.html',
    // 专项信息 -> 互联网保险 -> 互联网保险
    'internetIusuHtml': '/templates/pc/pubinfo/internetIusu.html',
    // 专项信息 -> 资金运用信息 -> 资金运用信息
    'fundApplyInfoHtml': '/templates/pc/pubinfo/fundApplyInfo.html',
    // 专项信息 -> 资金运用风险责任人 -> 资金运用风险责任人
    'personliableFdAplyHtml': '/templates/pc/pubinfo/personliableFdAply.html',
    //公开信息披露->年度信息->投资账户单位价格 
    'investAccountUnitPriceHtml': '/templates/pc/pubinfo/investAccountUnitPrice.html',
    //<!--★ 公开信息披露->专项信息->互联网保险->产品信息/合作网站-->
    'proInformationHtml': '/templates/pc/pubinfo/proInformation.html',
    'cooperWebsiteHtml': '/templates/pc/pubinfo/cooperWebsite.html',
    'prodInfoListOnsale': 'pc/js/pages/pubinfo/prodInfoListOnSale',
    'insuListClause': 'pc/js/pages/pubinfo/insuListClause',
    'branchContact': 'pc/js/pages/pubinfo/branchContact',
    'lastThrYearMtSug': 'pc/js/pages/pubinfo/lastThrYearMtSug',
    'pubinfoRept': 'pc/js/pages/pubinfo/pubinfoRept',

    /*
     * 客户服务模块
     */
    // bootstrap
    'bootstrap': 'pc/js/3rdlibs/bootstrap.min',
    // layDate
    'laydate': 'pc/js/3rdlibs/laydate',
    'pickPccAddr': 'pc/js/3rdlibs/pick-pcc',
    // 主模版
    'customService': 'pc/js/pages/customservice/customService',
    // 服务网点
    'serviceBranch': 'pc/js/pages/customservice/serviceBranch',
    // 客户服务大厅
    'custmSerHallHtml': '/templates/pc/customservice/custmSerHall.html',
    // 服务指南
    'serviceGuadHtml': '/templates/pc/customservice/serviceGuad.html',
    // vip客户服务
    'vipHtml': '/templates/pc/customservice/vip.html',
    // 重大疾病关爱(如意金康、附加康裕)
    'seriousDiseaseCareHtml': '/templates/pc/customservice/seriousDiseaseCare.html',
    'seriousDiseaseCare': 'pc/js/pages/customservice/seriousDiseaseCare',
    // 绿通服务
    'greenServiceHtml': '/templates/pc/customservice/greenService.html',
    // 咨询投诉
    'complaintsHtml': '/templates/pc/customservice/complaints.html',
    'complaints': 'pc/js/pages/customservice/complaints',
    // 弹框
    'csPop': 'pc/js/pages/customservice/pop',
    // 核实代理人
    'checkAgentHtml': '/templates/pc/customservice/checkAgent.html',
    'checkAgent': 'pc/js/pages/customservice/checkAgent',
    // 推荐代理人
    'agentRecommendHtml': '/templates/pc/customservice/agentRecommend.html',
    'agentRecommend': 'pc/js/pages/customservice/agentRecommend',
    'agentInfoHtml': '/templates/pc/customservice/agentInfo.html',
    // 客户活动
    'customActivityHtml': '/templates/pc/customservice/customActivity.html',
    'customActivity': 'pc/js/pages/customservice/customActivity',
    'otherActivityHtml': '/templates/pc/customservice/otherActivity.html',
    'otherActivity': 'pc/js/pages/customservice/otherActivity',
    'mallAndPosterHtml': '/templates/pc/customservice/mallAndPoster.html',
    'mallAndPoster': 'pc/js/pages/customservice/mallAndPoster',
    'customActivityDetailHtml': '/templates/pc/customservice/customActivityDetail.html',
    'customActivityYear': 'pc/js/pages/customservice/customActivityYear',

    'serviceGuad': 'pc/js/pages/customservice/serviceGuad',
    // 保单查询
    'warrantySeekHtml': '/templates/pc/customservice/warrantySeek.html',
    'warrantySeek': 'pc/js/pages/customservice/warrantySeek',
    'contactInfoResultHtml': '/templates/pc/customservice/contactInfoResult.html',
    'contactInfoResult': 'pc/js/pages/customservice/contactInfoResult',
    // 保险续期
    'bxxqHtml': '/templates/pc/customservice/bxxq.html',
    // 单证下载
    'docDownloadHtml': '/templates/pc/customservice/docdownload.html',
    'docdownLoad': 'pc/js/pages/customservice/docdownload',
    // 贷款利率查询
    'dkllSearchHtml': '/templates/pc/customservice/dkllsearch.html',
    // 保险理赔
    'insuranceClaimsHtml': '/templates/pc/customservice/insuranceClaims.html',
    'insuranceClaims': 'pc/js/pages/customservice/insuranceClaims',
    'onlineCallDlg': 'pc/js/pages/customservice/onlineCallDlg',
    // 分红盈余计算
    'redProfitRateSearchHtml': '/templates/pc/customservice/redProfitRateSearch.html',
    'redProfitRateSearch': 'pc/js/pages/customservice/redProfitRateSearch',
    //分红盈余计算-正文
    'redProfitRateContentHtml': '/templates/pc/customservice/redProfitRateContent.html',
    // 万能险利率查询
    'universalRateHtml': '/templates/pc/customservice/universalRate.html',
    'universalRate': 'pc/js/pages/customservice/universalRate',
    // 万能险利率查询结果
    'universalRateDetailHtml': '/templates/pc/customservice//universalRateDetail.html',
    'universalRateDetail': 'pc/js/pages/customservice/universalRateDetail',
    /*
     * 产品模块
     */
    'proIndex': 'pc/js/pages/msproduct/index',
    // 产品列表
    'productListHtml': '/templates/pc/msproduct/productList.html',
    'productList': 'pc/js/pages/msproduct/productList',
    // 产品详情
    'productDetailHtml': '/templates/pc/msproduct/productDetail.html',
    'productDetail': 'pc/js/pages/msproduct/productDetail',
    /*
     * 个人中心
     */
    'userIndex': 'pc/js/pages/usercenter/index',
    // 绑定邮箱
    'bindEmail': 'pc/js/pages/usercenter/bindEmail',
    // 完善个人信息
    'improvePersonalInfo': 'pc/js/pages/usercenter/improvePersonalInfo',
    //家庭成员信息、添加家庭成员信息
    'familyInfo': 'pc/js/pages/usercenter/familyInfo',
    'addFamilyInfo': 'pc/js/pages/usercenter/addFamilyInfo',

    // 绑定手机号码
    'bindPhone': 'pc/js/pages/usercenter/bindPhone',
    // 修改登录密码
    'modifyPasswd': 'pc/js/pages/usercenter/modifyPasswd',
    // 我的账户
    'selfAccount': 'pc/js/pages/usercenter/selfAccount',
    // 我的保单
    'selfPolicy': 'pc/js/pages/usercenter/selfPolicy',

    // 修改用户头像
    'changeUserImg': 'pc/js/pages/usercenter/changeUserImg'


};

var config_shim = {
    _: {
        exports: '_'
    },
    slider: {
        deps: ['jquery'],
        exports: 'Slider'
    },
    compatible: {
        deps: ['jquery']
    },
    jqueryui: {
        deps: ['jquery']
    },
    select2: {
        deps: ['jquery']
    },
    MSTreeMenu: {
        exports: 'MSTreeMenu'
    },
    paging: {
        deps: ['jquery'],
        exports: 'paging'
    },
    downSelectMenu: {
        deps: ['jquery'],
        exports: 'downSelectMenu'
    },
    bootstrap: {
        deps: ['jquery'],
        exports: 'bootstrap'
    },
    laydate: {
        deps: ['jquery'],
        exports: 'laydate'
    },
    pickPccAddr: {
        deps: ['jquery'],
        exports: 'pickPccAddr'
    },
    navScroll: {
        deps: ['jquery'],
        exports: 'navScroll'
    },
    Keyboard: {
        deps: ['jquery'],
        exports: 'Keyboard'
    },
    Enhance: {
        deps: ['Keyboard'],
        exports: 'Enhance'
    },
    Follow: {
        deps: ['Enhance'],
        exports: 'Follow'
    },
    DateTime: {
        deps: ['Follow'],
        exports: 'DateTime'
    },

    autoComplete: {
        deps: ['jquery'],
        exports: 'autoComplete'
    },
    jcrop: {
        deps: ['jquery']
    },
    html5uploader: {
        deps: ['jquery']
    },
    fullModal: {
        deps: ['jquery'],
        exports: 'fullModal'
    },
    scrollElement: {
        deps: ['jquery'],
        exports: 'scrollElement'
    },
    validateUtils: {
        deps: ['jquery'],
        exports: 'validateUtils'
    }
};
// configend

define('commonconfig', function () {
    requirejs.config({
        baseUrl: window.__msBaseUrl || '/static/',
        paths: config_paths,
        // urlArgs: 'ver=1.0', // 统一脚本版本控制
        shim: config_shim, // 不是AMD模块可进行该设置
    });
});