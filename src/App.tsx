import { useState } from 'react';
import styled from 'styled-components';

import data from './data/test.json';

const GalleryContentWrapper = styled.div`
  padding: 0 32px 32px;
`;

const ProjectInfoWrapper = styled.div`
  width: 100%;
  height: 64px;
  padding: 0 12px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const ProjectInfo = styled.span`
  position: absolute;
  top: 1rem;
  left: calc(32px + 12px + 9px);
  color: rgb(102, 102, 102);

  span {
    margin-right: 1rem;
  }
  input {
    margin-right: 0.5rem;
  }
`;

const TopTitle = styled.div`
  position: relative;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: rgb(45, 50, 54);
  user-select: none;
`;

const ProjectFilter = styled.span`
  display: flex;
`;

const ProjectWrapper = styled.div`
  width: 100%;
  margin-top: 7px;
  padding: 0 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (min-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const ProjectCard = styled.div`
  position: relative;
  margin: 9px;
  cursor: pointer;
`;

const CardWrapper = styled.div<{ isChecked: boolean }>`
  padding-top: 71%;
  overflow: hidden;
  transition: box-shadow 0.25s ease 0s;

  input {
    display: none;
  }

  input[type='checkbox'] + label {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 16px;
    height: 16px;
    z-index: 101;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input[type='checkbox']:checked + label {
    &::after {
      content: '✔';
      padding: 0;
      margin: 0;
    }
  }

  div {
    visibility: hidden;
  }

  label {
    visibility: ${(props) => (props.isChecked ? 'visible' : 'hidden')};
  }

  &:hover {
    box-shadow: rgb(67 87 110 / 8%) 1px 1px 8px 2px,
      rgb(67 87 110 / 14%) 2px 4px 20px 2px;
    div, label {
      visibility: visible;
    }
  }
`;

const CardImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  border-radius: 4px;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
`;

const CardMaskInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 4px;
`;


const App = () => {
  const [checked, setChecked] = useState<number[]>([]);

  const onChange = (value: number) => {
    let newChecked: number[];
    if (checked.includes(value)) {
      newChecked = checked.filter((el) => el !== value);
    } else {
      newChecked = [...checked, value];
      newChecked.sort();
    }
    setChecked((checked) => newChecked);
  };

  const checkAll = () => {
    if (checked.length < data.renderings.length) {
      setChecked((checked) => data.renderings.map((render, idx) => idx));
    } else {
      setChecked((checked) => []);
    }
  };

  return (
    <GalleryContentWrapper>
      <ProjectInfoWrapper>
        <ProjectInfo>
          {checked.length > 0 ? (
            <>
              <span>{checked.length}개의 렌더 이미지 선택됨</span>
              <span>
                <input type='checkbox' onChange={checkAll} />
                모두 선택
              </span>
            </>
          ) : (
            `${data.renderings.length} 개의 렌더샷`
          )}
        </ProjectInfo>
        <TopTitle>갤러리</TopTitle>
      </ProjectInfoWrapper>
      <ProjectWrapper>
        {data.renderings.map((card, idx) => {
          return (
            <ProjectCard key={idx}>
              <CardWrapper isChecked={checked.includes(idx)}>
                <CardImg src={card._id} alt='render' />
                <CardMaskInfo />
                <input
                  id={`${idx}`}
                  type='checkbox'
                  checked={checked.includes(idx)}
                  onChange={() => onChange(idx)}
                />
                <label htmlFor={`${idx}`}></label>
              </CardWrapper>
            </ProjectCard>
          );
        })}
      </ProjectWrapper>
    </GalleryContentWrapper>
  );
};

export default App;
