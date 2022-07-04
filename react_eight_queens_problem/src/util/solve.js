export function solve(BOARD_SIZE,stackList,pathList){
  let path = [[1,1,'PUSH']];

  const DFS = (BOARD_SIZE,stack,row) => {
    if(BOARD_SIZE === row){
      stackList.push([...stack]);
      pathList.push([...path]);
      return true;
    }
    else{
      for(let i = 1; i <= BOARD_SIZE; i++){
        stack[row+1]=i;
        if(isValid(stack,row+1)){
          path.push([row+1,i,'PUSH']);
          DFS(BOARD_SIZE,stack,row+1);
          path.push([row+1,i,'POP']);
        }else{
          if(i === BOARD_SIZE){return false;}
        }
      }
      return true;
    }
  }

  const isValid = (stack,row) =>{
    for(let i = 1; i < row; i++) {
      if(stack[i] === stack[row]) return false;
      if(Math.abs(i-row) === Math.abs(stack[i] - stack[row])) return false;
    }
    return true;
  }

  for(let i = 1; i <= BOARD_SIZE; i++){
    const stack = Array(BOARD_SIZE+1).fill(0);
    stack[1]=i;
    const result = DFS(BOARD_SIZE,stack,1);
    if(!result){
      path.push([1,stack[1],'POP']);
      path.push([1,i+1,'PUSH']);
    }else{
      path = [[1,i+1,'PUSH']];
    }
  }
}