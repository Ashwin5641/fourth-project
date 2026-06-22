import { useEffect, useState } from "react";
import './heroDashboard.css'

import HeroForm from "../components/HeroForm";

import { getAllHeroes } from "../api/heroApi";

export default function HeroDashboard() {

    const [hero, setHero] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllHeroes();
                if (res.success) {
                    setHero(res.data);
                } else {
                    setHero([]);
                }
            } catch (err) {

            }
        }

        fetchData();
    }, [])

    return (
        <>
            <div className="hero-dash">
                <div className="hero-dash-header">
                    <h4>Hero Management</h4>
                </div>
                <div className="hero-dash-form">
                    <HeroForm />
                </div>
                {hero.map((slide) => (
                    <h3 key={slide.id}>{slide.title}</h3>
                ))}
            </div>
        </>
    )
}