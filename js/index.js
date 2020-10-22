$(function(){
    class Light {
        constructor(){
            /* 创建变量 记录进度条 */
            this.flag = 0;
            /* 记录loading页面的dom页面 */
            this.loading = document.querySelector(".loading");
            /* 获取到页面一的dom元素 */
            this.page1 = document.querySelector(".page1");
            this.init();
        }
        init(){
            // this.timer();
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
                    $(".music").fadeIn();
                }
            },40);
        }
    }
    new Light();
})