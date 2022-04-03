import styled from 'styled-components';
import { Button } from 'antd';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
  DownloadOutlined,
  DeleteOutlined,
  TagFilled,
} from '@ant-design/icons';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const ViewerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 990;
  background: white;
`;
const ViewerTopBar = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px rgb(219, 219, 219);
`;
const TopBarLeft = styled.div`
  margin-left: 16px;
  display: flex;
  align-items: center;
`;
const PageInfo = styled.div`
  margin-left: 0.3rem;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
  p:nth-child(2) {
    font-weight: 500;
  }
`;
const TopBarRight = styled.div`
  margin-right: 10px;
  display: flex;
  gap: 0.5rem;
  color: rgb(75, 75, 75);
`;
const CloseViewerBtn = styled.button`
  width: 32px;
  height: 32px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(245, 245, 245);
  border-radius: 4px;
  transition: all 0.32s ease 0s;
  cursor: pointer;

  &:hover {
    background: rgb(235, 235, 235);
  }
  svg {
    width: 0.6rem;
    height: 0.6rem;
  }
`;
const ViewerImageWrapper = styled.div`
  position: relative;
  height: calc(100vh - 56px);
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    position: relative;
    vertical-align: middle;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const PrevBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 24px;
  width: 40px;
  height: 40px;
  z-index: 991;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(243, 244, 244);
  border-radius: 8px;
  cursor: pointer;
`;
const NextBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 24px;
  width: 40px;
  height: 40px;
  z-index: 991;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(243, 244, 244);
  border-radius: 8px;
  cursor: pointer;
`;

const CardViewer = (props: {
  renderings: { _id: string }[];
  selected: number;
  setSelected: any;
  downloadFn: (idx: number) => void;
  deleteFn: (idx: number) => void;
  closeFn: () => void;
}) => {
  const { renderings, selected, setSelected, downloadFn, deleteFn, closeFn } =
    props;
  const moveToPrev = () => {
    if (selected > 0) {
      setSelected(selected - 1);
    }
  };
  const moveToNext = () => {
    if (selected < renderings.length - 1) {
      setSelected(selected + 1);
    }
  };
  const handleDownloadBtn = () => {
    downloadFn(selected);
  };

  return (
    <ViewerWrapper>
      <ViewerTopBar>
        <TopBarLeft>
          <CloseViewerBtn onClick={closeFn}>
            <CloseOutlined />
          </CloseViewerBtn>
          <PageInfo>
            <p>10/8/2021</p>
            <p>Resolutions: undefiend</p>
          </PageInfo>
        </TopBarLeft>
        <TopBarRight>
          <Button
            icon={<TagFilled style={{ opacity: 0.5 }} />}
            type='text'
            disabled={true}
            style={{ background: 'rgb(235, 235, 235)' }}
          />
          <Button
            icon={<DownloadOutlined />}
            type='text'
            style={{ background: 'rgb(235, 235, 235)', fontWeight: 500 }}
            onClick={handleDownloadBtn}
          >
            Download
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type='text'
            style={{ background: 'rgb(235, 235, 235)' }}
            onClick={() => deleteFn(selected)}
          />
        </TopBarRight>
      </ViewerTopBar>
      <ViewerImageWrapper>
        {selected > 0 && (
          <PrevBtn onClick={moveToPrev}>
            <ArrowLeftOutlined />
          </PrevBtn>
        )}
        {selected < renderings.length - 1 && (
          <NextBtn onClick={moveToNext}>
            <ArrowRightOutlined />
          </NextBtn>
        )}
        <img src={renderings[selected]._id} alt='rendering' />
      </ViewerImageWrapper>
    </ViewerWrapper>
  );
};

export default CardViewer;
