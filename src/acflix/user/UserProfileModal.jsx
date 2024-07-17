import React, { useEffect, useState } from "react";
import api from '../js/api.js';
import requests from '../js/requests.js';
import { getMyFavDB, setMyFavDB } from '../js/db.js';
import { getLoginedSessionID } from '../js/session.js';

const UserProfileModal = ({ movieInfo, closeModal }) => {

    // Hook
    const [play, setPlay] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [myFavs, setMyFavs] = useState([]);


    useEffect(() => {

        fetchPlay(movieInfo.id);
        fetchData(requests.fetchTopRated, setMovieList);
        fetchData(requests.fetchTrending, setMovieList);

        setMyFavs(getMyFavDB(getLoginedSessionID()));

    }, [movieInfo.id]);

    // 모달창 띄울 시 스크롤 방지
    useEffect(() => {
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = '';
          window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
      }, []);

    // GET Movie Streaming API 
    const fetchPlay = async (movieId) => {
        try {
            const response = await api.get(`/movie/${movieId}/videos`);
            const videos = response.data.results;
            
            if (videos.length > 0) {
                setPlay(videos[0].key);
            } else {
                setPlay(null);
            }
        } catch (error) {
            console.log('Error fetching video data:', error);
        }
    };

     // get api
     const fetchData = async (request, setData) => {
        try {
            const response = await api.get(request);
            setData(response.data.results);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    // Handler
    const playBtnClickHandler = () => {
        if (play !== null) {

            const iframe = document.createElement('iframe');
            iframe.width = '900';
            iframe.height = '600';
            iframe.src = `https://www.youtube.com/embed/${play}`;
            iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;


            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = '';
            modalContent.appendChild(iframe);

            const closeButton = document.createElement('button');
            closeButton.textContent = 'CLOSE';
            closeButton.addEventListener('click', handleCloseModal);
            modalContent.appendChild(closeButton);

        } else {

            alert('예고편이 존재하지 않습니다.');

        }
    };

    // 추천 찜하기 버튼
    const recommendFavBtnClickHandler = () => {

        let updatedFavs = [...myFavs]; // 현재 찜하기 업데이트
        const movieId = selectedMovie.id || selectedMovie.name;

        // 찜 목록 중복체크
        if (!updatedFavs.includes(movieId)) {

            updatedFavs.push(movieId);
            setMyFavDB(getLoginedSessionID(), updatedFavs);
            setMyFavs(updatedFavs); 
            alert(`${selectedMovie.title || selectedMovie.name}을 찜하셨습니다!!`);

        } else {

            // 찜 목록 삭제 알림
            if (window.confirm(`${selectedMovie.title || selectedMovie.name}을 찜 목록에서 삭제하시겠습니까?`)) {

                updatedFavs = updatedFavs.filter((e) => e !== movieId);
                setMyFavDB(getLoginedSessionID(), updatedFavs);
                setMyFavs(updatedFavs); 
                alert(`${selectedMovie.title || selectedMovie.name}을 찜 목록에서 삭제하셨습니다!!`);

            } else {
                alert('찜 목록 삭제를 취소하셨습니다.');
            }
        }
    };

    // 찜하기 버튼
    const favBtnClickHandler = () => {

        let updatedFavs = [...myFavs]; // 현재 찜하기 업데이트
        const movieId = movieInfo.id;

        // 찜 목록 중복체크
        if (!updatedFavs.includes(movieId)) {

            updatedFavs.push(movieId);
            setMyFavDB(getLoginedSessionID(), updatedFavs);
            setMyFavs(updatedFavs); 
            alert(`${movieInfo.title}을 찜하셨습니다!!`);

        } else {

            // 찜 목록 삭제 알림
            if (window.confirm(`${movieInfo.title}을 찜 목록에서 삭제하시겠습니까?`)) {

                updatedFavs = updatedFavs.filter((e) => e !== movieId);
                setMyFavDB(getLoginedSessionID(), updatedFavs);
                setMyFavs(updatedFavs); 
                alert(`${movieInfo.title}을 찜 목록에서 삭제하셨습니다!!`);

            } else {
                alert('찜 목록 삭제를 취소하셨습니다.');
            }
        }
    };

    const movieInfoClickHandler = (movie) => {
        setSelectedMovie(movie);
        fetchPlay(movie.id);
    }
    
    // Function
    const handleCloseModal = () => {

        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = '';

        closeModal();
    };

    // 가져온 Movie API 섞기
    const getRandomMovies = (count) => {
        const shuffled = movieList.sort(() => 0.5 - Math.random());
        const uMovies = new Set();

        while (uMovies.size < count && uMovies.size < shuffled.length) {
            const randomIndex = Math.floor(Math.random() * shuffled.length);
            const movie = shuffled[randomIndex];
            if (!uMovies.has(movie)) {
                uMovies.add(movie);
            }
        }

        return Array.from(uMovies).slice(0, count);
    };

    // 섞은 Movie list 보여주기
    const recommendMovies = () => {
        const randomMovies = getRandomMovies(10);
        return randomMovies.map((movie, idx) => (
            <label key={idx} onClick={() => movieInfoClickHandler(movie)}>
                <div className="modal-item">
                    <img src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    <br />
                    {
                        movie.title
                        ? 
                        <a href="#none" className="modal-title">{movie.title}</a>
                        :
                        <a href="#none" className="modal-title">{movie.name}</a>
                    } 
                </div>
            </label>
        ));
    };
    

    return (
        <div className="modal">
        <div className="modal-content">       
        {selectedMovie ? (
                    <>
                        <img src={`http://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                        {
                            selectedMovie.title
                            ? 
                            <h2>{selectedMovie.title}</h2>
                            :
                            <h2>{selectedMovie.name}</h2>
                        }
                        <p className="m_info">상세정보: {selectedMovie.overview}</p><br />
                        <p className="m_score">평점: {`${Math.round(selectedMovie.vote_average * 100) / 100}점`}</p><br />
                        <p className="m_audi">관객수: {`${Math.floor(selectedMovie.popularity)}만 명`}</p>
                        <img src={process.env.PUBLIC_URL + '/imgs/ytb.png'} className="ytb" onClick={playBtnClickHandler} />
                        <div className='favbtn' onClick={recommendFavBtnClickHandler}>
                            {Array.isArray(myFavs) && myFavs.includes(selectedMovie.id || selectedMovie.name) ? (
                                <img src="/imgs/heart1.png" alt="favMv" />
                            ) : (
                                <img src="/imgs/heart2.png" alt="noFavMv" />
                            )}
                        </div>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                    </>
                ) : (
                    <>
                        <img src={`http://image.tmdb.org/t/p/w200${movieInfo.poster_path}`} alt={movieInfo.title} />
                        <h2>{movieInfo.title}</h2>
                        <p className="m_info">상세정보: {movieInfo.overview}</p><br />
                        <p className="m_score">평점: {`${Math.round(movieInfo.vote_average * 100) / 100}점`}</p><br />
                        <p className="m_audi">관객수: {`${Math.floor(movieInfo.popularity)}만 명`}</p>
                        <img src={process.env.PUBLIC_URL + '/imgs/ytb.png'} className="ytb" onClick={playBtnClickHandler} />
                        <div className='favbtn' onClick={favBtnClickHandler}>
                            {Array.isArray(myFavs) && myFavs.includes(movieInfo.id) ? (
                                <img src="/imgs/heart1.png" alt="favMv" />
                            ) : (
                                <img src="/imgs/heart2.png" alt="noFavMv" />
                            )}
                        </div>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                    </>
                )}
                <div className="modal-list">
                <h2>추천 컨텐츠</h2>
                {recommendMovies()}                
            </div>
            </div>
        </div>
    );
}

export default UserProfileModal;