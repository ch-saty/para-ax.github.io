const parallax_el = document.querySelectorAll(".parallax");

let xValue=0,
    yValue=0;

    let rotatedegree=0;

window.addEventListener("mousemove", (e) => {

    if(timeline.isActive()) return;

    xValue=e.clientX- window.innerWidth/2;
    yValue=e.clientY- window.innerHeight/2;
    
    rotatedegree=(xValue/(window.innerWidth/2 ))*20

    // update(e.clientX);
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx; 
        let speedy = el.dataset.speedy; 
        let speedz = el.dataset.speedz; 
        let rotatespeed = el.dataset.rotation;
        
        let isinLeft = 
            parseFloat(getComputedStyle(el).left) < window.innerWidth/2 ? 1 : -1; 
        
        let zValue=(e.clientX-parseFloat(getComputedStyle(el).left))* isinLeft*0.0815;
        

        el.style.transform = ` perspective(2300px) translateZ(${zValue * speedz
        }px) rotateY(${rotatedegree * rotatespeed}deg) translateX(calc(-50% + ${-xValue * speedx
        }px))  
        translateY(calc(-50% + ${yValue * speedy*0.2
        }px))`;

    });

}); 

let timeline=gsap.timeline();

Array.from(parallax_el)
.filter((el) => !el.classList.contains("text"))
.forEach((el) =>{
    
    timeline.from(
        el,
        {
        top: `${el.offsetheight/2 + +el.dataset.distance}px`,
        duration: 2.85,
        ease: "power3.out"
    },
    "1"
    );
});

timeline.from(
    ".text h1",{
    y:
    window.innerHeight -
     document.querySelector(".text h1").getBoundingClientRect().top + 200,
    duration:2,
},
"2.5"
)
.from(".text h2",
{
    y:-150,
    opacity:0,
    duration:1.5,
},
"3"
)
.from("hide",{
    opacity:0,
    duration:1.3,
    },
    "3"
);

