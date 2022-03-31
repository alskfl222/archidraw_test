import styled from 'styled-components';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import DropdownMenu from './DropdownMenu';

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

const ProjectCards = (props: {
  renderings: { _id: string }[]
  checked: CheckboxValueType[];
  onChange: (values: CheckboxValueType[]) => void;
  downloadFn: (idx: number) => void;
  deleteFn: (idx: number) => void;
}) => {
  const { renderings, checked, onChange, downloadFn, deleteFn } = props;

  return (
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
                  <DropdownMenu
                    idx={idx}
                    downloadFn={() => downloadFn(idx)}
                    deleteFn={() => deleteFn(idx)}
                  />
                </CardMaskInfo>
              </CardWrapper>
            </ProjectCard>
          );
        })}
      </ProjectCardsWrapper>
    </ProjectWrapper>
  );
};

export default ProjectCards;