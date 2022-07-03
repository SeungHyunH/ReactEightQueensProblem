import React from 'react'
import * as util from '../util/solve';
const Board = () => {
  return (
    <>
      <div>Board</div>
      <button onClick={()=>{
        const BoardSize = 5;
        let result = util.solve(BoardSize,[[0,0]]);
        let count = 1;
        while(result[0][0][1]+1 < BoardSize){
          result = util.solve(BoardSize,[[0,result[0][0][1]+1]]);
          if(result === -1){break;}
          count+=1;
        }
        console.log(count);
      }}>TEST</button>
    </>
  )
}

export default Board