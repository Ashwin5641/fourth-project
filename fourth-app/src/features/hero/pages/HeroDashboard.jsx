import { useEffect, useState } from "react";
import './heroDashboard.css'

import HeroForm from "../components/HeroForm";

import { getAllHeroes, heroDelete } from "../api/heroApi";

export default function HeroDashboard() {

    const [hero, setHero] = useState([]);
    const [editHero, setEditHero] = useState(null);

    const fetchHeroes = async () => {
        try {
            const res = await getAllHeroes();
            setHero(res?.data || [])
        } catch (err) {
            console.log(err);
            setHero([])
        }
    }

    useEffect(() => {
        fetchHeroes();
    }, [])


    const onDeleteHero = async (id) => {
        try {
            await heroDelete(id);
            fetchHeroes();
        } catch (err) {
            console.error(err);
        }
    }

    const onEditHero = async (hero) => {
        setEditHero(hero)
    }

    return (
        <>
            <div className="hero-dash">
                <div className="hero-dash-header">
                    <h4>Hero Management</h4>
                </div>
                <div className="hero-dash-form">
                    <HeroForm onSuccess={fetchHeroes} editHero={editHero} setEditHero={setEditHero} />
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
                                <th>Action</th>
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
                                    <td>
                                        <button onClick={() => onEditHero(slide)}>Edit</button>
                                        <button onClick={() => onDeleteHero(slide.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}