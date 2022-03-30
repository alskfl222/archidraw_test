import { useEffect, useState } from 'react';
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
  .ant-checkbox-inner,
  .ant-checkbox-input {
    transform: scale(0.9);
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
  padding: 10px 15px;
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
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;

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

    a:active {
      box-shadow: rgb(67 87 110 / 8%) 1px 1px 8px 2px,
        rgb(67 87 110 / 14%) 2px 4px 20px 2px;
    }
  }
`;

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.65);
  overflow-y: hidden;
`;

const ModalSection = styled.section`
  position: absolute;
  top: calc(50vh - 265px);
  left: calc(50vw - 220px);
  width: 440px;
  height: 530px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 1rem;
`;

const ModalImgContainer = styled.div`
  box-shadow: 0 0.5px #6db2c5;
  img {
    width: 440px;
    border-radius: 1rem;
  }
`;

const ModalMessageContainer = styled.div`
  margin: 24px auto;
  display: flex;
  flex-direction: column;

  h5 {
    margin-top: 0;
    margin-bottom: 8px;
    text-align: center;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 24px;
    color: #2b2b2b;
    user-select: none;
  }
  span {
    line-height: 24px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.5px;
    color: #8b8b8b;
    text-transform: none;
    user-select: none;
  }
`;

const ModalBtnContainer = styled.div`
  position: absolute;
  bottom: 12px;
  display: flex;
  flex-direction: column;

  button {
    cursor: pointer;
  }
`;

const ModalCardDeleteBtn = styled.button`
  width: 392px;
  height: 48px;
  margin: 0 24px 14px 24px;
  background: #6db2c5;
  border-radius: 4px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #fbfbfb;
  line-height: 48px;
  user-select: none;

  &:hover {
    background: #71b6c9;
  }
`;

const ModalCloseBtn = styled.button`
  width: 392px;
  height: 48px;
  margin: 0 24px 14px 24px;
  background: #fff;
  border-radius: 4px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  letter-spacing: 0.1px;
  color: #6db2c5;
  line-height: 48px;
  user-select: none;

  &:hover {
    background-color: #fbfbfb;
  }
`;

const checkedAllArr = data.renderings.map((render, idx) => idx);

const App = () => {
  const [renderings, setRenderings] = useState<{ _id: string }[]>(
    data.renderings
  );
  const [selected, setSelected] = useState<number>(0);
  const [checked, setChecked] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);
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
  };

  const handleCardDropdownDownloadBtn = (idx: number) => {
    console.log(idx);
  };

  const handleCardDropdownDeleteBtn = (idx: number) => {
    setSelected((value) => idx);
    setIsOpenedModal((state) => true);
  };

  const handleModalDeleteBtn = (idx: number) => {
    setRenderings((renderings) => [
      ...renderings.slice(0, idx),
      ...renderings.slice(idx + 1),
    ]);
    setIsOpenedModal((state) => false);
  };

  const handleModalCloseBtn = () => {
    setIsOpenedModal((state) => false);
  };

  useEffect(() => {
    if (isOpenedModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // eslint-disable-next-line
  }, [isOpenedModal]);

  const DropDownMenu = (idx: number) => (
    <Menu>
      <Menu.Item key='0' onClick={() => handleCardDropdownDownloadBtn(idx)}>
        다운로드
      </Menu.Item>
      <Menu.Item key='1' onClick={() => handleCardDropdownDeleteBtn(idx)}>
        삭제
      </Menu.Item>
    </Menu>
  );

  const Modal = (idx: number) => (
    <ModalBackdrop>
      <ModalSection>
        <ModalImgContainer>
          <img
            src='https://resources.archisketch.com/editor/assets_test/img/pop-up/gallery_delete@2x.gif'
            alt='gallery_delete'
          ></img>
        </ModalImgContainer>
        <ModalMessageContainer>
          <br />
          <h5>확인</h5>
          <span>
            <br />
            정말 이 이미지를 삭제하시겠습니까?
          </span>
        </ModalMessageContainer>
        <ModalBtnContainer>
          <ModalCardDeleteBtn onClick={() => handleModalDeleteBtn(idx)}>삭제</ModalCardDeleteBtn>
          <ModalCloseBtn onClick={handleModalCloseBtn}>돌아가기</ModalCloseBtn>
        </ModalBtnContainer>
      </ModalSection>
    </ModalBackdrop>
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
            `${renderings.length} 개의 렌더샷`
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
          {renderings.map((card, idx) => {
            return (
              <ProjectCard key={idx}>
                <CardWrapper>
                  <CardImg src={card._id} alt='render' />
                  <CardMaskInfo>
                    <Checkbox
                      checked={checked.includes(idx)}
                      value={idx}
                      // style={{ width: '80%', height: '80%' }}
                    />
                    <Dropdown
                      overlay={DropDownMenu(idx)}
                      trigger={['click']}
                      placement='bottomRight'
                    >
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
      {isOpenedModal && Modal(selected)}
    </GalleryContentWrapper>
  );
};

export default App;
