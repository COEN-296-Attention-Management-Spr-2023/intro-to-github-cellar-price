import './SearchBox.css';

function SearchBox({ 
  suggestions, 
  name, 
  setName,
  setSuggestName,
  fuzzy,
  setFuzzy,
  prefix,
  setPrefix,
  combineWith,
  setCombineWith,
  category,
  setCategory }) {
  return (
    <div className="SearchBox">
      <Search 
        name={name} 
        setName={setName}
        setSuggestName={setSuggestName}
        />
      
      <SuggestionList 
        setName={setName}
        setSuggestName={setSuggestName}
        suggestions={suggestions} />

      <AdvancedOptions 
        fuzzy={fuzzy}
        setFuzzy={setFuzzy}
        prefix={prefix}
        setPrefix={setPrefix}
        combineWith={combineWith}
        setCombineWith={setCombineWith}
        category={category}
        setCategory={setCategory}
      />
    </div>
  );
}

function Search({ 
  name, 
  setName,
  setSuggestName}) {
  return (
    <div className="Search">
      <input value={name} onChange={e => {
        setName(e.target.value);
        setSuggestName(e.target.value)}} 
        type="text" autoComplete="none" autoCorrect="none" autoCapitalize="none" spellCheck="false" placeholder="Search products..." />
      <button className="clear" onClick={e => {
        setName('');
        setSuggestName('')}}
        >&times;</button>
    </div>
  );
}
function SuggestionList({ setName, suggestions, setSuggestName }) {
  function renderSuggestions(suggestions) {
    const listSuggestions = suggestions.map(suggestion => 
      <li key={suggestion.suggestion} onClick={e => {
        setName(suggestion.suggestion); 
        setSuggestName('');}} 
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
  category,
  setCategory }) {
  return (
    <details className="AdvancedOptions">
      <summary>Advanced options</summary>
      <form className="options">
        <div>
          <b>Search options:</b>
          <label><input type="checkbox" name="prefix" checked={prefix} onChange={e => {
            setPrefix(e.target.checked);
            console.log('prefix = ' + e.target.checked);}}
            /> Prefix</label>
          <label><input type="checkbox" name="fuzzy" checked={fuzzy} onChange={e => {
            setFuzzy(e.target.checked);
            console.log('fuzzy = ' + e.target.checked);}}
            /> Fuzzy</label>
        </div>
        <div>
          <b>Combine terms with:</b>
          <label><input type="radio" name="combineWith" value="OR" checked={combineWith === 'OR'} onChange={e => {
            setCombineWith(e.target.value);
            console.log('combineWith = ' + e.target.value);}} 
            /> OR</label>
          <label><input type="radio" name="combineWith" value="AND" checked={combineWith === 'AND'} onChange={e => {
            setCombineWith(e.target.value);
            console.log('combineWith = ' + e.target.value);}} 
            /> AND</label>
        </div>
        <div>
          <b>Select category:</b>
          <label>
            <select 
            name="category"
            value={category}
            onChange={e => {setCategory(e.target.value); console.log('category = ' + e.target.value);}}
            >
              <option value="none">None</option>
              <option value="food">Food</option>
              <option value="drink">Drink</option>
              <option value="amenities">Amenities</option>
            </select>
          </label>
        </div>
      </form>
    </details>
  );
}

export default SearchBox;