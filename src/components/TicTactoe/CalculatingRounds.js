import React from 'react'
import Title from './Title'

function CalculatingRounds({ Rounds, roundCount, progress }) {
  return (
    <>
      <h1 className='roundtitle'>
        
        {`Round ${roundCount}`}
        
        <span style={{color:progress=="Not Started"?"red":"green"}}>{progress}</span>
      </h1>
      <div className='RoundsCalculating'>

        <div className='roundcardparent'>

          {Rounds.length==0?<div className='roundimgdiv'><img className='roundimg'  src='https://media4.giphy.com/media/BwxFdYKFvhGQ7CEY03/giphy.gif?cid=ecf05e478q22to7wniegbccsug6m34i7aot4z3sp3b7hicxd&ep=v1_gifs_related&rid=giphy.gif&ct=s'/></div>:Rounds?.map((item) => {
            return <div className="Roundcard" key={item.round}>
              <p>{`${item.round} ->`}</p>
              <p>{item.status}</p>
            </div>
          })}
        </div>
      </div>
    </>

  )
}

export default CalculatingRounds