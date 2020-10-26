$(function(){
    let that ;
    class Light {
        constructor(){
            /* 创建变量 记录进度条 */
            this.flag = 0;
            that = this;
            /* 记录loading页面的dom页面 */
            this.loading = document.querySelector(".loading");
            /* 获取到页面一的dom元素 */
            this.page1 = document.querySelector(".page1");
            this.img = document.createElement("img");
            this.page2 = document.querySelector(".page2");
            this.btn1 = document.querySelector(".ksbtn");
            this.flag = false;
            this.PageX = 0;
            this.PageY = 0;
            this.init();
           
        }
        init(){
            // this.timer();
            $(".page2 input").on("change",this.uploading);
            $(this.btn1).on("click",() => {
                that.showHide(this.page2,this.page1);
            })
            
        }
        /* 所有页面显示隐藏事件 */
        showHide(showEle,hideEle,dispose){
            $(showEle).fadeIn();
            $(hideEle).fadeOut();
            $(showEle).addClass("anima");
            $(hideEle).removeClass("anima");
            if(dispose) dispose();
        }
        /* loading页面加载 */
        timer(){
            let time = setInterval(()=>{
                this.flag++;
                $(".progress>p>span").css("width",this.flag + "%");
                $(".progress>span").text(this.flag + "%");
                $(".fc").css("left",this.flag / 2 + 20 +  "%");
                if(this.flag == 100){
                    clearInterval(time);
                    $(this.loading).fadeOut();
                    $(this.page1).fadeIn();
                    $(this.page1).addClass("anima");
                    $(".music").fadeIn();
                }
            },40);
        }
        /* 上传图片的事件 */
        uploading(){
            let filTag = this.files[0];
            if(filTag){
                $(".page2 .photograph").hide();
                var reader = new FileReader();
                reader.readAsDataURL(filTag);
                reader.onload = function (e) {
                    var urlData = this.result;
                    that.img.src = urlData;
                    that.flag = true;
                    that.fell();
                    document.querySelector(".page2 .imgBox").appendChild(that.img);
                    that.PageX = that.img.pageX;
                    that.PageY = that.img.pageY;
                }
            }
        }
        fell(){
            let startX = 0;
            let startY = 0;
            let targetX = 0;
            let targetY = 0;
            if(!that.flag) {
                return false;
            }
            $(".photographBox").on("touchstart",(e) => {
                startX = e.targetTouches[0].pageX;
                startY = e.targetTouches[0].pageY;
            })
            $(".photographBox").on("touchmove",(e) => {
                targetX = e.targetTouches[0].pageX - startX;
                targetY =  e.targetTouches[0].pageY - startY;
                $(".imgBox img").css("margin-left",`${targetX}px`).css("margin-top",`${targetY}px`);
            })
            
        }
    }
    new Light();
})