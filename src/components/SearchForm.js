import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

export default function SearchForm({ value }) {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/search/' + keyword);
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
