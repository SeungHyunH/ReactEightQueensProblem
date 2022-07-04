import React, { useEffect, useState,useRef } from 'react'
import styled from 'styled-components';
import * as util from '../util/solve';

const Board = () => {
  const [solutionList,setSolutionList] = useState([]);
  const [boardSize,setBoardSize] = useState(5);
  const [pathList,setPathList]=useState([]);
  const [currentIndex,setCurrentIndex] = useState(0);
  const time = useRef({start: 0, elapsed: 0});
  const moveStop = useRef(false);
  const canvas = useRef();
  const BLOCK_SIZE = useRef(0);
  const pathIndex = useRef(0);
  const queen = useRef(new Image());
  const pathArea = useRef(null);
  useEffect(()=>{
    const solution = [];
    const path = [];
    BLOCK_SIZE.current = Math.floor((document.documentElement.clientWidth/3)/boardSize);
    util.solve(boardSize,solution,path);
    setSolutionList([...solution]);
    setPathList([...path]);

    let result = '';
    for(let i = pathIndex.current; i < path[currentIndex].length; i++){
      result+=`[${path[currentIndex][i][0]},${path[currentIndex][i][1]}] PUSH\n`
    }
    pathArea.current.value = result;
    

    const ctx = canvas.current.getContext("2d");
    ctx.canvas.width = BLOCK_SIZE.current*boardSize;
    ctx.canvas.height = BLOCK_SIZE.current*boardSize;
    ctx.lineWidth=1;
    ctx.strokeStyle='#000000';
    ctx.fillStyle='#FFFFFF';
    queen.current.src = '/image/queen.png';
    queen.current.onload = ()=>{
      for(let i = 0; i < boardSize ; i++){
        for(let j = 0; j < boardSize; j++){
          ctx.fillRect(i*BLOCK_SIZE.current+1,j*BLOCK_SIZE.current+1,BLOCK_SIZE.current-2,BLOCK_SIZE.current-2);
          ctx.strokeRect(i*BLOCK_SIZE.current+0.5,j*BLOCK_SIZE.current+0.5,BLOCK_SIZE.current-1,BLOCK_SIZE.current-1);
        }
      }
      for(let i = 0; i < boardSize; i++){
        ctx.drawImage(queen.current,(solution[currentIndex][i+1]-1)*BLOCK_SIZE.current,i*BLOCK_SIZE.current,BLOCK_SIZE.current,BLOCK_SIZE.current);
      }
    }
  },[])

  useEffect(()=>{
    if(solutionList.length<1){return;}
    pathArea.current.value = GetPath();
    const ctx = canvas.current.getContext("2d");
    ctx.strokeStyle='#000000';
    ctx.fillStyle='#FFFFFF';
    queen.current.onload = ()=>{
      for(let i = 0; i < boardSize ; i++){
        for(let j = 0; j < boardSize; j++){
          ctx.fillRect(i*BLOCK_SIZE.current+1,j*BLOCK_SIZE.current+1,BLOCK_SIZE.current-2,BLOCK_SIZE.current-2);
          ctx.strokeRect(i*BLOCK_SIZE.current+0.5,j*BLOCK_SIZE.current+0.5,BLOCK_SIZE.current-1,BLOCK_SIZE.current-1);
        }
      }
      for(let i = 0; i < boardSize; i++){ctx.drawImage(queen.current,(solutionList[currentIndex][i+1]-1)*BLOCK_SIZE.current,i*BLOCK_SIZE.current,BLOCK_SIZE.current,BLOCK_SIZE.current);}
    }
  },[currentIndex])

  const RenderSolution = ()=>{
    const result = [];
    if(solutionList.length < 1){return;}
    for(let i = 1; i < solutionList[currentIndex].length; i++){
      result.push(<Solution key={i}>{solutionList[currentIndex][i]}</Solution>);
    }
    return result;
  }

  const DrawPath = ()=>{
    const ctx = canvas.current.getContext("2d");
    for(let i = 0; i < boardSize ; i++){
      for(let j = 0; j < boardSize; j++){
        ctx.fillRect(i*BLOCK_SIZE.current+1,j*BLOCK_SIZE.current+1,BLOCK_SIZE.current-2,BLOCK_SIZE.current-2);
        ctx.strokeRect(i*BLOCK_SIZE.current+0.5,j*BLOCK_SIZE.current+0.5,BLOCK_SIZE.current-1,BLOCK_SIZE.current-1);
      }
    }
    animate();
  }

  const animate = (now = 0)=>{
    if(moveStop.current){return;}
    // 지난 시간을 업데이트한다.
    time.current.elapsed = now - time.current.start;
    // 지난 시간이 현재 레벨의 시간을 초과했는지 확인한다.
    if (time.current.elapsed > 1000) {
      // 현재 시간을 다시 측정한다.
      time.current.start = now;
      
      if(pathIndex.current >= pathList[currentIndex].length){moveStop.current=true;}
      const ctx = canvas.current.getContext("2d");
      if(pathList[currentIndex][pathIndex.current][2]==='PUSH'){
        ctx.drawImage(queen.current,(pathList[currentIndex][pathIndex.current][1]-1)*BLOCK_SIZE.current,(pathList[currentIndex][pathIndex.current][0]-1)*BLOCK_SIZE.current,BLOCK_SIZE.current,BLOCK_SIZE.current);
      }else{
        ctx.fillRect((pathList[currentIndex][pathIndex.current][1]-1)*BLOCK_SIZE.current+1,(pathList[currentIndex][pathIndex.current][0]-1)*BLOCK_SIZE.current+1,BLOCK_SIZE.current-2,BLOCK_SIZE.current-2);
      }
      pathIndex.current +=1;
      pathArea.current.value = GetPath();
      if(pathIndex.current >= pathList[currentIndex].length){
        moveStop.current=true;
        pathIndex.current = 0;
        pathArea.current.value = GetPath();
      }
    }
    requestAnimationFrame(animate);
  }
  
  const GetPath = ()=>{
    if(pathList.length<1 || pathIndex.current >= pathList[currentIndex].length){return '';}
    let result = '';
    for(let i = pathIndex.current; i < pathList[currentIndex].length; i++){
      result+=`[${pathList[currentIndex][i][0]},${pathList[currentIndex][i][1]}] ${pathList[currentIndex][i][2]}\n`
    }
    return result;
  }

  return (
    <Wrap>
      <SolutionContainer>
        <ArrowLeft currentIndex={currentIndex} onClick={()=>{
          if(currentIndex !== 0){
            setCurrentIndex(currentIndex-1);
          }
        }}/>
        {RenderSolution()}
        <ArrowRight currentIndex={currentIndex} solutionLength = {solutionList.length-1} onClick={()=>{
          if(currentIndex !== solutionList.length-1){
            setCurrentIndex(currentIndex+1);
          }
        }}/>
      </SolutionContainer>
      <MainContainer>
        <ButtonContainer>
          <Button onClick={DrawPath}>경로추적</Button>
          <Button onClick={()=>{moveStop.current=true;}}>경로추적</Button>
        </ButtonContainer>
        <canvas ref={canvas} style={{backgroundColor:'#d3d3d3'}}/>
        <ButtonContainer>
          <PathArea ref={pathArea} disabled/>
        </ButtonContainer>
      </MainContainer>
    </Wrap>
  )
}

const Wrap = styled.div`
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
`

const SolutionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction : row;
  justify-content: space-between;
`

const ButtonContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PathArea = styled.textarea`
  width: 50%;
  height: 100%;
  font-size: 2rem;
  text-align: center;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`

const Button = styled.button`
  width: 10rem;
  height: 1rem;
`

const Solution = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border: 1px solid #000000;
  text-align: center;
  line-height: 4.5rem;
  font-size: 3.5rem;
`

const ArrowLeft = styled.div`
  width: 0;
  height: 0;
  border-top:2rem solid transparent;
  border-bottom:2rem solid transparent;
  border-right: ${props => props.currentIndex === 0 ? '3rem solid transparent' : '3rem solid #000000'};
  margin-right: 1rem;
`

const ArrowRight = styled.div`
  width: 0;
  height: 0;
  border-top:2rem solid transparent;
  border-bottom:2rem solid transparent;
  border-left: ${props => props.currentIndex === props.solutionLength ? '3rem solid transparent':'3rem solid #000000'};
  margin-left: 1rem;
`

export default Board