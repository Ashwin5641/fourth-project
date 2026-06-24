import { useEffect, useState } from "react";
import './heroForm.css';

import { heroAdd, heroUpdate } from "../api/heroApi";

export default function HeroForm({onSuccess, editHero, setEditHero}) {

    const [form, setForm] = useState({
        title: '',
        subtitle: '',
        image: null,
        button_text: '',
        button_url: ''
    })

    const [fileKey, setFileKey] = useState(Date.now());

    useEffect(() => {
        if (editHero) {
            setForm({
                title: editHero.title,
                subtitle: editHero.subtitle,
                image: null,
                button_text: editHero.button_text,
                button_url: editHero.button_url
            });
        } else {
            setForm({
                title: '',
                subtitle: '',
                image: null,
                button_text: '',
                button_url: ''
            });

            setFileKey(Date.now());
        }
    }, [editHero]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleFileChange = (e) => {
        setForm({
            ...form,
            image: e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', form.title);
        formData.append('subtitle', form.subtitle);
        formData.append('image', form.image);
        formData.append('button_text', form.button_text);
        formData.append('button_url', form.button_url);

        try {
            if (editHero) {
                await heroUpdate(editHero.id, formData);
                setEditHero(null);
            } else {
                await heroAdd(formData);
            }

            setForm({
                title: '',
                subtitle: '',
                image: null,
                button_text: '',
                button_url: ''
            })

            setFileKey(Date.now())

            onSuccess && onSuccess();

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="dash-hero-form-comp">
            <h4>{editHero ? 'EDIT SLIDE' : 'ADD SLIDE'}</h4>
            <form onSubmit={handleSubmit}>
                <input name="title" value={form.title} onChange={handleChange} type="text" placeholder="Title"/><br /><br />
                <input name="subtitle" value={form.subtitle} onChange={handleChange} type="text" placeholder="Subtitle"/><br /><br />
                <input key={fileKey} name="image" type="file" onChange={handleFileChange} /><br /><br />
                <input name="button_text" value={form.button_text} onChange={handleChange} type="text" placeholder="Button Text" /><br /><br />
                <input name="button_url" value={form.button_url} onChange={handleChange} type="text" placeholder="Button URL" /><br /><br />
                <button>{editHero ? 'EDIT' : 'ADD'}</button>
                {editHero && (
                    <button type="button" onClick={() => setEditHero(null)}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    )
}