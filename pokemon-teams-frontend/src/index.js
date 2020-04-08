const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function (event) {
    function fetchTrainers() {
        fetch(TRAINERS_URL)
            .then(resp => resp.json())
            .then(trainerArr => trainerArr.forEach(trainer => {
                renderTrainer(trainer)
            }))
    }


    function renderTrainer(trainer) {
        let div = document.createElement('div')
        let ul = document.createElement('ul')
        let p = document.createElement('p')
        let button = document.createElement('button')
        let main = document.querySelector('main')

        button.dataset.id = trainer.id
        button.innerText = "Add Pokemon"
        button.onclick = function () {
            if (ul.childNodes.length < 6) {
                let li = document.createElement('li');
                let pokemon = fetch(POKEMONS_URL, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ "trainer_id": trainer.id })
                })
                    .then(res => res.json())
                    .then(data => { return data }
                    )
                console.log(pokemon)
                let releaseButton = document.createElement('button')
                releaseButton.innerText = "Release"
                releaseButton.onclick = () => {
                    releaseButton.parentElement.remove()
                }
                li.innerText = `${pokemon.nickname} (${pokemon.species})`
                li.append(releaseButton)
                button.parentNode.append(li)
            } else {
                console.log(button.parentNode)
            }
        }
        div.setAttribute("class", "card")
        div.dataset.id = trainer.id
        p.innerText = trainer.name

        trainer.pokemons.forEach((pokemon) => {
            let li = document.createElement('li')
            let releaseButton = document.createElement('button')

            releaseButton.innerText = "Release"
            releaseButton.onclick = () => {
                releaseButton.parentElement.remove()
                fetch(`${POKEMONS_URL}/${pokemon.id}`, {
                    method: "DELETE"
                })
            }
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
            li.dataset.id = pokemon.id
            li.append(releaseButton)
            ul.append(li)
        })

        div.append(p)
        div.append(button)
        div.append(ul)
        main.append(div)
    }

    fetchTrainers()
})

