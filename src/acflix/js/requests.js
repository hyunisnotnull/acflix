const requests = {
    fetchNowPlaying: "movie/now_playing",                           // 현재 상영
    fetchNetFlixOriginals: "/discover/tv?with_networks=213",        // 넷플 오리지널
    fetchTrending: "/trending/movie/week",                          // 최신 트랜드
    fetchTopRated: "movie/top_rated",                               // 영화 순위
    fetchTv: "tv/top_rated?language=ko-KR&page=1",                  // TV 상영
    fetchAnimation: "/discover/movie?with_genres=16",               // 애니메이션
    fetchActionMovies: "/discover/movie?with_genres=28",            // 액션 
    fetchComedyMovies: "/discover/movie?with_genres=35",            // 코미디 
    fetchHorrorMovies: "/discover/movie?with_genres=27",            // 공포
    fetchRomanceMovies: "/discover/movie?with_genres=10749",        // 로맨스

    fetchPlay: "movie/movie_id/videos?language=ko-KR",              // 유튜브 스트리밍

    fetchSimilar: "movie/movie_id/similar?language=ko-KR"           // 연관 영화
  };
  
  export default requests;