// Setup MiniSearch
const ItemSearch = new MiniSearch({
  fields: ['product', 'price'],
  storeFields: ['product', 'price']
})

// Select DOM elements
const $app = document.querySelector('.App')
const $search = document.querySelector('.Search')
const $searchInput = document.querySelector('.Search input')
const $clearButton = document.querySelector('.Search button.clear')
const $productList = document.querySelector('.ProductList')
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

})

// Clicking on clear button clears search and suggestions
$clearButton.addEventListener('click', () => {
  $searchInput.value = ''
  $searchInput.focus()

  renderSearchResults([])
})

// Changing any advanced option triggers a new search with the updated options
$options.addEventListener('change', (event) => {
  const query = $searchInput.value
  const results = getSearchResults(query)
  renderSearchResults(results)
})

// Define functions and support variables
const searchOptions = {
  fuzzy: 0.2,
  prefix: true,
  fields: ['products', 'prices'],
  combineWith: 'OR',
  filter: null
}

const getSearchResults = (query) => {
  const searchOptions = getSearchOptions()
  return miniSearch.search(query, searchOptions).map(({ id }) => productsById[id])
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

const getSearchOptions = () => {
  const formData = new FormData($options)
  const searchOptions = {}

  searchOptions.fuzzy = formData.has('fuzzy') ? 0.2 : false
  searchOptions.prefix = formData.has('prefix')
  searchOptions.fields = formData.getAll('fields')
  searchOptions.combineWith = formData.get('combineWith')

  return searchOptions
}

const capitalize = (string) => string.replace(/(\b\w)/gi, (char) => char.toUpperCase())
