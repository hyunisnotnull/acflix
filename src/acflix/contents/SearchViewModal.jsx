import React, { useEffect, useState } from "react";
import api from '../js/api.js';
import { getMyFavDB, setMyFavDB } from '../js/db.js';
import { getLoginedSessionID } from '../js/session.js';

const SearchViewModal = ( { movieInfo, closeModal } ) => {
    
    // Hook
    const [play, setPlay] = useState(null);
    const [myFavs, setMyFavs] = useState([]);

    useEffect(() => {

        fetchPlay(movieInfo.id);

        setMyFavs(getMyFavDB(getLoginedSessionID()));

    }, [movieInfo.id]);


    // GET Movie Streaming API 
    const fetchPlay = async (movieId) => {
        try {
            const response = await api.get(`/movie/${movieId}/videos`);
            const videos = response.data.results;
            
            if (videos.length > 0) {
                setPlay(videos[0].key);
            }
        } catch (error) {
            console.log('Error fetching video data:', error);
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
    }

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

    const onErrorImg = (e) => {
        e.target.onerror = null;
        e.target.src="https://via.placeholder.com/300?text=none";
      }

    
    // Function
    const handleCloseModal = () => {

        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = '';

        closeModal();
    };
    
    return(
        <div className="modal">
            <div className="modal-content">       
            <img src={`http://image.tmdb.org/t/p/w200${movieInfo.poster_path}`} alt={movieInfo.title} onError={onErrorImg}/>
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
            <span className="close" onClick={closeModal}>&times;</span>
            
        </div>
    </div>
    );
}

export default SearchViewModal;