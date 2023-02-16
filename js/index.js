window.onload = function () {
    //路径导航的数据渲染
    navPathDateBind()
    function navPathDateBind() {
        const navPath = document.getElementById('navPath')
        let path = goodData.path
        for (let i = 0; i < path.length; i++) {
            const aNode = document.createElement('a')
            const iNode = document.createElement('i')
            aNode.innerText = path[i].title
            if (i !== path.length - 1) {
                aNode.href = path[i].url
                iNode.innerText = "/"
            }
            navPath.appendChild(aNode)
            navPath.appendChild(iNode)
        }
    }
    //获取图片地址信息数组
    let imagessrc=goodData.imagessrc
    //声明变量存储大图下标
    let bigImgIndex=0
    //放大镜的移入移出效果
    bigBind()
    function bigBind() {
        const leftTop=document.getElementById('leftTop')
        const small=document.getElementById('small')
        small.onmouseenter=function(){
            const maskDiv=document.createElement('div')
            maskDiv.className='mask';
            const big=document.createElement('div')
            big.id='big'
            const bigImg=document.createElement('img')
            bigImg.src=imagessrc[bigImgIndex].b
            big.appendChild(bigImg)
            small.appendChild(maskDiv)
            leftTop.appendChild(big)
            small.onmouseleave=function() {
                small.removeChild(maskDiv)
                leftTop.removeChild(big)
            }
            small.onmousemove=function(event){
                let x=event.clientX-small.getBoundingClientRect().left-maskDiv.offsetWidth/2;
                let y=event.clientY-small.getBoundingClientRect().top-maskDiv.offsetHeight/2;
                if(x<0){
                    x=0
                }else if(x>small.clientWidth-maskDiv.offsetWidth){
                    x=small.clientWidth-maskDiv.offsetWidth
                };
                if(y<0){
                    y=0
                }else if(y>small.clientHeight-maskDiv.offsetHeight){
                    y=small.clientHeight-maskDiv.offsetHeight
                }
                maskDiv.style.left=x+"px";
                maskDiv.style.top=y+"px";
                let scale=(small.clientWidth-maskDiv.offsetWidth)/(bigImg.offsetWidth-big.clientWidth);
                bigImg.style.left=-x/scale+"px";
                bigImg.style.top=-y/scale+"px";
            }
        }
    }
    //缩略图渲染
    imgRender()
    function imgRender(){
        const imgList=document.getElementById('imgList')
        for(let i=0;i<imagessrc.length;i++){
            const li=document.createElement('li')
            li.innerHTML=`<img src='${imagessrc[i].s}'>`
            imgList.appendChild(li)
        }
    }
    //缩略图切换
    imgRenderClick()
    function imgRenderClick(){
        const liNode=document.querySelectorAll('#wrapper #content .contentMain #center #left #leftFoot div #imgList li')
        const smallImg=document.querySelector('#wrapper #content .contentMain #center #left #leftTop #small img')
        smallImg.src=imagessrc[0].s
        for(let i=0;i<liNode.length;i++){
            liNode[i].onclick=function(){
                bigImgIndex=i
                smallImg.src=imagessrc[i].s
            }
        }
    }
    //缩略图左右切换
    imgPrevNext()
    function imgPrevNext(){
        const prev=document.querySelector('#wrapper #content .contentMain #center #left #leftFoot a.prev')
        const next=document.querySelector('#wrapper #content .contentMain #center #left #leftFoot a.next')
        const imgList=document.getElementById('imgList')
        const liNode=document.querySelectorAll('#wrapper #content .contentMain #center #left #leftFoot div #imgList li')
        let start=0
        let step=(liNode[0].offsetWidth+20)*2
        let endPostion=(liNode.length-5)*(liNode[0].offsetWidth+20)
        prev.onclick=function(){
            start-=step
            if(start<0){
                start=0
            } 
            imgList.style.left=-start+"px"
        }
        next.onclick=function(){
            start+=step
            if(start>endPostion){
                start=endPostion
            }
            imgList.style.left=-start+"px"
        }
    }
    //右侧上部分渲染
    rightTopData()
    function rightTopData(){
        const goodsDetail=goodData.goodsDetail
        const rightTop=document.getElementById('rightTop')
        const data=`
        <h3>${goodsDetail.title}</h3>
        <p>${goodsDetail.recommend}</p>
        <div id="priceWrap">
            <div class="priceTop">
                <span class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <div class="price">
                    <span>￥</span>
                    <p>${goodsDetail.price}</p>
                    <i>降价通知</i>
                </div>
                <p>累计评价&nbsp;&nbsp;${goodsDetail.evaluateNum}</p>                                    
            </div>
            <div class="priceFoot">
                <span class="title">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <div class="sale">
                    <span>${goodsDetail.promoteSales.type}</span>
                    <span>${goodsDetail.promoteSales.content}</span>
                </div>
            </div>
        </div>
        <div class="support">
        <span class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
            <span> ${goodsDetail.support}</span>
        </div>
        <div class="adress">
            <span class="title">配&nbsp;送&nbsp;至</span>
            <span>${goodsDetail.address}</span>
        </div>
        `
        rightTop.innerHTML=data
    }
    //选择区域渲染
    chooseData()
    function chooseData(){
        const chooseWrap=document.querySelector('#wrapper #content .contentMain #center #right #rightFoot .chooseWrap')
        const crumbData=goodData.goodsDetail.crumbData
        for(let i=0;i<crumbData.length;i++){
            const dlNode=document.createElement('dl')
            const dtNode=document.createElement('dt')
            dtNode.innerText=crumbData[i].title
            dlNode.appendChild(dtNode)
            for(let j=0;j<crumbData[i].data.length;j++){
                const ddNode=document.createElement('dd')
                ddNode.innerText=crumbData[i].data[j].type
                ddNode.setAttribute('price',crumbData[i].data[j].changePrice)
                dlNode.appendChild(ddNode)
            }
            chooseWrap.appendChild(dlNode)
        }
    }
    //选项颜色切换
    chooseColor()
    function chooseColor(){
        const dlNode=document.querySelectorAll('#wrapper #content .contentMain #center #right #rightFoot .chooseWrap dl')
        const choose=document.getElementById('choose')
        let arr=new Array(dlNode.length)
        for(let i=0;i<dlNode.length;i++){
            const ddNode=dlNode[i].querySelectorAll('dd')
            for(let j=0;j<ddNode.length;j++){
                ddNode[j].onclick=function(){
                    choose.innerHTML=''
                    for(let k=0;k<ddNode.length;k++){
                        ddNode[k].style.color="#666"
                    }
                    this.style.color="red"   
                    //显示选择信息                 
                    arr[i]=this 
                    changePriceBind(arr)
                    arr.forEach(function(value,index){
                        if(value){
                            const markDiv=document.createElement('div')
                            markDiv.className="mark"
                            markDiv.innerText=value.innerText
                            const a=document.createElement('a')
                            a.href="javascript:;"
                            a.setAttribute('index',index)
                            a.innerText="×"
                            markDiv.appendChild(a)
                            choose.appendChild(markDiv)
                        }
                    })
                    const a=choose.querySelectorAll('a')
                    for(let n=0;n<a.length;n++){
                        a[n].onclick=function(){
                            let idx=this.getAttribute('index')
                            arr[idx]=''
                            const dd=dlNode[idx].querySelectorAll('dd')
                            for(let m=0;m<dd.length;m++){
                                dd[m].style.color='#666'
                            }
                            dd[0].style.color="red"
                            choose.removeChild(this.parentNode)
                            changePriceBind(arr)
                        }
                    }
                }
            }
        }
    }
    //修改价格
    function changePriceBind(arr){
        const oldPrice=document.querySelector('.contentMain #center #right #rightTop #priceWrap .priceTop .price p')
        const leftPrice=document.querySelector('#wrapper #content .contentMain #goodDetailWrap .rightDetail .chooseBox .listWrap .left p')
        const rightPrice=document.querySelector('#wrapper #content .contentMain #goodDetailWrap .rightDetail .chooseBox .listWrap .right i') 
        const input=document.querySelectorAll('#wrapper #content .contentMain #goodDetailWrap .rightDetail .chooseBox .listWrap .middle li div input')
        let price=goodData.goodsDetail.price
        for(let i=0;i<arr.length;i++){
            if(arr[i]){
                const changePrice=Number(arr[i].getAttribute('price'))
                price+=changePrice
            }
        }
        oldPrice.innerText=price
        leftPrice.innerText="￥"+price
        for(let j=0;j<input.length;j++){
            if(input[j].checked){
               price+=Number(input[j].value) 
            }
        }    
        rightPrice.innerText="￥"+price    
    }
    //套餐价渲染
    choosePriceBind()
    function choosePriceBind(){
        const leftPrice=document.querySelector('#wrapper #content .contentMain #goodDetailWrap .rightDetail .chooseBox .listWrap .left p')
        const newPrice=document.querySelector('#wrapper #content .contentMain #goodDetailWrap .rightDetail .chooseBox .listWrap .right i')
        const input=document.querySelectorAll('#wrapper #content .contentMain #goodDetailWrap .rightDetail .chooseBox .listWrap .middle li div input')
        for(let i=0;i<input.length;i++){
            input[i].onclick=function(){
                let oldPrice=Number(leftPrice.innerText.slice(1))
                for(let j=0;j<input.length;j++){
                    if(input[j].checked){
                        oldPrice=oldPrice+Number(input[j].value)
                    }
                }
                newPrice.innerText="￥"+oldPrice
            }
        }
        
    }
    //定义卡片切换函数
    function tapChange(btns,conts){
        for(let i=0;i<btns.length;i++){
            btns[i].onclick=function(){
                for(let j=0;j<btns.length;j++){
                    btns[j].className=''
                    conts[j].className=''
                }
                btns[i].className='active'
                conts[i].className='active'
            } 
        }
    }
    leftAsideChange()
    function leftAsideChange(){
        const h4=document.querySelectorAll('#wrapper #content .contentMain #goodDetailWrap .leftAside .asideTop h4')
        const div=document.querySelectorAll('#wrapper #content .contentMain #goodDetailWrap .leftAside .asideFoot>div')
        tapChange(h4,div)
    }
    footAsideChange()
    function footAsideChange(){
        const btns=document.querySelectorAll('#wrapper #content .contentMain #goodDetailWrap .rightDetail .footAside .btns li')
        const conts=document.querySelectorAll('#wrapper #content .contentMain #goodDetailWrap .rightDetail .footAside .conts div')
        tapChange(btns,conts)
    }
    //右侧侧边栏切换
    rightAsideBind()
    function rightAsideBind(){
        const rightAside=document.querySelector('#wrapper .rightAside')
        const btn=document.querySelector('#wrapper .rightAside .btn')
        let flag=true
        btn.onclick=function(){
            if(flag){
                btn.className='btn btnOpen'
                rightAside.className='rightAside asideOpen'
            }else{
                btn.className='btn btnClose'
                rightAside.className='rightAside asideClose'
            }
            flag=!flag
        }
    }
}