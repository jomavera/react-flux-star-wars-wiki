import React from "react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swImage from "../../img/sw_logo.png";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [favorite, setFavorite] = useState([]);


	const favorites = store.favorites.filter((e) =>{
		if (e.favorite) return e
	})

    const updateFavorite = (tipo, uid) => {
        actions.changeFavorite(tipo, uid);
		let favorites = store.favorites.filter((e) =>{
			if (e.favorite) return e
		})
        setFavorite(favorites);
    }

	return (
		<nav className="navbar navbar-light bg-light mb-3 ps-3 pe-5">
			<Link to="/">
				<div className="navbar-brand" >
					<img src={swImage} alt="star wars logo" width="80px"/>
				</div>
			</Link>
			<div className="ml-auto">
				<div className="dropdown">
				<button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites <span className="badge bg-secondary">{favorites.length}</span>
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					{favorites.map((e)=>{
						return (
						<li key={e.uid +"-"+ e.tipo}>
							<div className="dropdown-item" >{e.nombre}</div>
							<button type="button" className="btn btn btn-light" onClick={()=>{updateFavorite(e.tipo, e.uid)}}><i className="fa fa-trash" /></button>
						</li>
						)
					})}
				</ul>
				</div>
			</div>
		</nav>
	);
};
