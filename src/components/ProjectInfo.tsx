import { useState } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Select } from 'antd';
import {
  DeleteOutlined,
  DownOutlined,
  DownloadOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import axios from 'axios';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

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
  display: flex;
  justify-content: flex-end;
  text-align: left;
  gap: 0.5rem;
  color: rgb(102, 102, 102);
`;

const FilterSelect = ({ ...props }) => {
  const [open, setOpen] = useState<boolean>(false);
  let suffixIcon;
  if (open) {
    suffixIcon = <UpOutlined />;
  } else {
    suffixIcon = <DownOutlined />;
  }
  return (
    <Select
      {...props}
      style={{ width: 134, margin: 0, padding: 0 }}
      open={open}
      suffixIcon={suffixIcon}
      onDropdownVisibleChange={(o) => setOpen(o)}
    />
  );
};

const { Option } = Select;
const renderingOptions = [
  'All Renderings',
  'First Person',
  'Top View',
  'Panorama',
];
const resolutionOptions = ['All Resolution', 'Standard', '2K', '3K', '4K'];

const ProjectInfo = (props: {
  renderings: { _id: string }[];
  checked: CheckboxValueType[];
  checkAll: boolean;
  deselect: () => void;  
  handleCheckAll: () => void;
  deleteFn: (checked: CheckboxValueType[]) => void;
}) => {
  const { renderings, checked, checkAll, deselect, handleCheckAll, deleteFn } = props;
  const [renderingOption, setRenderingOption] = useState<string>(
    renderingOptions[0]
  );
  const [resolutionOption, setResolutionOption] = useState<string>(
    resolutionOptions[0]
  );
  const handleRenderingOption = (value: string) => {
    setRenderingOption((state) => value);
  };
  const handleResolutionOption = (value: string) => {
    setResolutionOption((state) => value);
  };
  const handleDownloadBtn = () => {
    const downloads = checked
      .map((check: CheckboxValueType) => renderings[check as number])
      .map((rendering) => rendering._id);
    if (downloads.length === 1) {
      const filename = downloads[0].split('/').slice(-1)[0];
      axios({ url: downloads[0], method: 'GET', responseType: 'blob' })
        .then((res) => saveAs(res.data, filename))
        .catch((err) => console.error(err));
    } else {
      const zip = new JSZip();
      Promise.all(
        downloads.map((file) => {
          const filename = file.split('/').slice(-1)[0];
          return axios({ url: file, method: 'GET', responseType: 'blob' }).then(
            (res) => zip.file(filename, res.data)
          );
        })
      )
        .then((res) => {
          zip
            .generateAsync({ type: 'blob' })
            .then((content) =>
              saveAs(
                content,
                downloads[0].split('/').slice(-1)[0].split('.')[0] + '.zip'
              )
            );
        })
        .catch((err) => console.error(err));
    }
  };
  const handleDeleteBtn = () => {
    deleteFn(checked)
  }


  return (
    <ProjectInfoWrapper>
      <CheckInfo>
        {checked.length > 0 ? (
          <>
            <span>{checked.length} render image(s) selected</span>
            <span>
              <Checkbox onChange={handleCheckAll} checked={checkAll} />
              &nbsp; Select All
            </span>
          </>
        ) : (
          `${renderings.length} rendering(s)`
        )}
      </CheckInfo>
      <TopTitle>Gallery</TopTitle>
      {checked.length > 0 ? (
        <ProjectController>
          <Button icon={<DownloadOutlined />} onClick={handleDownloadBtn} />
          <Button icon={<DeleteOutlined />} onClick={handleDeleteBtn}/>
          <Button onClick={deselect}>Deselect</Button>
        </ProjectController>
      ) : (
        <ProjectController>
          <FilterSelect
            defaultValue={renderingOption}
            onChange={handleRenderingOption}
          >
            {renderingOptions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </FilterSelect>
          <FilterSelect
            defaultValue={resolutionOption}
            onChange={handleResolutionOption}
          >
            {resolutionOptions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </FilterSelect>
        </ProjectController>
      )}
    </ProjectInfoWrapper>
  );
};

export default ProjectInfo;
