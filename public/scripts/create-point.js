

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUFs()

function getCities(event){
    const citiesSelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citiesSelect.innerHTML = "<option value>Aguarde</option>"
    citiesSelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        citiesSelect.innerHTML = "<option value>Selecione a Cidade</option>"
        for(const city of cities){
            citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citiesSelect.disabled = false
    })

}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}


//atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //add or remove
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    
    //verificar se existe items selecionados, se sim pegar os items selecionado

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso sera true or false
        return itemFound
    })

    //se ja estiver selecionado 
    if(alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
        // senao estiver selecionado adicionar a seleçao
        selectedItems.push(itemId)
    }

    //console.log(`selectedItems: `, selectedItems) 

    collectedItems.value = selectedItems

    




}