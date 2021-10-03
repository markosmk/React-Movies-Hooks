import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SearchForm.css';

export default function SearchForm({ value }) {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push('/search/' + keyword);
  };

  const handleChangeInput = (event) => {
    setKeyword(event.target.value);
  };
  return (
    <>
      <div className="search-content">
        <form onSubmit={handleSubmit} className="form-search">
          <input
            type="text"
            value={keyword || value || ''}
            onChange={handleChangeInput}
            required
          />
          <button className="btn">Buscar</button>
        </form>
      </div>
    </>
  );
}
