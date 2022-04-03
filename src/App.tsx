import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import 'antd/dist/antd.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

import data from './data/test.json';
import Modal from './components/Modal';
import ProjectCards from './components/ProjectCards';
import ProjectInfo from './components/ProjectInfo';
import CardViewer from './components/CardViewer';

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

const App = () => {
  const [renderings, setRenderings] = useState<{ _id: string }[]>(
    data.renderings
  );
  const [selected, setSelected] = useState<number>(0);
  const [checked, setChecked] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);
  const [isOpenedViewer, setIsOpenedViewer] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('image');

  const checkedAllArr = renderings.map((render, idx) => idx);

  const onChange = (values: CheckboxValueType[]) => {
    setChecked((checked) => values);
  };

  const deselect = () => {
    setChecked((checked) => []);
    setCheckAll((state) => false);
  };

  const handleInfoDeleteBtn = (checked: CheckboxValueType[]) => {
    setModalType((type) => 'deleteBtn');
    setIsOpenedModal((state) => true);
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

  const handleCardDownloadBtn = (idx: number) => {
    const filename =
      renderings[idx]._id.split('/')[renderings[idx]._id.split('/').length - 1];
    axios({ url: renderings[idx]._id, method: 'GET', responseType: 'blob' })
      .then((res) => saveAs(res.data, filename))
      .catch((err) => console.error(err));
  };

  const handleCardDeleteBtn = (idx: number) => {
    setSelected((value) => idx);
    setModalType((type) => 'image');
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
  const handleViewerOpen = (idx: number) => {
    setSelected((value) => idx);
    setIsOpenedViewer((state) => true);
  };
  const handleViewerCloseBtn = () => {
    setIsOpenedViewer((state) => false);
  };

  useEffect(() => {
    if (checked.length === renderings.length) {
      setCheckAll((state) => true);
    } else {
      setCheckAll((state) => false);
    }
    // eslint-disable-next-line
  }, [checked]);
  useEffect(() => {
    if (isOpenedViewer) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'unset';
    }
  }, [isOpenedViewer]);

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
        openViewer={handleViewerOpen}
        downloadFn={handleCardDownloadBtn}
        deleteFn={handleCardDeleteBtn}
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
      {isOpenedViewer && (
        <CardViewer
          renderings={renderings}
          selected={selected}
          setSelected={setSelected}
          downloadFn={handleCardDownloadBtn}
          deleteFn={handleCardDeleteBtn}
          closeFn={handleViewerCloseBtn}
        />
      )}
    </GalleryContentWrapper>
  );
};

export default App;
