import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	
	const [data, setData] = useState({});
	const { store, actions } = useContext(Context);
	const params = useParams();

	async function fetchData(){
		const response = await fetch(`https://www.swapi.tech/api/${params.tipo}/${params.theid}`)
		let data = await response.json();
        return data.result.properties
	}
	useEffect(()=>{
		async function updateData(){
			let data = await fetchData();
			console.log(data);
			setData(data);

		}
		updateData();
	},[])

	return (
		<div className="container">
			<div className="row">
				<div className="col-6">
				<img
                    src="https://via.placeholder.com/800x400"
                    className="card-img-top"
                    alt="photo"
                />
				</div>
				<div className="col-6">
					<div className="row">
						<div className="col">
							<div className="text-center display-5">
								{data.name}
							</div>
						</div>
					</div>
					<div className="row">
						<p className="lead">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu enim eu justo dictum commodo sit 
						amet ac arcu. Phasellus consequat tempus tortor sit amet imperdiet. Phasellus quam turpis, 
						tristique dapibus dolor ac, euismod vulputate felis. Sed venenatis magna sit amet fermentum porttitor.
						 Pellentesque sollicitudin lorem posuere eros placerat, vitae mattis sapien feugiat. Class aptent taciti 
						 sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut eros nibh, condimentum 
						 non sapien at, ullamcorper fermentum tortor. Proin eu luctus mauris. Vivamus condimentum et quam 
						 a rhoncus. Proin tortor arcu, malesuada id risus nec, egestas finibus tellus. Cras at accumsan justo. 
						 Integer vel quam et nisi convallis pretium. Nullam malesuada vitae elit nec lobortis. Etiam nec 
						 risus quis felis pretium feugiat vel eu metus. 
						</p>
						<br className="text-warning text-opacity-75"/>
					</div>
				</div>
			</div>
			<div className="row">
			<hr className="text-danger text-opacity-75"/>
			</div>
			<div className="row text-danger">
				<div className="col">
					<p>Name</p>
					<p className="fw-lighter">{data.name}</p>
				</div>
				<div className="col">
					<p>Birth Year</p>
					<p className="fw-lighter">{data.birth_year}</p>
				</div>
				<div className="col">
					<p>Gender</p>
					<p className="fw-lighter">{data.gender}</p>
				</div>
				<div className="col">
					<p>Height</p>
					<p className="fw-lighter">{data.height}</p>
				</div>
				<div className="col">
					<p>Eye color</p>
					<p className="fw-lighter">{data.eye_color}</p>
				</div>
				<div className="col">
					<p>Skin Color</p>
					<p className="fw-lighter">{data.skin_color}</p>
				</div>
			</div>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
