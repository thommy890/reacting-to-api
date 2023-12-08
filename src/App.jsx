import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [showFilms, setShowFilms] = useState(false);
    const [showPeople, setShowPeople] = useState(false);
    const [films, setFilms] = useState([]);
    const [people, setPeople] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDirector, setSelectedDirector] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedGender, setSelectedGender] = useState('All');
    const [selectedAge, setSelectedAge] = useState('All');

    useEffect(() => {
        if (showFilms) {
            fetch('http://api-ghibli.herokuapp.com/films')
                .then(response => response.json())
                .then(data => setFilms(data))
                .catch(error => console.error('Error fetching data:', error));
        } else if (showPeople) {
            fetch('http://api-ghibli.herokuapp.com/people')
                .then(response => response.json())
                .then(data => setPeople(data))
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [showFilms, showPeople]);

    const handleLoadFilmsClick = () => {
        setShowFilms(true);
        setShowPeople(false);
    };

    const handleLoadPeopleClick = () => {
        setShowPeople(true);
        setShowFilms(false);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredFilms = films
        .filter(film => selectedDirector === 'All' || film.director === selectedDirector)
        .filter(film => selectedYear === 'All' || film.release_date === selectedYear)
        .filter(film => film.title.toLowerCase().includes(searchQuery));

    const filteredPeople = people
        .filter(person => selectedGender === 'All' || person.gender === selectedGender)
        .filter(person => selectedAge === 'All' || person.age === selectedAge)
        .filter(person => person.name.toLowerCase().includes(searchQuery));

    return (
        <div className="App container mt-5">
            <header className="mb-4">
                <h1>Welcome to the Studio Ghibli Film Archive</h1>
            </header>
            <div className="mb-3">
                <button className="btn btn-primary mr-2" onClick={handleLoadFilmsClick}>Load Films</button>
                <button className="btn btn-secondary" onClick={handleLoadPeopleClick}>Load People</button>
                
                {/* Dropdown Filters */}
                <div className="filters row mt-3">
                    <div className="col-md-3">
                        <select className="form-control" value={selectedDirector} onChange={e => setSelectedDirector(e.target.value)}>
                            <option value="All">All Directors</option>
                            {[...new Set(films.map(film => film.director))].map(director => (
                                <option key={director} value={director}>{director}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-control" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                            <option value="All">All Years</option>
                            {[...new Set(films.map(film => film.release_date))].map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-control" value={selectedGender} onChange={e => setSelectedGender(e.target.value)}>
                            <option value="All">All Genders</option>
                            {[...new Set(people.map(person => person.gender))].map(gender => (
                                <option key={gender} value={gender}>{gender}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-control" value={selectedAge} onChange={e => setSelectedAge(e.target.value)}>
                            <option value="All">All Ages</option>
                            {[...new Set(people.map(person => person.age))].map(age => (
                                <option key={age} value={age}>{age}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="search-bar mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            {showFilms && (
                <div className="row">
                    {filteredFilms.map(film => (
                        <div key={film.id} className="col-md-4 mb-3">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title">{film.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Director: {film.director}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Release Date: {film.release_date}</h6>
                                    <p className="card-text">{film.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showPeople && (
                <div className="row">
                    {filteredPeople.map(person => (
                        <div key={person.id} className="col-md-4 mb-3">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title">{person.name}</h5>
                                    <p className="card-text">Gender: {person.gender}</p>
                                    <p className="card-text">Age: {person.age}</p>
                                    <p className="card-text">Eye Color: {person.eye_color}</p>
                                    <p className="card-text">Hair Color: {person.hair_color}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
