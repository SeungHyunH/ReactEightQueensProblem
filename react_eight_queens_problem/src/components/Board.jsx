import React from 'react'
import * as util from '../util/solve';
const Board = () => {
  return (
    <>
      <div>Board</div>
      <button onClick={()=>util.solve(5)}>TEST</button>
    </>
  )
}

export default Board