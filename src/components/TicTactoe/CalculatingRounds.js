import React from 'react'

function CalculatingRounds({Rounds,roundCount,progress}) {
  return (
    <div className='RoundsCalculating'>
      <h4>
    

       {`Round ${roundCount} - ${progress}`}
      </h4>
      {Rounds?.map((item)=>{
        return <div key={item.round}>
            <p>{item.round}</p>
            <p>{item.status}</p>
        </div>
      })}
    </div>
  )
}

export default CalculatingRounds