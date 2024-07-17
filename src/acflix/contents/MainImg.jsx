import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const MainImg = () => {
    // Hook

    const [modalOpen, setModalOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        fade:true,
        pauseOnHover :false,
    };

    // Handler

    const playMainImg = (url) => {
        setVideoUrl(url);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setVideoUrl("");
    };

    // ↓↓↓ 이런식으로 메인 이미지에 맞는 영화 URL 삽입해서 모달창으로 재생하게끔 할수있음 ↓↓↓
    // The 8 쇼
    // <img className="logo1" src={process.env.PUBLIC_URL + '/imgs/main1_logo.png'} alt="main1" onClick={() => playMainImg("https://www.youtube.com/embed/CWfWMxDqbN0?si=rgHmbQqoUNPY0RzS")} />
    // 서울의 봄
    // <img className="logo2" src={process.env.PUBLIC_URL + '/imgs/main2_logo.png'} alt="main2" onClick={() => playMainImg("https://www.youtube.com/embed/-AZ7cnwn2YI?si=_V31nZuLpAPN_WLh")}/>

    return (
        <>
            <Slider {...settings} className="mainimg">
                <div className="main1">
                    <a href="#none">
                        <img className="img1" src={process.env.PUBLIC_URL + '/imgs/main1.jpg'} alt="main1" 
                        onClick={() => playMainImg("https://www.youtube.com/embed/CWfWMxDqbN0?si=rgHmbQqoUNPY0RzS")}/>
                        <img className="logo1" src={process.env.PUBLIC_URL + '/imgs/main1_logo.png'} alt="main1" />
                    </a>
                </div>
                <div className="main2">
                    <a href="#none">
                        <img className="img2" src={process.env.PUBLIC_URL + '/imgs/main2.jpg'} alt="main2" 
                        onClick={() => playMainImg("https://www.youtube.com/embed/-AZ7cnwn2YI?si=_V31nZuLpAPN_WLh")}/>
                        <img className="logo2" src={process.env.PUBLIC_URL + '/imgs/main2_logo.png'} alt="main2" />
                    </a>
                </div>
            </Slider>

            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                    <p className="m_close" onClick={handleCloseModal}>X</p>
                        <iframe
                            width="900"
                            height="600"
                            src={videoUrl}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            title="video"
                        ></iframe>                        
                    </div>
                </div>
            )}
        </>
    );
}

export default MainImg;
