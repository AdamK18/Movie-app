import React from 'react'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

function Card({movie} : any) {
    return (
        <div >
            <div className="grid__title">
                <h3>{movie.name}</h3>
            </div>
            {movie.img === null ? ( 
            <div>
                <p>No image found</p>
                <SentimentVeryDissatisfiedIcon></SentimentVeryDissatisfiedIcon> 
            </div>
            ) : (
            <img className="grid__img" src={movie.img.url} alt={movie.name}/>
            )}
        </div>
    )
}

export default Card
