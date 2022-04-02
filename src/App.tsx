import { useState } from 'react';
import styled from 'styled-components';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import 'antd/dist/antd.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

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
  const [modalType, setModalType] = useState<string>('image');

  const onChange = (values: CheckboxValueType[]) => {
    setChecked((checked) => values);
  };

  const deselect = () => {
    setChecked((checked) => []);
    setCheckAll((state) => false);
  };

  const handleInfoDeleteBtn = (checked: CheckboxValueType[]) => {
    setModalType(type => 'deleteBtn')
    setIsOpenedModal(state => true)
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
    const filename =
      renderings[idx]._id.split('/')[renderings[idx]._id.split('/').length - 1];
    axios({ url: renderings[idx]._id, method: 'GET', responseType: 'blob' })
      .then((res) => saveAs(res.data, filename))
      .catch((err) => console.error(err));
  };

  const handleCardDropdownDeleteBtn = (idx: number) => {
    setSelected((value) => idx);
    setModalType(type => 'image')
    setIsOpenedModal((state) => true);
  };

  const handleDelete = (value: CheckboxValueType[]) => {
    const remain = renderings.filter((render, idx) => !value.includes(idx));
    setChecked((checked) => []);
    setRenderings((renderings) => remain);
    setIsOpenedModal((state) => false);
  };

  const handleModalCloseBtn = () => {
    setIsOpenedModal((state) => false);
  };

  return (
    <GalleryContentWrapper>
      <ProjectInfo
        renderings={renderings}
        checked={checked}
        deselect={deselect}
        checkAll={checkAll}
        handleCheckAll={handleCheckAll}
        handleInfoDeleteBtn={handleInfoDeleteBtn}
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
          type={modalType}
          idx={selected}
          checked={checked}
          deleteFn={handleDelete}
          closeFn={handleModalCloseBtn}
        />
      )}
    </GalleryContentWrapper>
  );
};

export default App;
