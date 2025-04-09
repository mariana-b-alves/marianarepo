let series = [
    {
        title: 'Casados à Primeira Vista',
        imageUrl: 'img/casados.png',
        commentary: "What a hot mess...",
        approved: false,
    },
    {
        title: 'Salvage Hunters',
        imageUrl: 'img/salvage-hunters.png',
        commentary: "An educational series",
        approved: true,
    },
    {
        title: 'Naked and Afraid',
        imageUrl: 'img/naked-and-afraid.png',
        commentary: "Why do people do this to themselves?",
        approved: false,
    },
    {
        title: 'Pawn Stars',
        imageUrl: 'img/pawn-stars.png',
        commentary: "Just a fun bunch of lads.",
        approved: true,
    },
    {
        title: 'Liga Portugal',
        imageUrl: 'img/liga-portugal.png',
        commentary: "Go Benfica.",
        approved: true,
    },
];

//Define the counter, starting at zero and iterate on loop.
let counter = 0;

//Define a variable called btn by fetching the id "btn"
const button = document.getElementById("btn");

//By clicking the button, do everything inside it as follows...
button.addEventListener('click', function(){
    //Clear any text defined inside the id "tv" that may be inside of the HTML doc.
    tv.innerHTML = "";

    //Create a variable calles "serie", which includes everything inside teh array "series", starting from the value defined in counter (that is, 0)
    const serie = series[counter];

   //Add text inside of the HTML, using the info inside the array for the effect
    tv.innerHTML= `
            <h2>${serie.title}</h2>
            <img src=${serie.imageUrl} alt="${serie.title}">
            <p>${serie.commentary}</p>

            <p>Approved: ${serie.approved ? '✔️':'✖️'}</p>`

            //Increment the counter...
            counter++;

            //..but only until it reaches the full length of the array. Then it starts again at 0, on a loop.
            if (counter >= series.length) {
                counter = 0;
            }
  
}, false)