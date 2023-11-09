// Setup MiniSearch
import MiniSearch from 'minisearch'

const ItemSearch = new MiniSearch({
  fields: ['product'],
  storeFields: ['product', 'price']
})

// Select DOM elements
const $app = document.querySelector('.App')
const $search = document.querySelector('.Search')
const $searchInput = document.querySelector('.Search input')
const $clearButton = document.querySelector('.Search button.clear')
const $productList = document.querySelector('.ProductList')
const $suggestionList = document.querySelector('.SuggestionList')
const $options = document.querySelector('.AdvancedOptions form')

// Fetch and index data
$app.classList.add('loading')
let productsById = {}

fetch('cellarprice.json')
  .then(response => response.json())
  .then((allProducts) => {
    productsById = allProducts.reduce((byId, product) => {
      byId[product.id] = product
      return byId
    }, {})
    return ItemSearch.addAll(allProducts)
  }).then(() => {
    $app.classList.remove('loading')
  })

// Bind event listeners:

// Typing into search bar updates search results and suggestions
$searchInput.addEventListener('input', (event) => {
  const query = $searchInput.value

  const results = (query.length > 1) ? getSearchResults(query) : []
  renderSearchResults(results)

  const suggestions = (query.length > 1) ? getSuggestions(query) : []
  renderSuggestions(suggestions)
})

// Clicking on clear button clears search and suggestions
$clearButton.addEventListener('click', () => {
  $searchInput.value = ''
  $searchInput.focus()

  renderSearchResults([])
  renderSuggestions([])
})

// Clicking on a suggestion selects it
$suggestionList.addEventListener('click', (event) => {
  const $suggestion = event.target

  if ($suggestion.classList.contains('Suggestion')) {
    const query = $suggestion.innerText.trim()
    $searchInput.value = query
    $searchInput.focus()

    const results = getSearchResults(query)
    renderSearchResults(results)
    renderSuggestions([])
  }
})

// Pressing up/down/enter key while on search bar navigates through suggestions
$search.addEventListener('keydown', (event) => {
  const key = event.key

  if (key === 'ArrowDown') {
    selectSuggestion(+1)
  } else if (key === 'ArrowUp') {
    selectSuggestion(-1)
  } else if (key === 'Enter' || key === 'Escape') {
    $searchInput.blur()
    renderSuggestions([])
  } else {
    return
  }
  const query = $searchInput.value
  const results = getSearchResults(query)
  renderSearchResults(results)
})

// Clicking outside of search bar clears suggestions
$app.addEventListener('click', (event) => {
  renderSuggestions([])
})

// Changing any advanced option triggers a new search with the updated options
$options.addEventListener('change', (event) => {
  const query = $searchInput.value
  const results = getSearchResults(query)
  renderSearchResults(results)
})

// Define functions and support variables
const getSearchResults = (query) => {
  const searchOptions = getSearchOptions()
  return ItemSearch.search(query, searchOptions).map(({ id }) => productsById[id])
}

const getSuggestions = (query) => {
  return ItemSearch.autoSuggest(query, { boost: { product: 5 } })
    .filter(({ suggestion, score }, _, [first]) => score > first.score / 4)
    .slice(0, 5)
}

const renderSearchResults = (results) => {
  $productList.innerHTML = results.map(({ product, price }) => {
    return `<li class="Product">
      <h3>${capitalize(product)}</h3>
      <dl>
        <dt>Price:</dt> <dd>${price}</dd>
      </dl>
    </li>`
  }).join('\n')

  if (results.length > 0) {
    $app.classList.add('hasResults')
  } else {
    $app.classList.remove('hasResults')
  }
}

const renderSuggestions = (suggestions) => {
  $suggestionList.innerHTML = suggestions.map(({ suggestion }) => {
    return `<li class="Suggestion">${suggestion}</li>`
  }).join('\n')

  if (suggestions.length > 0) {
    $app.classList.add('hasSuggestions')
  } else {
    $app.classList.remove('hasSuggestions')
  }
}

const selectSuggestion = (direction) => {
  const $suggestions = document.querySelectorAll('.Suggestion')
  const $selected = document.querySelector('.Suggestion.selected')
  const index = Array.from($suggestions).indexOf($selected)

  if (index > -1) {
    $suggestions[index].classList.remove('selected')
  }

  const nextIndex = Math.max(Math.min(index + direction, $suggestions.length - 1), 0)
  $suggestions[nextIndex].classList.add('selected')
  $searchInput.value = $suggestions[nextIndex].innerText
}

const getSearchOptions = () => {
  const formData = new FormData($options)
  const searchOptions = {}

  searchOptions.fuzzy = formData.has('fuzzy') ? 0.2 : false
  searchOptions.prefix = formData.has('prefix')
  searchOptions.combineWith = formData.get('combineWith')

  return searchOptions
}

const capitalize = (string) => string.replace(/(\b\w)/gi, (char) => char.toUpperCase())
