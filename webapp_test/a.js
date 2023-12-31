const e = React.createElement;


// ReactDOM.render(<App />, document.getElementById('root'))
// import { jsx as _jsx } from "react/jsx-runtime";
// import { Fragment as _Fragment } from "react/jsx-runtime";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    e("div", null,
        e('h1', null, 'Greetings, ' + "test" + '!'),
        e('h1', null, 'mimi ' + "leo" + '!')
    )

    
    // return <h1> Greetings test ! </h1>
);

const MiniSearch = require('minisearch')

const documents = [
    {
      id: 1,
      title: 'Moby Dick',
      text: 'Call me Ishmael. Some years ago...',
      category: 'fiction'
    },
    {
      id: 2,
      title: 'Zen and the Art of Motorcycle Maintenance',
      text: 'I can see by my watch...',
      category: 'fiction'
    },
    {
      id: 3,
      title: 'Neuromancer',
      text: 'The sky above the port was...',
      category: 'fiction'
    },
    {
      id: 4,
      title: 'Zen and the Art of Archery',
      text: 'At first sight it must seem...',
      category: 'non-fiction'
    },
    // ...and more
  ]
  
  // Create a search engine that indexes the 'title' and 'text' fields for
  // full-text search. Search results will include 'title' and 'category' (plus the
  // id field, that is always stored and returned)
  const miniSearch = new MiniSearch({
    fields: ['title', 'text'],
    storeFields: ['title', 'category']
  })
  
  // Add documents to the index
  miniSearch.addAll(documents)
  
  // Search for documents:
  let results = miniSearch.search('zen art motorcycle')

  console.log(results)
  