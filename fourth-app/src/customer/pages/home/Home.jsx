import { useEffect, useState } from "react";
import './home.css'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';

import { getAllHeroes } from "../../api/cstmrHeroApi";

export default function Home() {

    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        fetchAllHeroes();
    }, [])

    const fetchAllHeroes = async () => {
        try {
            const res = await getAllHeroes();
            console.log(res.data)
            setHeroes(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="cstmr-hmePge">
            <div className="cstmr-hmePge-hero-section">
                <Swiper 
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    navigation={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    effect="fade"
                    loop={true}
                    className="cstmr-hmePge-swiper"
                >
                    {heroes.map((hero) => (
                        <SwiperSlide key={hero.id}>
                            <div className="cstmr-hmePge-swiper-slide">
                                <img src={`http://localhost:3000/uploads/${hero.image}`} alt="" />
                                <div className="cstmr-hmePge-swiper-content">
                                    <h1>{hero.title}</h1>
                                    <p>{hero.subtitle}</p>
                                    <button>{hero.button_text}</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}