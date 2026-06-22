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
                <div className="hero-dash-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Subtitle</th>
                                <th>Image</th>
                                <th>Button Text</th>
                                <th>Button URL</th>
                            </tr>
                        </thead>

                        <tbody>
                            {hero.map((slide) => (
                                <tr key={slide.id}>
                                    <td>{slide.title}</td>
                                    <td>{slide.subtitle}</td>
                                    <td>{slide.image}</td>
                                    <td>{slide.button_text}</td>
                                    <td>{slide.button_url}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}