var uid=0;

/**
 * 动态获取 JSON 串
 *   活动详情 activityDetailUrl
 *   参与记录 activityRecord
 *     HTTP GET JSON
 */

var app = new Vue({
    data(){
        return{
            joined: true,
            unjoined: false,
            buyAmount: ''
        }
    },
    methods:{
        goToBuy: function() {
            console.log(this.buyAmount);
            return this.buyAmount;
        },
        /**
          * 活动信息
          *   动态获取：JSON
          *   缺省：
          *     活动图片 activityImage
          *       在线：
          *         "https://i1.mifile.cn/f/i/2019/mi9/index/index2.jpg?v=1"
          *         "https://i1.mifile.cn/f/i/2019/mi9/index/index3.jpg?v=1"
          *       本地：
          *         "photo/xiaomi9.jpg"
          *     活动名称 activityTitle
          *       小米9免费送
          *     活动描述 activityDescription
          *       盘点智能手机历代经典机型，哪一代没有骁龙 800 系的强大引擎！骁龙855不仅在性能上全面飞跃，更有再次突破的 7nm - 领先芯片工艺加持。这一切已被我们首次应用于小米9，让你快人一步领略科技魅力。
          *     开奖时间 activityLotteryStrattime
          *       2019年6月15日 11:00
          *     抽奖码 lotteryCodes
          *       1111
          *       2222
          *     商品价格 buyAmount
          *       12.00
          */
        loadActivityDetail: async function(activityID, userID) {
            const image        = document.getElementById('activityImage');
            const title        = document.getElementById('activityTitle');
            const description  = document.getElementById('activityDescription');
            const time         = document.getElementById('activityLotteryStrattime');
            const lotteryCodes = document.getElementById('lotteryCodes');
//            const activityDetailUrl = 'https://randomuser.me/api/?results=10';
            const activityDetailUrl = 'http://10.241.178.110:3000/activity_detail';
            var that = this;
//            $.ajax({
//                type: "GET",
//                url: activityDetailUrl,
//                dataType: "json",
//                success: function(result){
//                    if(result.code === 200){
//                        let data = result.data;
//                        image.src = data.activityImage;
//                        title.innerHTML = data.activityTitle;
//                        description.innerHTML = data.activityDescription;
//                        var timeText = '';
//                        time.innerHTML = timeText.concat('开奖时间：', data.activityLotteryStarttime);
//                        that.buyAmount = data.buyAmount;
//                        if(data.isJoin==1) {
//                            that.joined = true;  that.unjoined = false;
//                        } else {
//                            that.joined = false; that.unjoined = true;
//                        }
//                        let codes = data.lotteryCode;
//                        var sampText = '您的抽奖码：<br/>';
//                        codes.map(function(code){
//                            sampText = sampText.concat(code, "<br/>");
//                        });
//                        lotteryCodes.innerHTML = sampText;
//                    }
//                    else {
//                        image.alt='图片加载失败！';
//                        description.innerHTML = '活动详情加载失败！';
//                        that.joined = false;
//                        that.unjoined = true;
//                        that.buyAmount = '0.00';
//                        time.innerHTML = '开奖时间：--';
//                    }
//                }
//            });
             fetch(activityDetailUrl,{
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                 .then(function(resp){
                     return resp.json();
                 })
                 .then(function(result) {
                     if(result.code === 200){
                         let data = result.data;
                         image.src = data.activityImage;
                         title.innerHTML = data.activityTitle;
                         description.innerHTML = data.activityDescription;
                         var timeText = '';
                         time.innerHTML = timeText.concat('开奖时间：', data.activityLotteryStarttime);
                         that.buyAmount = data.buyAmount;
                         if(data.isJoin==1) {
                             that.joined = true;  that.unjoined = false;
                         } else {
                             that.joined = false; that.unjoined = true;
                         }
                         let codes = data.lotteryCode;
                         var sampText = '您的抽奖码：<br/>';
                         codes.map(function(code){
                             sampText = sampText.concat(code, "<br/>");
                         });
                         lotteryCodes.innerHTML = sampText;
                     }
                     else {
                         image.alt='图片加载失败！';
                         description.innerHTML = '活动详情加载失败！';
                         that.joined = false;
                         that.unjoined = true;
                         that.buyAmount = '0.00';
                         time.innerHTML = '开奖时间：--';
                     }
                 })
                 .catch(function(error){
                     console.log(error);
                 });
        },
    },
    mounted: function(){
        // var activityID = window.hello.getActivityID();
        // var userID = window.hello.getUserID();
        // this.loadActivityDetail(activityID, userID);
        this.loadActivityDetail(null, null);
        window.goToBuy = this.goToBuy;
        window.loadActivityDetail = this.loadActivityDetail;
    }
});

app.$mount('.main');
