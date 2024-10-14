// import React, { useReducer, useState } from 'react';
// import { Country, countries as initialCountries } from '@/data/Countries';
// import styles from './List.module.css';

// type Action =
//   | { type: 'LIKE_COUNTRY'; id: number }
//   | { type: 'TOGGLE_SORT_BY_LIKES' }
//   | { type: 'ADD_COUNTRY'; country: Country }
//   | { type: 'DELETE_COUNTRY'; id: number }
//   | { type: 'RESTORE_COUNTRY'; id: number };

// type State = {
//   countries: Country[];
//   sortByLikes: 'asc' | 'desc' | null;
// };

// const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case 'LIKE_COUNTRY':
//       return {
//         ...state,
//         countries: state.countries.map((country) =>
//           country.id === action.id
//             ? { ...country, likes: country.likes + 1 }
//             : country
//         ),
//       };
//     case 'TOGGLE_SORT_BY_LIKES': {
//       let newSortByLikes: 'asc' | 'desc' | null = state.sortByLikes;
//       if (!state.sortByLikes) {
//         newSortByLikes = 'asc';
//       } else if (state.sortByLikes === 'asc') {
//         newSortByLikes = 'desc';
//       } else {
//         newSortByLikes = null;
//       }
//       return { ...state, sortByLikes: newSortByLikes };
//     }
//     case 'ADD_COUNTRY':
//       return {
//         ...state,
//         countries: [...state.countries, action.country],
//       };
//     case 'DELETE_COUNTRY':
//       return {
//         ...state,
//         countries: state.countries.map((country) =>
//           country.id === action.id ? { ...country, isDeleted: true } : country
//         ),
//       };
//     case 'RESTORE_COUNTRY':
//       return {
//         ...state,
//         countries: state.countries.map((country) =>
//           country.id === action.id ? { ...country, isDeleted: false } : country
//         ),
//       };
//     default:
//       return state;
//   }
// };

// const initialState: State = {
//   countries: initialCountries.map((country) => ({ ...country, isDeleted: false })),
//   sortByLikes: null,
// };

// const List: React.FC = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const [newCountry, setNewCountry] = useState({
//     name: '',
//     population: '',
//     capital: '',
//     image: '',
//   });

//   const handleLike = (id: number) => {
//     dispatch({ type: 'LIKE_COUNTRY', id });
//   };

//   const toggleSortByLikes = () => {
//     dispatch({ type: 'TOGGLE_SORT_BY_LIKES' });
//   };

//   const handleAddCountry = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newCountryData: Country = {
//       id: Date.now(),
//       name: newCountry.name,
//       population: Number(newCountry.population),  
//       capital: newCountry.capital,
//       likes: 0,
//       image: newCountry.image,
//       isDeleted: false,
//     };
//     dispatch({ type: 'ADD_COUNTRY', country: newCountryData });
//     setNewCountry({ name: '', population: '', capital: '', image: '' });
//   };
  

//   const handleDeleteCountry = (id: number) => {
//     dispatch({ type: 'DELETE_COUNTRY', id });
//   };

//   const handleRestoreCountry = (id: number) => {
//     dispatch({ type: 'RESTORE_COUNTRY', id });
//   };

//   let sortedCountries = state.countries;
//   if (state.sortByLikes === 'asc') {
//     sortedCountries = [...state.countries].sort((a, b) => a.likes - b.likes);
//   } else if (state.sortByLikes === 'desc') {
//     sortedCountries = [...state.countries].sort((a, b) => b.likes - a.likes);
//   }

//   sortedCountries = sortedCountries.sort((a, b) => (a.isDeleted === b.isDeleted ? 0 : a.isDeleted ? 1 : -1));

//   return (
//     <div className={styles.container}>
//       <h1>Countries List</h1>
//       <form onSubmit={handleAddCountry} className={styles.addForm}>
//   <input
//     type="text"
//     placeholder="Country Name"
//     value={newCountry.name}
//     onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
//     required
//   />
//   <input
//     type="number"  
//     placeholder="Population"
//     value={newCountry.population}
//     onChange={(e) => setNewCountry({ ...newCountry, population: e.target.value })}
//     required
//   />
//   <input
//     type="text"
//     placeholder="Capital"
//     value={newCountry.capital}
//     onChange={(e) => setNewCountry({ ...newCountry, capital: e.target.value })}
//     required
//   />
//   <input
//     type="text"
//     placeholder="Image URL"
//     value={newCountry.image}
//     onChange={(e) => setNewCountry({ ...newCountry, image: e.target.value })}
//     required
//   />
//   <button type="submit">Add Country</button>
// </form>


//       <button onClick={toggleSortByLikes} className={styles.sortButton}>
//         {state.sortByLikes === 'asc' && 'Sort by Likes (Descending)'}
//         {state.sortByLikes === 'desc' && 'Clear Sort'}
//         {!state.sortByLikes && 'Sort by Likes (Ascending)'}
//       </button>
  
//       <div className={styles.countriesGrid}>
//         {sortedCountries.map((country) => (
//           <div
//             key={country.id}
//             className={styles.countryCard}
//             style={{
//               opacity: country.isDeleted ? 0.5 : 1,
//               order: country.isDeleted ? 1 : 0, 
//             }}
//           >
//             <img src={country.image} alt={country.name} className={styles.countryImage} />
//             <h2>{country.name}</h2>
//             <p>Population: {country.population}</p>
//             <p>Capital: {country.capital}</p>
//             <button onClick={() => handleLike(country.id)} className={styles.likeButton}>
//               Like ({country.likes})
//             </button>
//             {!country.isDeleted ? (
//               <button onClick={() => handleDeleteCountry(country.id)} className={styles.deleteButton}>
//                 Delete
//               </button>
//             ) : (
//               <button onClick={() => handleRestoreCountry(country.id)} className={styles.restoreButton}>
//                 Restore
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );  
// };

// export default List;
