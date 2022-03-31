import styled from 'styled-components';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const ProjectInfoWrapper = styled.div`
  width: 100%;
  height: 64px;
  padding: 0 12px;
  display: flex;
  align-items: center;
`;

const CheckInfo = styled.span`
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

const ProjectInfo = (props: {
  totalLength: number;
  checked: CheckboxValueType[];
  checkAll: boolean;
  handleCheckAll: () => void;
}) => {

  const {totalLength, checked, checkAll, handleCheckAll} = props

  return (
    <ProjectInfoWrapper>
      <CheckInfo>
        {checked.length > 0 ? (
          <>
            <span>{checked.length}개의 렌더 이미지 선택됨</span>
            <span>
              <Checkbox onChange={handleCheckAll} checked={checkAll} />
              &nbsp; 모두 선택
            </span>
          </>
        ) : (
          `${totalLength} 개의 렌더샷`
        )}
      </CheckInfo>
      <TopTitle>갤러리</TopTitle>
      {checked.length > 0 ? (
        <ProjectController>asdf</ProjectController>
      ) : (
        <ProjectFilter></ProjectFilter>
      )}
    </ProjectInfoWrapper>
  );
};

export default ProjectInfo;
