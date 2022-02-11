import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const CardPlanets = (props) => {
	const { store, actions } = useContext(Context);
    const [data, setData] = useState({});
    const [favorite, setFavorite] = useState(false);

	async function fetchData(){
		const response = await fetch(props.url)
		let data = await response.json();
        return data.result.properties
	}
    const updateFavorite = (tipo, uid) => {
        actions.changeFavorite(tipo, uid);
        setFavorite ((prevState) => {return !prevState })
    }
	const dataStore = store.favorites.filter((e) =>{
		if (e.uid === props.uid && e.tipo === props.tipo) return e
	})

    if (dataStore.length > 0){
        if (dataStore[0].favorite != favorite){
            setFavorite(dataStore[0].favorite);
        }
    }

	useEffect(()=>{
		async function updateData(){
			let data = await fetchData();
			setData(data);

		}
		updateData();
	},[])

    return (
        <div className='col-2 m-1'>
            <div className="card">
                <img
                        src="https://via.placeholder.com/400x200"
                        className="card-img-top"
                        alt="photo"
                    />
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">Population: {data.population}</p>
                    <p className="card-text">Terrain: {data.terrain}</p>
                    <div className="row">
                                <div className="col-3">
                                    <Link to={`/singlePlanet/${props.tipo}/${props.uid}`}><div className="btn btn-outline-primary">Learn more!</div></Link>
                                </div>
                                <div className="col-1 offset-6" onClick={() => updateFavorite(props.tipo, props.uid)}>
                                    { favorite?<button type="button" className="btn btn-outline-warning"><i className="fa fa-heart" /></button>:<button type="button" className="btn btn-outline-warning"><i className="far fa-heart" /></button> }
                                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardPlanets;