const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: []
		},
		actions: {
			addFavorite: (tipo, uid, nombre) => {
				const store = getStore();
				let store_ = store.favorites;
				let store_f = store_.filter((e)=>{
					if (e.uid === uid && e.tipo === tipo){
						return e
					}
				});
				if (store_f.length<1){
					store_.push({tipo:tipo, uid:uid, nombre:nombre,favorite:false})
				}
				setStore({favorites:store_})
			},
			changeFavorite:(tipo, uid) =>{
				const store = getStore();

				const favorites = store.favorites.map((elm) => {
					if (elm.uid === uid && elm.tipo === tipo) elm.favorite = !elm.favorite;
					return elm;
				});
				setStore({favorites:favorites});
			}
		}
	};
};

export default getState;
