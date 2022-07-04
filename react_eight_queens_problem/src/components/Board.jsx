import React, { useEffect, useState,useRef } from 'react'
import styled from 'styled-components';
import * as util from '../util/solve';

const Board = () => {
  const [solutionList,setSolutionList] = useState([]);
  const [boardSize,setBoardSize] = useState(5);
  const [pathList,setPathList]=useState([]);
  const [currentIndex,setCurrentIndex] = useState(0);
  const canvas = useRef();
  const BLOCK_SIZE = useRef(0);
  
  useEffect(()=>{
    const solution = [];
    const path = [];
    BLOCK_SIZE.current = Math.floor((document.documentElement.clientWidth/3)/boardSize);
    util.solve(boardSize,solution,path);
    setSolutionList([...solution]);
    setPathList([...path]);
    const ctx = canvas.current.getContext("2d");
    ctx.canvas.width = BLOCK_SIZE.current*boardSize;
    ctx.canvas.height = BLOCK_SIZE.current*boardSize;
    ctx.lineWidth=1;
    ctx.strokeStyle='#000000';
    ctx.fillStyle='#FFFFFF';
    const queen = new Image();
    queen.src = '/image/queen.png';
    queen.onload = ()=>{
      for(let i = 0; i < boardSize ; i++){
        for(let j = 0; j < boardSize; j++){
          ctx.fillRect(i*BLOCK_SIZE.current+1,j*BLOCK_SIZE.current+1,BLOCK_SIZE.current-2,BLOCK_SIZE.current-2);
          ctx.strokeRect(i*BLOCK_SIZE.current+0.5,j*BLOCK_SIZE.current+0.5,BLOCK_SIZE.current-1,BLOCK_SIZE.current-1);
        }
      }
      for(let i = 0; i < boardSize; i++){
        ctx.drawImage(queen,(solution[currentIndex][i+1]-1)*BLOCK_SIZE.current,i*BLOCK_SIZE.current,BLOCK_SIZE.current,BLOCK_SIZE.current);
      }
    }
  },[])

  useEffect(()=>{
    if(solutionList.length<1){return;}
    const queen = new Image();
    queen.src = '/image/queen.png';
    const ctx = canvas.current.getContext("2d");
    ctx.strokeStyle='#000000';
    ctx.fillStyle='#FFFFFF';
    queen.onload = ()=>{
      for(let i = 0; i < boardSize ; i++){
        for(let j = 0; j < boardSize; j++){
          ctx.fillRect(i*BLOCK_SIZE.current+1,j*BLOCK_SIZE.current+1,BLOCK_SIZE.current-2,BLOCK_SIZE.current-2);
          ctx.strokeRect(i*BLOCK_SIZE.current+0.5,j*BLOCK_SIZE.current+0.5,BLOCK_SIZE.current-1,BLOCK_SIZE.current-1);
        }
      }
      for(let i = 0; i < boardSize; i++){ctx.drawImage(queen,(solutionList[currentIndex][i+1]-1)*BLOCK_SIZE.current,i*BLOCK_SIZE.current,BLOCK_SIZE.current,BLOCK_SIZE.current);}
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
          <Button>test</Button>
        </ButtonContainer>
        <canvas ref={canvas} style={{backgroundColor:'#d3d3d3'}}/>
        <ButtonContainer>
          <Button>test</Button>
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