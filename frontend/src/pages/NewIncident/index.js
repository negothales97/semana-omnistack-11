import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
 
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './style.css';

export default function NewIncident() {
    const id = localStorage.getItem('ongId');
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleCreate(e) {
        e.preventDefault();

        const data = {
            description,
            title,
            value
        }
        
        try {
        await api.post('incidents', data, {
            headers: {
            Authorization: id
            }
        });

        history.push('/profile');
        } catch ( error ) {
        alert('Erro ao cadastrar caso');
        };
    }; 

    return (
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be the Hero' />
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolver
                        isso.
                    </p>
                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleCreate}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Titulo do Caso'
                    />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Descrição'
                    />
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Valor em Reais'
                    />

                    <button className='button' type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
};