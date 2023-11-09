import './SearchBox.css';

function SearchBox({ 
  suggestions, 
  name, 
  fuzzy,
  editFuzzy,
  prefix,
  editPrefix,
  combineWith,
  editCombineWith,
  updateLists, 
  clearButton,
  selectSuggestion }) {
  return (
    <div className="SearchBox">
      <Search 
        name={name} 
        updateLists={updateLists} 
        clearButton={clearButton} />
      
      <SuggestionList 
        suggestions={suggestions}
        selectSuggestion={selectSuggestion} />

      <AdvancedOptions 
        fuzzy={fuzzy}
        editFuzzy={editFuzzy}
        prefix={prefix}
        editPrefix={editPrefix}
        combineWith={combineWith}
        editCombineWith={editCombineWith}
      />
    </div>
  );
}

function Search({ 
  name, 
  updateLists, 
  clearButton }) {
  return (
    <div className="Search">
      <input value={name} onChange={updateLists} type="text" autoComplete="none" autoCorrect="none" autoCapitalize="none" spellCheck="false" placeholder="Search products..." />
      <button className="clear" onClick={clearButton}>&times;</button>
    </div>
  );
}
function SuggestionList({ suggestions, selectSuggestion }) {
  function renderSuggestions(suggestions) {
    const listSuggestions = suggestions.map(suggestion => 
      <li onClick={e => selectSuggestion(e.target.value)} className="Suggestion"> {suggestion.suggestion} </li>
    );
    return listSuggestions;
  }

  return (
    <>
      { suggestions.length > 0 &&
      <ul className="SuggestionList">
        {renderSuggestions(suggestions)}
      </ul>
      }
    </>
  );
}
function AdvancedOptions({
  fuzzy,
  editFuzzy,
  prefix,
  editPrefix,
  combineWith,
  editCombineWith }) {
  return (
    <details className="AdvancedOptions">
      <summary>Advanced options</summary>
      <form className="options">
        <div>
          <b>Search options:</b>
          <label><input type="checkbox" name="prefix" checked={prefix} onChange={editPrefix}/> Prefix</label>
          <label><input type="checkbox" name="fuzzy" checked={fuzzy} onChange={editFuzzy}/> Fuzzy</label>
        </div>
        <div>
          <b>Combine terms with:</b>
          <label><input type="radio" name="combineWith" value="OR" checked={combineWith === 'OR'} onChange={editCombineWith} /> OR</label>
          <label><input type="radio" name="combineWith" value="AND" checked={combineWith !== 'OR'} onChange={editCombineWith} /> AND</label>
        </div>
      </form>
    </details>
  );
}

export default SearchBox;