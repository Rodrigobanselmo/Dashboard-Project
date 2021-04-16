import React from 'react';
import {Icons} from '../../../components/Icons/iconsDashboard';
import {
  ContainerDiv,
  ButtonContainer
} from '../styles';
import NewTabs, {TabPanel} from '../../../components/Main/MuiHelpers/NewTabs'
import {FilterComponent,LoadingContent,AddUserButton} from '../../../components/Main/Table/comp'
import {COMPANY} from '../../../routes/routesNames.ts'
import {onGetAllCompanies} from '../func'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {Card} from './Card';
import {ThirdColumn} from './ThirdColumn';
import {SecondColumn} from './SecondColumn';
import {QuestionsData} from './QuestionsData';
import {QuestionColumn} from './QuestionColumn';
import {RiskFactors} from './RiskFactors';
import {RiskData} from './RiskData';
import {RisksEdit} from './RisksEdit';
import {RiskSuggestions} from './RiskSuggestions';
import {RiskSuggestData} from './RiskSuggestData';
import {JumpQuestions} from './JumpQuestions';
import {JumpQuestionsData} from './JumpQuestionsData';
import {JumpGroupsData} from './JumpGroupsData';
import {ColumnContainer} from '../styles';

//////import {useLoaderDash} from '../../../context/LoadDashContext'

export function Column({
  openModalEdit,
  setOpenModalEdit,
  data,
  index,
  position,
  setPosition,
  onChangeQuestion,
  type,
  searchRisk,
  onSearchRisk,
  loading,
  dataAll,
  onJumpGroupsHandle,
  setDataAll,
  dataChecklist,
  setDataChecklist,
  setSave
}) {

  return (
    <ColumnContainer >
      {index == 0 ?
          <SecondColumn
            position={position}
            setPosition={setPosition}
            data={data}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            setDataAll={setDataAll}
            dataAll={dataAll}
            dataChecklist={dataChecklist}
            setDataChecklist={setDataChecklist}
            setSave={setSave}
          />
        : index == 1 ?
          <ThirdColumn
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            setDataAll={setDataAll}
            dataAll={dataAll}
            dataChecklist={dataChecklist}
            setDataChecklist={setDataChecklist}
            setSave={setSave}
          />
        : type?.type == 'questionData' ?
          <QuestionsData
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            setDataAll={setDataAll}
            dataAll={dataAll}
            dataChecklist={dataChecklist}
            setDataChecklist={setDataChecklist}
            setSave={setSave}
            />
        : type?.type == 'question' ?
          <QuestionColumn
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            onChangeQuestion={onChangeQuestion}
            setDataAll={setDataAll}
            dataAll={dataAll}
            dataChecklist={dataChecklist}
            setDataChecklist={setDataChecklist}
            setSave={setSave}
          />
        : type?.type == 'risk' ?
          <RiskFactors
            position={position}
            data={data}
            index={index}
            searchRisk={searchRisk}
            onSearchRisk={onSearchRisk}
            dataChecklist={dataChecklist}
          />
        : type?.type == 'riskData' ?
          <RiskData
            position={position}
            data={data}
            index={index}
            searchRisk={searchRisk}
            loading={loading}
            dataAll={dataAll}
            dataChecklist={dataChecklist}
          />
        : type?.type == 'riskEdit' ?
          <RisksEdit
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            setDataAll={setDataAll}
            dataAll={dataAll}
            dataChecklist={dataChecklist}
            setDataChecklist={setDataChecklist}
            setSave={setSave}
          />
        : type?.type == 'riskSuggestion' ?
          <RiskSuggestions
            position={position}
            data={data}
            index={index}
            dataChecklist={dataChecklist}
          />
        : type?.type == 'riskSuggestionData' ?
          <RiskSuggestData
            position={position}
            data={data}
            index={index}
            setDataAll={setDataAll}
            dataAll={dataAll}
            dataChecklist={dataChecklist}
          />
        : type?.type == 'jump' ?
          <JumpQuestions
            position={position}
            data={data}
            index={index}
            dataChecklist={dataChecklist}
          />
        : type?.type == 'jumpGroup' ?
          <JumpGroupsData
            position={position}
            data={data}
            index={index}
            onJumpGroupsHandle={onJumpGroupsHandle}
            dataAll={dataAll}
            setDataAll={setDataAll}
            dataChecklist={dataChecklist}
            setPosition={setPosition}
          />
        : type?.type == 'jumpQuestion' ?
          <JumpQuestionsData
            position={position}
            data={data}
            index={index}
            dataAll={dataAll}
            dataChecklist={dataChecklist}
          />
        : null
      }
   </ColumnContainer>
  );
}



