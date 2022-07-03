export function solve(BOARD_SIZE,stack){
    let stackPath = [[...stack.at(-1),'Push']];
    while(stack.length < BOARD_SIZE){
        let isBacktracking = true;
        let i = 0;
        for(; i < BOARD_SIZE; i++){
            let isNext = true;
            for(let j = 0; j < stack.length; j++){
                if(stack[j][1]===i){isNext=false; break;}//직선
                if(Math.abs(stack[j][0]-stack.length)===Math.abs(stack[j][1]-i)){isNext=false; break;}//대각선
            }
            if(isNext){isBacktracking=false; break;}
        }
        if(isBacktracking){
            let result = Backtracking(stack,stackPath,BOARD_SIZE);
            if(result === -1){
                return -1;
            }else{
                stack = [...result[0]];
                stackPath = [...result[1]];
            }
        }else{
            stack.push([stack.length,i]);
            stackPath.push([...stack.at(-1),'Push']);
        }
    }
    return [stack,stackPath];
}

function Backtracking(stack,stackPath,BOARD_SIZE){
    let before = stack.pop();
    stackPath.push([...before,'Pop']);
    for(let i = before[1]+1; i < BOARD_SIZE; i++){
        let isNext = true;
        for(let j = 0; j < stack.length; j++){
            if(stack[j][1]===i){isNext=false; break;}//직선
            if(Math.abs(stack[j][0]-stack.length)===Math.abs(stack[j][1]-i)){isNext=false; break;}//대각선
        }
        if(isNext){
            stack.push([before[0],i]);
            stackPath.push([before[0],i,'Push']);
            return [stack,stackPath];
        }
    }
    if(stack.length===0){return -1;}
    return Backtracking(stack,stackPath,BOARD_SIZE);
}