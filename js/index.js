// 禁止页面拖拽
document.addEventListener("touchmove", function (e) {
    e.preventDefault();
}, {
    passive: false
});
var winHeight = $(window).height();   //获取当前页面高度
$(window).resize(function () {
    var thisHeight = $(this).height();
    if (winHeight - thisHeight > 50) {
        //当软键盘弹出，在这里面操作
    } else {
        //当软键盘收起，在此处操作

    }
    setTimeout(() => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight, 0))
    }, 100);

});
$(function () {
    let that;
    class Light {
        constructor() {
            /* 创建变量 记录进度条 */
            this.flag = 0;
            that = this;
            this.bodyW = document.body.clientWidth;
            this.bodyH = document.body.clientHeight;
            $(".box").css("min-height", this.bodyH + "px").css("min-width", this.bodyW + "px");
            /* 记录loading页面的dom页面 */
            this.Pixel = window.devicePixelRatio;//获取到设备像素比
            this.loading = document.querySelector(".loading");
            /* 获取到页面一的dom元素 */
            this.page1 = document.querySelector(".page1");
            this.img = document.querySelector(".imgBox img");
            this.page2 = document.querySelector(".page2");
            this.btn1 = document.querySelector(".ksbtn");
            this.flag1 = false;
            this.imgW = 0;
            this.imgH = 0;
            this.idx = 0;
            this.measurement = true;
            this.detectionFlag = false;
            this.p2Btn = document.querySelector(".p2Btn");
            this.scBom = document.querySelector(".scBom");
            this.detectionBtn = document.querySelector(".detectionBtn");
            this.detection = document.querySelector(".detection");
            this.result = document.querySelector(".result");
            this.resultBtn = document.querySelector(".resultBtn");
            this.againBtn = document.querySelector(".againBtn");
            this.lotteryBtn = document.querySelector(".lotteryBtn");
            this.generateBtn = document.querySelector(".generateBtn");
            this.init();
        }
        init () {
            this.timer();
            $(".page2 .fileDom").on("change", this.uploading);
            $(this.btn1).on("click", () => {
                that.showHide(this.page2, this.page1, function () {
                    $(".music").hide();
                    $(".page2 .music").show();
                });
            })
            $(this.p2Btn).on("click", () => {
                if (that.flag1) {
                    this.recognitionFach();
                } else {
                    layer.open({
                        content: '请上传图片',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                }
            })
            $(this.detectionBtn).on("click", () => {
                $(that.result).fadeIn();
                if (this.idx == 0) {
                    $(".result .one").css("display", "block");
                } else if (this.idx == 1) {
                    $(".result .two").css("display", "block");
                } else if (this.idx == 2) {
                    $(".result .thr").css("display", "block");
                }
                setTimeout(() => {
                    $(that.result).fadeOut();
                    $(".page2").fadeIn();
                    $(".detection").hide();
                    $(".succeed").fadeIn();
                    if (this.idx == 0) {
                        $(".photographBox .one").css("display", "block");
                        $(".succeed .one").css("display", "block");
                    } else if (this.idx == 1) {
                        $(".photographBox .two").css("display", "block");
                        $(".succeed .two").css("display", "block");
                    } else if (this.idx == 2) {
                        $(".photographBox .thr").css("display", "block");
                        $(".succeed .thr").css("display", "block");
                    }
                }, 1500);
            })
            $(this.againBtn).on("click", () => {
                $(".page2").fadeOut("slow", () => {
                    $(".page2").removeClass("anima");
                    $(".page2 .succeed").hide();
                    $(".page2 .photograph").show();
                    $("div").remove(".rect");
                    $(".photographBox .photograph1").hide();
                    $(".page2 .scBom").show();
                    let test = document.querySelector(".fileDom");
                    test.outerHTML = test.outerHTML;
                    that.img.src = "";
                    $(".fileDom").attr("disabled", false);
                    $(".photographBox .one,.two,.thr").css("display", "none");
                    $(".succeed .one,.two,.thr").css("display", "none");
                    that.measurement == true;
                    $(".imgBox img").css("left", `50%`).css("top", `50%`);
                    console.log(that.imgW, that.imgH);
                    $(".page2").fadeIn("slow", () => {
                        $(".page2").addClass("anima");
                        $(".photographBox").css("pointer-events", "auto");
                        $(".page2 .fileDom").on("change", this.uploading);
                    });
                })
            })
            $(this.lotteryBtn).on("click", () => {
                let num = Math.round(Math.random());
                $(".lottery .content").fadeOut();
                $(".lottery .lottery-introduce").fadeOut("show", function () {
                    if (num >= 1) {
                        $(".lottery .content2").fadeIn();
                    } else {
                        $(".lottery .content1").fadeIn();
                    }
                });
            })
            $(".smtBtn").on("click", () => {
                if ($(".message .nameK").val().trim() == "") {
                    //提示
                    layer.open({
                        content: '请填写姓名',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                    return false;
                }
                if ($(".message .telK").val().trim() == "") {
                    //提示
                    layer.open({
                        content: '请填写电话',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                    return false;
                }
                if ($(".message .siteK").val().trim() == "") {
                    //提示
                    layer.open({
                        content: '请填写地址',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                    return false;
                }
                if (!/^1[3456789]\d{9}$/.test($(".telK").val().trim())) {
                    //提示
                    layer.open({
                        content: '请填写正确格式的电话号码',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                    return false;
                }
                if (!/^[\u4E00-\u9FA5]{2,}$/.test($(".nameK").val().trim())) {
                    //提示
                    layer.open({
                        content: '请填写正确的姓名',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                }
                $(".lottery .content2").fadeOut("show", function () {
                    $(".lottery .content1").fadeIn();
                });
                $(".lottery .content1 .denominator1").fadeIn();
                $(".lottery .content1 .denominator").fadeOut();
            })
            $(this.generateBtn).on("click", () => {
                $(".page2").fadeOut("show", function () {
                    $(".page2").removeClass("anima");
                    $(".page2 .succeed").show();
                    $(".page2 .sibBtn").hide();
                    $(".btnBox").show();
                    $(".page2 .save").show();
                    $(".page2 .succeed").addClass("succeed1");
                    $(".page2").fadeIn("show", function () {
                        $(".page2").addClass("anima");
                        var canvas2 = document.createElement("canvas");
                        let _canvas = document.querySelector('.page2');
                        var w = parseInt(window.getComputedStyle(_canvas).width);
                        var h = parseInt(window.getComputedStyle(_canvas).height);
                        canvas2.width = w * that.Pixel;
                        canvas2.height = h * that.Pixel
                        canvas2.style.width = w + "px";
                        canvas2.style.height = h + "px";
                        var context = canvas2.getContext("2d");
                        context.scale(1, 1);
                        html2canvas(document.querySelector('.page2'), { canvas: canvas2, allowTaint: true, useCORS: true, logging: true }).then(function (canvas) {
                            $(".dtImg").addClass("lt");
                            $(".dtImg").css("width", "100%").css("height", "100%").css("z-index", 8).css("pointer-events", "auto");
                            document.querySelector(".dtImg").src = canvas.toDataURL();
                        });
                    });

                });
            })
            $(".drawBtn").on("click", () => {
                that.showHide($(".lottery"), $(".page2"));
                $(".btnBox").hide();
                $("img").css("pointer-events", "none");
            })

        }
        /* 所有页面显示隐藏事件 */
        showHide (showEle, hideEle, dispose) {
            if (dispose) dispose();
            $(hideEle).fadeOut();
            $(showEle).fadeIn();
            $(hideEle).removeClass("anima");
            $(showEle).removeClass("anima");
            $(showEle).addClass("anima");
        }
        /* loading页面加载 */
        timer () {
            let time = setInterval(() => {
                this.flag++;
                $(".progress>p>span").css("width", this.flag + "%");
                $(".progress>span").text(this.flag + "%");
                $(".fc").css("left", this.flag / 2 + 20 + "%");
                if (this.flag == 100) {
                    clearInterval(time);
                    $(this.loading).fadeOut();
                    $(this.page1).fadeIn();
                    $(this.page1).addClass("anima");
                    $(".music").fadeIn();
                }
            }, 40);
        }
        /* 上传图片的事件 */
        uploading () {
            let filTag = this.files[0];
            if (filTag) {
                $(".imgBox img").css("left", `50%`).css("top", `50%`);
                $(".page2 .photograph").hide();
                var reader = new FileReader();
                reader.readAsDataURL(filTag);
                reader.onload = function (e) {
                    var urlData = this.result;
                    that.img.src = urlData;
                    that.flag1 = true;
                    var img = new Image();
                    img.src = urlData;
                    img.onload = function () {
                        that.imgW = that.img.getBoundingClientRect().width;
                        that.imgH = that.img.getBoundingClientRect().height;
                        console.log(that.imgW, that.imgH);
                        $(".imgBox img").css("margin-left", -that.imgW / 2 - 20).css("margin-top", -that.imgH / 2 - 30);
                        if ($(".imgBox .rect")) {
                            /* 如果再次上传则将上次识别的位置删除 */
                            $(".imgBox .rect").remove();
                        }
                        that.fell();
                    }
                    $(".photographBox .photograph1").show();
                }
            }
        }
        /* 图片拖拽事件 */
        fell () {
            document.querySelector(".page2 .imgBox").appendChild(that.img);
            let startX = 0;
            let startY = 0;
            that.targetX = 0;
            that.targetY = 0;
            if (!that.flag1) {
                return false;
            }

            let imgPageX = null;
            let imgPageY = null;

            /* 图片拖拽事件 */
            $(".photographBox").on("touchstart", (e) => {
                imgPageX = that.img.offsetLeft;
                imgPageY = that.img.offsetTop;
                startX = e.targetTouches[0].pageX + (-that.imgW / 2 - 20);
                startY = e.targetTouches[0].pageY + (-that.imgH / 2 - 30);
            })
            $(".photographBox").on("touchmove", (e) => {
                if (that.measurement) {
                    that.targetX = e.targetTouches[0].pageX - startX + imgPageX;
                    that.targetY = e.targetTouches[0].pageY - startY + imgPageY;
                    if (that.targetX < -20) {
                        that.targetX = -20;
                    } else if (that.targetX > $(".fileDom").width() - 60) {
                        that.targetX = $(".fileDom").width() - 60;
                    }
                    if (that.targetY < -20) {
                        that.targetY = -20;
                    } else if (that.targetY > $(".fileDom").height() - 40) {
                        that.targetY = $(".fileDom").height() - 40;
                    }
                    $(".imgBox img").css("left", `${that.targetX}px`).css("top", `${that.targetY}px`);
                }
            })
        }
        /* 脸部识别 */
        recognitionFach () {
            if (!that.measurement) {
                return false;
            }
            var tracker = new tracking.ObjectTracker(['eye', 'mouth']);
            tracker.setStepSize(1.5);
            tracking.track('.imgBox img', tracker);
            console.log(tracker)
            tracker.on('track', function (event) {
                if (event.data.length == 0) {
                    //提示
                    layer.open({
                        content: '未检测到脸部',
                        skin: 'msg',
                        time: 3 //2秒后自动关闭
                    });
                    return false;
                }
                that.measurement == false;
                $(".fileDom").attr("disabled", true);
                $(".page2").fadeOut("slow", function () {
                    $(".page2").removeClass("anima");
                    $(that.scBom).hide();
                    $(".page2").fadeIn("slow", function () {
                        $(".page2").addClass("anima");
                        $(that.detection).show();
                        $(".photographBox").css("pointer-events", "none");
                        that.test();
                    })
                });
                event.data.forEach(function (rect) {
                    window.plot(rect.x, rect.y, rect.width, rect.height);
                });
            });

            window.plot = function (x, y, w, h) {
                var rect = document.createElement('div');
                document.querySelector('.imgBox').appendChild(rect);
                rect.classList.add('rect');
                let imgW = that.img.getBoundingClientRect().width;
                let imgH = that.img.getBoundingClientRect().height;
                rect.style.left = (that.img.offsetLeft + x) + 'px';
                let imgBox = document.querySelector(".imgBox");
                console.log(that.img.getBoundingClientRect().y, y, that.img.offsetTop);
                console.log(that.img.getBoundingClientRect().x, x, that.img.offsetLeft)
                rect.style.top = (that.img.offsetTop + y) + 'px';
            };
        }
        /* 测试随机事件 */
        test () {
            let imgArr = $(".detection").children("img");
            let depositArr = [
                "img/p3_7.png",
                "img/p3_8.png",
                "img/p3_9.png",
            ];
            let eyeArr = [
                "img/p3_4.png",
                "img/p3_5.png",
                "img/p3_6.png",
            ]
            let faceArr = [
                "img/p3_14.png",
                "img/p3_15.png",
                "img/p3_16.png",
            ]
            let flag = true;
            [...imgArr].forEach((item, index) => {
                let randomNum = Math.floor(Math.random() * 3);
                if (flag && index == 2) {
                    randomNum = 2;
                    this.idx = index;
                }
                if (randomNum == 2) {
                    if (flag) {
                        this.idx = index;
                    }
                    flag = false;
                }
                if (index == 2) {
                    $(".detection img").eq(index).attr("src", eyeArr[randomNum]);
                } else if (index == 1) {
                    $(".detection img").eq(index).attr("src", depositArr[randomNum]);
                } else if (index == 0) {
                    $(".detection img").eq(index).attr("src", faceArr[randomNum]);
                }
            })
        }

    }
    new Light();
})