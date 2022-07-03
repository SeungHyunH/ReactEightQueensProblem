import React from 'react'
import * as util from '../util/solve';
const Board = () => {
  return (
    <>
      <div>Board</div>
      <button onClick={()=>{console.log(util.solve(5).length);}}>TEST</button>
    </>
  )
}

export default Board