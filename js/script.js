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
            "filterKey" : ""
        },

        // methods: {

        //     getMusicGenres: function() {

        //         this.music.forEach(song => {

        //             const genre = song.genre;
        //             if (!this.genres.includes(genre))
        //                 this.genres.push(genre)
        //         })
        //     }

        // },

        computed: {

            sortByYear: function() {

                return this.music.sort((a,b) => {
                    // console.log(a.year,b.year, a.year - b.year);
                    return a.year - b.year
                })
            },

            filterByGenre: function() {

                if (this.filterKey == "") {

                    return this.sortByYear
                } else {

                    return this.sortByYear.filter(song => {

                        return song.genre == this.filterKey
                    })
                } 
            },

            getGenres: function() {

                const genresTest = [];
                this.music.forEach(song => {

                    const genre = song.genre;
                    if (!genresTest.includes(genre))
                        genresTest.push(genre)
                })

                return genresTest
            }
        },

        mounted() {

            axios
                .get("https://flynn.boolean.careers/exercises/api/array/music")
                .then(data => {

                    this.music = data.data.response;
                    
                    this.getMusicGenres();
                    
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