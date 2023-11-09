import './SearchBox.css';

function SearchBox({ 
  suggestions, 
  name, 
  setName,
  fuzzy,
  setFuzzy,
  prefix,
  setPrefix,
  combineWith,
  setCombineWith,
  updateLists, 
  selectSuggestion }) {
  return (
    <div className="SearchBox">
      <Search 
        name={name} 
        setName={setName}
        updateLists={updateLists} />
      
      <SuggestionList 
        setName={setName}
        suggestions={suggestions}
        selectSuggestion={selectSuggestion} />

      <AdvancedOptions 
        fuzzy={fuzzy}
        setFuzzy={setFuzzy}
        prefix={prefix}
        setPrefix={setPrefix}
        combineWith={combineWith}
        setCombineWith={setCombineWith}
        updateLists={updateLists}
      />
    </div>
  );
}

function Search({ 
  name, 
  setName,
  updateLists}) {
  return (
    <div className="Search">
      <input value={name} onChange={e => {
        setName(e.target.value); 
        updateLists();}} 
        type="text" autoComplete="none" autoCorrect="none" autoCapitalize="none" spellCheck="false" placeholder="Search products..." />
      <button className="clear" onClick={e => {
        setName(''); 
        updateLists();}}
        >&times;</button>
    </div>
  );
}
function SuggestionList({ setName, suggestions, selectSuggestion }) {
  function renderSuggestions(suggestions) {
    const listSuggestions = suggestions.map(suggestion => 
      <li key={suggestion.score} onClick={e => {
        setName(e.target.value); 
        selectSuggestion()}} 
        className="Suggestion"> {suggestion.suggestion} </li>
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
  setFuzzy,
  prefix,
  setPrefix,
  combineWith,
  setCombineWith,
  updateLists }) {
  return (
    <details className="AdvancedOptions">
      <summary>Advanced options</summary>
      <form className="options">
        <div>
          <b>Search options:</b>
          <label><input type="checkbox" name="prefix" checked={prefix} onChange={e => {
            setPrefix(e.target.checked);
            console.log('prefix = ' + prefix);
            updateLists();}}
            /> Prefix</label>
          <label><input type="checkbox" name="fuzzy" checked={fuzzy} onChange={e => {
            setFuzzy(e.target.checked);
            console.log('fuzzy = ' + fuzzy);
            updateLists();}}
            /> Fuzzy</label>
        </div>
        <div>
          <b>Combine terms with:</b>
          <label><input type="radio" name="combineWith" value="OR" checked={combineWith === 'OR'} onChange={e => {
            setCombineWith(e.target.value);
            console.log('combineWith = ' + combineWith);
            updateLists();}} 
            /> OR</label>
          <label><input type="radio" name="combineWith" value="AND" checked={combineWith === 'AND'} onChange={e => {
            setCombineWith(e.target.value);
            console.log('combineWith = ' + combineWith);
            updateLists();}} 
            /> AND</label>
        </div>
      </form>
    </details>
  );
}

export default SearchBox;