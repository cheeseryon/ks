/* Header hover&&scroll 이벤트  */
let gnb = document.querySelector('.gnbArea > .gnb');
let gnbBg = document.querySelector('.gnbBg');
let headWrap = document.querySelector('.headWrap')

gnb.addEventListener('mouseover', function () {
    gnbBg.classList.add('on')
    headWrap.classList.add('headWrapHover')
  });
gnb.addEventListener('mouseleave' , function () {
    gnbBg.classList.remove('on')
    headWrap.classList.remove('headWrapHover')
});
window.addEventListener('scroll', function(){
    let scrollY = window.scrollY
    0 < scrollY ? headWrap.classList.add("headWrapScroll") : headWrap.classList.remove("headWrapScroll");
})

/* top 이동 버튼  */
let badge = document.querySelector('.badge')
badge.addEventListener('click' , function (){
    window.scrollTo({top : 0 , behavior : "smooth"});
})  

/* mainVisual slide */
    /* 왼쪽 pagination */
    let pagiNum =document.querySelectorAll(".pagiNum"); // 왼쪽 pagination 순서
    let pagiBar =document.querySelector(".pagiBar");    // pagiNum에 클래스를 추가하여 만들 진행 % 막대
    let toggleBtn =document.querySelector("#toggleBtn"); /* 재생,정지 버튼 */
    let titleWrap = document.querySelector(".titleWrap"); // 슬라이드 resize 크기에 맞춰 titleArea도 수정이 필요
    let titleArea = document.querySelector(".titleArea"); // 680이하 일 때 높이값을 slideImg와 층 구조 형성을 위해 tilteItem에 맞춰야 함
    let tilteItem =document.querySelectorAll(".tilteItem"); // fadeIn 효과를 위해 필요
    let fadeInTitle =document.querySelector(".fadeInTitle"); // titleArea 높이값 조절을 위해 필요
    let slideImgArea = document.querySelector(".slideImgArea");
    let slideContainor = document.querySelector(".slideContainor");
    let slideList = document.querySelectorAll(".slideList");
    let slidePrevBtn = document.querySelector(".slidePrevBtn");
    let slideNextBtn = document.querySelector(".slideNextBtn");
    let curNumContainor = document.querySelector(".curNumContainor");
    let curNum = document.querySelectorAll(".curNum");

    let sldieWidth ;
    let sldieHeight ;
    let titleWrapHeight ; //디바이스 크기 681~1200 일때 사진 비율에 위치 조절이 필요
    let titleAreaHeight ; // 디바이스 크기 680이하 일때는 타이틀 영역이 위로 올라가기에 height 값 조절이 필요
    let slideInterval;
    let currentIndex = 0;

function resize () { // 브라우저의 넓이(window.inner)가 변할 때 슬라이드의 width,height값을 조정하기 위한 함수
    if (window.matchMedia("(min-width:1240px)").matches) { /* 사진 비율 4:3 */
        sldieWidth = 1200;
        sldieHeight = 800;
        titleWrapHeight = 800;
        titleAreaHeight = 0
    } else if (window.matchMedia("(min-width:771px) and (max-width: 1240px)").matches) { /* 사진 비율 3:2 */
        sldieWidth = window.innerWidth;
        sldieHeight = sldieWidth * 0.666;
        titleWrapHeight = sldieWidth * 0.666;
        titleAreaHeight = 0
    } else if (window.matchMedia("(max-width:770px)").matches) { /* 사진 비율 5:4 */
        sldieWidth = window.innerWidth;
        sldieHeight = sldieWidth * 0.8;    

        for(let i=0; i < tilteItem.length; i++) {            // 서로 다른 tilteItem 높이에 맞춰 titleAreaHeight의 높이값을 변경 
            if(tilteItem[i].classList.contains('fadeInTitle')) {
                titleAreaHeight=tilteItem[i].clientHeight
            }
        }        
    }   

    titleArea.style.height = titleAreaHeight + "px"
    titleWrap.style.height = titleWrapHeight + "px"
    slideImgArea.style.width = sldieWidth + "px"
    slideImgArea.style.height = sldieHeight + "px"
    slideContainor.style.width = sldieWidth * slideList.length + "px"
    slideContainor.style.height = sldieHeight + "px"  
    for(i=0; i < slideList.length; i++){            
        slideList[i].style.width = sldieWidth + "px"
        slideList[i].style.height = sldieHeight + "px"         
    }

    slideContainor.style.left = -currentIndex * slideList[0].clientWidth + "px";
    curNumContainor.style.left = -currentIndex * curNum[0].clientWidth +"px";
    pagiNum[currentIndex].classList.add('pagiBar')
    tilteItem[currentIndex].classList.add('fadeInTitle')
    for (let i = 0; i < pagiNum.length; i++) {
        if (i !== currentIndex) {
            pagiNum[i].classList.remove('pagiBar');
            tilteItem[i].classList.remove('fadeInTitle');
        }
    }
}

function mainVisualSlide(num) {
    currentIndex = num;
    resize()
}    

slidePrevBtn.addEventListener('click' , function() {
    if(currentIndex > 0 ){                
        mainVisualSlide(currentIndex - 1);
    } else {
        mainVisualSlide(3);
    }
    clearInterval(slideInterval);
    interval();
});

slideNextBtn.addEventListener('click' , function() {
    if(currentIndex < slideList.length - 1 ){
        mainVisualSlide(currentIndex + 1);
    } else {
        mainVisualSlide(0);
    }
    clearInterval(slideInterval);
    interval();
});

function interval() {
    slideInterval = setInterval(function() {
        if(currentIndex < slideList.length - 1 ){
            mainVisualSlide(currentIndex + 1);
        } else {
            mainVisualSlide(0);
        }
        resize()
    },4800);
}

/* 메인비쥬얼 재생,일시정지 버튼 */
let clickCount = 1;
toggleBtn.addEventListener('click' , function(){
    if(clickCount % 2 == 1) {
        clearInterval(slideInterval);
        this.classList.add('on')
    } else {
        clearInterval(slideInterval);
        interval();
        this.classList.remove('on')
    }
    clickCount++;
});

/* collection > containor 높이 */
let collection = document.querySelector('.collection')
let containor = document.querySelector('.collection .containor ')
let collectionTitle = document.querySelector('.collection .containor > h2')
let collectionTabMenu = document.querySelector('.collection .containor .tabMenu')
let prodList = Array.from(document.querySelectorAll('.prodList'))

function collectionHeightCalc() {
    let prodListOn = prodList.filter((item) => item.classList.contains('on'))
    containor.style.height = prodListOn[0].clientHeight + collectionTitle.clientHeight + collectionTabMenu.clientHeight + 'px'
}
collectionHeightCalc()


/* collection > swiper 높이값을 width값에 맞춰 수정 */
let slide = document.querySelectorAll('.swiper-slide')
let slideImg = document.querySelectorAll('.swiper-slide > img')

function slideHeightCalc() {
    for(let i = 0; i < slideImg.length; i++) {
        slide[i].style.height = slide[i].clientWidth * 1 + 'px'
    }
}
slideHeightCalc()

/* collection 이중탭 */
let brTit = document.querySelectorAll('.brTit')         
let cateName = document.querySelectorAll('.cateName')

/* 큰 탭메뉴(2개짜리) */
for(let i = 0; i < brTit.length; i++) {   
    brTit[i].addEventListener('click' , function(e){
        for (let j = 0; j < cateName.length; j++) {  
            
            cateName[j].classList.remove('on')
            prodList[j].classList.remove('on');           
        } 
        let caTitOn = e.target.nextElementSibling.firstElementChild.firstElementChild
        let dataIdx = caTitOn.getAttribute('data')
        caTitOn.classList.add('on')
        prodList[dataIdx].classList.add('on')

        for(let k = 0; k < brTit.length; k++) {  
            brTit[k].classList.remove('on')
        }
        e.target.classList.add('on')
    })
}
/* 작은 탭메뉴(5개짜리) */
for(let i = 0; i < cateName.length; i++) {             
    cateName[i].addEventListener('click' , function(e){
        for (let j = 0; j < cateName.length; j++) {  
            cateName[j].classList.remove('on')
            prodList[j].classList.remove('on');            
        }
        cateName[i].classList.add('on')
        prodList[i].classList.add('on')

        for(let k = 0; k < brTit.length; k++) {  
            brTit[k].classList.remove('on')
        }
        let brTitOn = e.target.parentNode.parentNode.previousElementSibling
        brTitOn.classList.add('on')
    })
}

/* scrollFadeIn 이벤트 */
let fadeInClass = Array.from(document.querySelectorAll('.fadeInClass'));
let prodListWrap = document.querySelector('.prodListWrap');
let htmlTopArray = [];
let viewHeigArray = [];
let fadeInPoint = [];

function scrollFadeIn(){
    for(let i = 0; i < fadeInClass.length; i++) {      
        htmlTopArray[i] = Math.floor(fadeInClass[i].getBoundingClientRect().top)
        viewHeigArray[i] = Math.floor(window.innerHeight * 0.8)
        fadeInPoint[i] = htmlTopArray[i] - viewHeigArray[i]
        if(fadeInPoint[i] <= 0) {
            fadeInClass[i].classList.add('on')
        }
    }
    /* 모든 요소에 on클래스가 붙으면 함수 종료 */
    if(fadeInClass.every(item => item.classList.contains('on'))) {
        return
    }
}


/* 모바일 gnb */
let mobileOpen = document.querySelector('.fullDownBtn')
let mobileClose = document.querySelector('.closeBtn')
let mobileGnb = document.querySelector('.mobileGnb')
let mobileGnbBg = document.querySelector('.mobileGnbBg')

mobileOpen.addEventListener('click' , function(e){
    e.preventDefault();
    mobileGnb.classList.add('on')
    mobileGnbBg.classList.add('on')
})
mobileClose.addEventListener('click' , function(e){
    e.preventDefault();
    mobileGnb.classList.remove('on')
    mobileGnbBg.classList.remove('on')
})

/* 모바일 gnb 아코디언 */
let secondList = document.querySelector('.mobileGnb .secondList')
let depth01Btn = Array.from(document.querySelectorAll('.mobileGnb .gnbList > a'))
let depth01 = document.querySelectorAll('.mobileGnb .depth01')

secondList.addEventListener('click', function(e) {
    e.preventDefault();
    alert('준비중입니다')
})
/* 첫번째 아코디언 */
for(let i = 0; i < depth01Btn.length; i++) {
    depth01Btn[i].addEventListener('click', function(e) {
        e.preventDefault();
        let target = e.target
        target.classList.contains('on') ? target.classList.remove('on') : target.classList.add('on')
        
        let nonTarget = depth01Btn.filter(item => item !== target);
        nonTarget.forEach(item => item.classList.remove('on'));
        nonTarget.forEach(item => item.nextElementSibling.style.height = 0);

        let depth01 = this.nextElementSibling
        if(target.classList.contains('on')) { 
            depth01.style.height = depth01.scrollHeight + "px"
        } else {
            depth01.style.height = 0
        }
    });
}

/* 두번째 아코디언 */
let depth02Btn = Array.from(document.querySelectorAll('.depth02Btn'))
let depth02All = document.querySelectorAll('.depth02')

for(let i = 0; i < depth02Btn.length; i++) {
    depth02Btn[i].addEventListener('click', function(e) {
        e.preventDefault();
        let target = e.target
        target.classList.contains('on') ? target.classList.remove('on') : target.classList.add('on')

        let nonTarget = depth02Btn.filter(item => item !== target);
        nonTarget.forEach(item => item.classList.remove('on'));
        nonTarget.forEach(item => item.nextElementSibling.style.height = 0);

        let depth02 = this.nextElementSibling
        let depth01 = this.parentElement.parentElement
        let depth02Height = [];

        if(target.classList.contains('on')) {
            depth02.style.height = depth02.scrollHeight + "px"
            depth02Height = depth02All[i].clientHeight
            depth01.style.height = depth01.scrollHeight - depth02Height + depth02.scrollHeight + "px"
        } else {
            depth01.style.height = depth01.scrollHeight - depth02.scrollHeight + "px"
            depth02.style.height = 0
        }
    });
}

window.addEventListener('load', function() {
    resize()
    clearInterval(slideInterval);
    interval();
    scrollFadeIn()
    collectionHeightCalc()
    });
window.addEventListener('resize', function() {
    slideHeightCalc()
    collectionHeightCalc()
    resize()
    }
)
window.addEventListener('scroll' , function(){
    scrollFadeIn()
})




