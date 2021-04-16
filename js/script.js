// Attraverso una chiamata ajax all'API di boolean
// https://flynn.boolean.careers/exercises/api/array/music
// avremo a disposizione una decina di dischi musicali. 
// Utilizzando vue, stampiamo a schermo una card per ogni album.
// BONUS: Creare una select con tutti i generi dei dischi. In base a cosa scegliamo nella select, vedremo i corrispondenti cd.
// BONUS 2: Ordinare i dischi per anno di uscita.


function initVue() {

    new Vue({

        el : "#app",
        data : {

            "music" : [],
            "genres" : ["All"],
            "filterKey" : ""
        },

        methods: {

            getMusicGenres: function() {

                this.music.forEach(song => {

                    const genre = song.genre;
                    if (!this.genres.includes(genre))
                        this.genres.push(genre)
                })
            },

            sortByYear: function() {

                this.music.sort((a,b) => a.year - b.year)
            }
        },

        computed: {

            filterByGenre: function() {

                if (this.filterKey == "All") {

                    return this.music
                } else {

                    return this.music.filter(song => {

                        return song.genre == this.filterKey
                    })
                } 
            }
        },

        mounted() {

            this.filterKey = this.genres[0];

            axios
                .get("https://flynn.boolean.careers/exercises/api/array/music")
                .then(data => {

                    this.music = data.data.response;
                    this.getMusicGenres();
                    this.sortByYear();
                    console.log(this.genres, this.music);
                    
                })
                .catch(() => console.log("Error!"));
        }
    })
}

function init() {

    initVue();
}

document.addEventListener("DOMContentLoaded",init)