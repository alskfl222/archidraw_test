import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.65);
  overflow-y: hidden;
`;

const ModalSection = styled.section`
  position: fixed;
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

const Modal = (props: {
  type: string;
  idx: number;
  checked: CheckboxValueType[];
  deleteFn: (value: CheckboxValueType[]) => void;
  closeFn: () => void;
}) => {
  const { type, idx, checked, deleteFn, closeFn } = props;
  return (
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
          <h5>
            {type === 'image'
              ? 'Confirm To Delete'
              : checked.length === 1
              ? `${checked.length} image was selected`
              : `${checked.length} images were selected`}
          </h5>
          <span>
            <br />
            {type === 'image' || checked.length === 1
              ? 'Are you sure you want to delete this image?'
              : 'Are you sure you want to delete these images?'}
          </span>
        </ModalMessageContainer>
        <ModalBtnContainer>
          <ModalCardDeleteBtn
            onClick={() => {
              if (type === 'image') {
                deleteFn([idx]);
              } else {
                deleteFn(checked);
              }
            }}
          >
            DELETE
          </ModalCardDeleteBtn>
          <ModalCloseBtn onClick={closeFn}>RETURN</ModalCloseBtn>
        </ModalBtnContainer>
      </ModalSection>
    </ModalBackdrop>
  );
};

export default Modal;
