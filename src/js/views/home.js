import React from "react";
import { useState, useEffect, useContext } from "react";
import CardPeople from "../component/cardPeople";
import CardPlanets from "../component/cardPlanets";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [people, setPeople] = useState([]);
	const [planets, setPlanets] = useState([]);

	async function fetchPeople(){
		const response = await fetch("https://www.swapi.tech/api/people/")
		let data = await response.json();
		return data.results;
	}

	async function fetchPlanets(){
		const response = await fetch("https://www.swapi.tech/api/planets/")
		let data = await response.json();
		return data.results;
	}


	useEffect(()=>{
		async function updateData(){
			let peopleData = await fetchPeople();
			let planetsData = await fetchPlanets();

			setPeople(peopleData);
			setPlanets(planetsData);
			peopleData.forEach((e) =>{actions.addFavorite('people', e.uid, e.name)})
			planetsData.forEach((e) =>{actions.addFavorite('planets', e.uid, e.name)})
		};
		
		updateData();
	},[])

	return (
		<div className="container-fluid">
			<div className="display-4 text-danger p-1">
				Characters
			</div>
			<div className="horizontal-scrollable">
				<div className="row">
					{ people.map((e)=> {return <CardPeople tipo="people" name={e.name} url={e.url} key={e.uid} uid={e.uid} />}) }
				</div>
			</div>
			<div className="display-4 text-danger p-1">
				Planets
			</div>
			<div className="horizontal-scrollable">
				<div className="row">
					{ planets.map((e)=> {return <CardPlanets tipo="planets" name={e.name} url={e.url} key={e.uid} uid={e.uid} />}) }
				</div>
			</div>
		</div>
		)

};
