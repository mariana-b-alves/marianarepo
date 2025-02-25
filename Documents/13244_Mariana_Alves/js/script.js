//ALL

//SMOOTH SCROLL

let btnMore = document.querySelector("#intro p");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//SECTION 1

//INCLUIR SCROLL REVEAL; CLASSES APARECEM PROGRESSIVAMENTE QUANDO UTILIZADOR FAZ SCROLL; CLASSES FAZEM UMA ROTAÇÃO DE CIMA PARA BAIXO

window.sr = ScrollReveal({reset:true});

sr.reveal('#section1 h1',{
    duration:2000,
    rotate:{
        x:-100,
        y:0,
        z:0
    }
});

sr.reveal('#section1-text',{
    duration:2000,
    rotate:{
        x:-100,
        y:0,
        z:0
    }
});

sr.reveal('#section1-statement',{
    duration:2000,
    rotate:{
        x:-100,
        y:0,
        z:0
    }
});

//SECTION 2

//CARROSEL/IMAGE SLIDER - CLICAR NAS SETAS PARA ARRASTAR PARA A FRENTE E PARA TRÁS AS IMAGENS
//CÓDIGO ADAPTADO DE CODINGNEPAL: https://www.youtube.com/watch?v=7HPsdVQhpRw&t=397s
//IMAGE CLICK POPUP - CLICAR NAS IMAGENS PARA APARECEREM EM ECRÃ INTEIRO
//CÓDIGO ADAPTADO DE MR. WEB DESIGNER: https://www.youtube.com/watch?v=QghhoJBdw7A&t=151s


const pictures = document.querySelector(".pictures");
firstImg = pictures.querySelectorAll("img")[0];
arrows = document.querySelectorAll(".drag-carousel i")

let scrollWidth = pictures.scrollWidth - pictures.clientWidth;

const showHideIcons = () => {
    arrows[0].style.display = pictures.scrollLeft == 0 ? "none" : "block";
    arrows[1].style.display = pictures.scrollLeft == scrollWidth ? "none" : "block";
};

let firstImgWidth = firstImg.clientWidth + 14;

arrows.forEach (icon => {
    icon.addEventListener("click", () =>{
        pictures.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

//SECTION 2

//SELECIONA TODOS OS ELEMENTOS COM O .PICTURES IMG ASSOCIADO
document.querySelectorAll('.pictures img').forEach(image =>{
    //AO CLICAR NA IMAGEM O POPUP (.SECTION2-POPUP) ABRE
    image.onclick = () =>{
        document.querySelector('.section2-popup').style.display ='block'; 
        document.querySelector('.section2-popup img').src = image.getAttribute('src');
    }
});
//TIRAR O POPUP COM O X
document.querySelector('.section2-popup span').onclick = ()=>{
    document.querySelector('.section2-popup').style.display = 'none';  
};


//SECTION 3

//REPEAT DA SECTION 1 (SEPARADO POR MOTIVOS DE MELHOR ORGANIZAÇÃO);

sr.reveal('.section3-container',{
    duration:2000,
});

sr.reveal('.section3b-container',{
    duration:2000,
});

sr.reveal('.section3c-container',{
    duration:2000,
});

//SECTION 4

//FAZER BTN1 PASSAR DA SECÇÃO 4 PRA A SECÇÃO 5 COM UM CLIQUE

let btn1 = document.querySelector("#btn1");

let arrow1 = document.querySelector("#arrow1");

arrow1.addEventListener('click', function () {
    btn1.click();
})

//REPEAT DA SECTION 1 E 3 (SEPARADO POR MOTIVOS DE MELHOR ORGANIZAÇÃO)
sr.reveal('#s4-span-question',{
    duration:2000,
});

sr.reveal('#s4-span-statement',{
    duration:2800,
});

//SECTION 5

//REPEAT DA SECTION 1, 3 E 5 (SEPARADO POR MOTIVOS DE MELHOR ORGANIZAÇÃO)

sr.reveal('#s5-relationships',{
    duration:2000,
});

sr.reveal('#s5-fun',{
    duration:2800,
});

//SECTION 6 - CRÉDITOS
//CÓDIGO CSS E HTML ADAPTADO DE: https://www.w3schools.com/howto/howto_css_flip_card.asp