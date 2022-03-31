import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import 'antd/dist/antd.css';

import data from './data/test.json';
import Modal from './components/Modal';
import ProjectCards from './components/ProjectCards';
import ProjectInfo from './components/ProjectInfo';

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

  return (
    <GalleryContentWrapper>
      <ProjectInfo
        totalLength={renderings.length}
        checked={checked}
        checkAll={checkAll}
        handleCheckAll={handleCheckAll}
      />
      <ProjectCards
        renderings={renderings}
        checked={checked}
        onChange={onChange}
        downloadFn={handleCardDropdownDownloadBtn}
        deleteFn={handleCardDropdownDeleteBtn}
      />
      {isOpenedModal && (
        <Modal
          idx={selected}
          deleteFn={() => handleModalDeleteBtn(selected)}
          closeFn={handleModalCloseBtn}
        />
      )}
    </GalleryContentWrapper>
  );
};

export default App;
