import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import './styles.css';
import camera from '../../assets/camera.svg';

const NewSpot = ({history}) => {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
   
    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },[thumbnail]);

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('techs', techs);
        data.append('price', price);
        data.append('company', company);

        const user = localStorage.getItem('user');

        await api.post('/spots', data, {headers:{user}});

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{backgroundImage:`url(${preview})`}}
                className={thumbnail  ? 'has-thumbnail':''}
            >
                <input type="file"
                    onChange={(event) => setThumbnail(event.target.files[0])}
                />
                <img src={camera} alt="Novo arquivo"/>
            </label>
            
            <label htmlFor="company">Empresa *</label>
            <input type="text"
                id="company"
                placeholder="Nome da empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="company">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input type="text"
                id="techs"
                placeholder="Tecnologias utilizadas"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />      

            <label htmlFor="price">TECNOLOGIAS * <span>(em branco apra GRATUÍTO)</span></label>
            <input type="text"
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />  

            <button type="submit" className="btn">Cadastrar</button> 
        </form>
    )
}

export default NewSpot;