import { useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import 'antd/dist/antd.css';

import data from './data/test.json';

const GalleryContentWrapper = styled.div`
  margin-top: 1rem;
  padding: 0 32px 32px;

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #499fb6;
    border-color: #499fb6;
  }
`;

const ProjectInfoWrapper = styled.div`
  width: 100%;
  height: 64px;
  padding: 0 12px;
  display: flex;
  align-items: center;
`;

const ProjectInfo = styled.span`
  padding-left: 9px;
  display: flex;
  flex-direction: column;
  flex: 1 1 0px;
  color: rgb(102, 102, 102);
  word-break: keep-all;
  @media (orientation: landscape) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const TopTitle = styled.div`
  position: relative;
  flex: 1 1 0px;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 56px;
  color: rgb(45, 50, 54);
  word-break: keep-all;
  user-select: none;
`;

const ProjectController = styled.span`
  padding-right: 9px;
  flex: 1 1 0%;
  text-align: right;
  color: rgb(102, 102, 102);
  span {
    margin-right: 1rem;
  }
`;

const ProjectFilter = styled.span`
  padding-right: 9px;
  flex: 1 1 0px;
  text-align: right;
  color: rgb(102, 102, 102);
  span {
    margin-right: 1rem;
  }
`;

const ProjectWrapper = styled.div`
  width: 100%;
  margin-top: 7px;
  padding: 0 12px;
`;

const ProjectCardsWrapper = styled(Checkbox.Group)`
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

const CardWrapper = styled.div`
  padding-top: 71%;
  overflow: hidden;
  transition: box-shadow 0.25s ease 0s;

  &:hover {
    box-shadow: rgb(67 87 110 / 8%) 1px 1px 8px 2px,
      rgb(67 87 110 / 14%) 2px 4px 20px 2px;
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
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0);

  label,
  a {
    width: 1rem;
    height: 1rem;
    color: #fff;
    visibility: hidden;
    &.ant-checkbox-wrapper-checked {
      visibility: visible;
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.35);
    label,
    a {
      visibility: visible;
    }
  }
`;

const checkedAllArr = data.renderings.map((render, idx) => idx);

const App = () => {
  const [checked, setChecked] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const onChange = (values: CheckboxValueType[]) => {
    setChecked((checked) => values);
  };

  const handleCheckAll = () => {
    if (!checkAll) {
      setChecked((checked) => checkedAllArr);
      setCheckAll((state) => true);
    } else {
      setChecked((checked) => []);
      setCheckAll((state) => false);
    }
    console.log("CheckALL")
  };

  const menu = (
    <Menu>
      <Menu.Item key='0'>메뉴1</Menu.Item>
    </Menu>
  );

  return (
    <GalleryContentWrapper>
      <ProjectInfoWrapper>
        <ProjectInfo>
          {checked.length > 0 ? (
            <>
              <span>{checked.length}개의 렌더 이미지 선택됨</span>
              <span>
                <Checkbox onChange={handleCheckAll} checked={checkAll} />
                &nbsp; 모두 선택
              </span>
            </>
          ) : (
            `${data.renderings.length} 개의 렌더샷`
          )}
        </ProjectInfo>
        <TopTitle>갤러리</TopTitle>
        {checked.length > 0 ? (
          <ProjectController>asdf</ProjectController>
        ) : (
          <ProjectFilter></ProjectFilter>
        )}
      </ProjectInfoWrapper>
      <ProjectWrapper>
        <ProjectCardsWrapper onChange={onChange} value={checked}>
          {data.renderings.map((card, idx) => {
            return (
              <ProjectCard key={idx}>
                <CardWrapper>
                  <CardImg src={card._id} alt='render' />
                  <CardMaskInfo>
                    <Checkbox checked={checked.includes(idx)} value={idx} />
                    <Dropdown overlay={menu} trigger={['click']}>
                      <a
                        className='ant-dropdown-link'
                        onClick={(e) => e.preventDefault()}
                      >
                        <EllipsisOutlined />
                      </a>
                    </Dropdown>
                  </CardMaskInfo>
                </CardWrapper>
              </ProjectCard>
            );
          })}
        </ProjectCardsWrapper>
      </ProjectWrapper>
    </GalleryContentWrapper>
  );
};

export default App;
