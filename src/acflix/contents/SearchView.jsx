import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from '../js/api.js';
import SearchViewModal from "./SearchViewModal.jsx";

const SearchView = () => {

    //Hook
    const location = useLocation();
    const { search } = location.state;
    const [searchMv, setSearchMv] = useState([]);
    const [relative, setRelative] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {

      // 검색 Function START
      const fetchData = async (search) => {
        try {
          const response = await api.get(`/search/movie`, {
            params: {
            query: search,
            },
          });

      setSearchMv(response.data.results); // 검색 결과를 상태에 업데이트

      if (response.data.results.length > 0) {
        const movieId = response.data.results[0].id; // 첫 번째 검색 결과의 ID를 사용하여 비슷한 영화 가져오기
        fetchSimilarMovies(movieId);
      }
      
        } catch (error) {
          console.log('Error fetching data:', error);
      }
    };
    

      // 비슷한 영화 Function START
      const fetchSimilarMovies = async (movieId) => {
        try {
          const response = await api.get(`/movie/${movieId}/similar`);
          setRelative(response.data.results);
        } catch (error) {
          console.log('Error fetching similar data:', error);
        }
      };

      if (search) {
      fetchData(search); // 검색어가 있을 때 fetchData 호출
    }

  }, [search]); // search 값이 변경될 때마다 fetchData 다시 호출

  // 페이지 이동 시 상단 노출
  useEffect(() => {
    window.scrollTo(0, 0);
})




    // Handler
    
    const movieInfoClickHandler = (movie) => {
        setSelectedMovie(movie);
    }

    const closeModal = () => {
        setSelectedMovie(null);
        
    }
    const onErrorImg = (e) => {
      e.target.onerror = null;
      e.target.src="https://via.placeholder.com/200?text=none";
    }

    return (
      <div className="search-list">
          <h2 className="info">"{search}"에 대한 검색 결과</h2>
          <ul className="search-results">
            {searchMv && searchMv.length > 0 ? (
              searchMv.map((movie) => (
                <li key={movie.id} className="movie" onClick={() => movieInfoClickHandler(movie)}>
                  <img src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} 
                  onError={onErrorImg}/>
                  <a href="#none" className="title">{movie.title}</a>
                </li>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ul>
        <ul className="search-list">
          <h2>"{search}"와 비슷한 영화</h2>
          {relative.length > 0 ? (
            relative.map((movie) => (
              <li key={movie.id} className="movie" onClick={() => movieInfoClickHandler(movie)}>
                <img src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} onError={onErrorImg}/>
                <a href="#none" className="title">{movie.title}</a>
              </li>
            ))
          ) : (
            <p>비슷한 영화가 없습니다.</p>
          )}
          </ul>
            {selectedMovie && (
              <SearchViewModal movieInfo={selectedMovie} closeModal={closeModal} />
              )}
      </div>
      );
};

export default SearchView;
