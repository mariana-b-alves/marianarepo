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

let tv = document.getElementById('tv');


series.map( serie =>{
    tv.innerHTML+= `
    <article>
            <h2>${serie.title}</h2>
            <img src=${serie.imageUrl} alt="${serie.title}">
            <p>${serie.commentary}</p>

            <p>Already read: ${serie.approved ? '✔️':'✖️'}</p>
       </article> `
});