import React from 'react';
import './introProj.css';
import MyIconoProj  from '../../assets/iconoProj.svg';
import styled from 'styled-components';

const SubTitle = styled.h2`
  font-family: 'SankofaDisplay';
`
const TextProj = styled.p`
 font-family: 'space grotesk', sans-serif;
 font-size: 50px;
`
const TitleProj = styled.h1`
 font-family: 'velista';
 letter-spacing: 5px;
 font-size:60px;
`


const IntroProj = () => {
  return (
    <div className="introPro">
  
      <TitleProj>
        PROJ
        <span>
          <img src={MyIconoProj} className="my-iconoProj" />
        </span>
        CTS
      </TitleProj>
      <SubTitle>Knowledge</SubTitle>
      <TextProj>
        fhefheufuefhuehfeuheuhfuefheufheu<br/>
        fhefheufuefhuehfeuheuhfuefheufheu<br/>
        fhefheufuefhuehfeuheuhfuefheufheu<br/>
        fhefheufuefhuehfeuheuhfuefheufheu<br/>
        fhefheufuefhuehfeuheuhfuefheufheu<br/>
        fhefheufuefhuehfeuheuhfuefheufheu<br/>
        fhefheufuefhuehfeuheuhfuefheufheu<br/>
        fhefheufuefhuehfeuheuhfuefheufheu<br/>
        fhefheufuefhuehfeuheuhfuefheufheu<br/>
      </TextProj>
    </div>
  );
};

export default IntroProj;

