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
  onChecklistCategoryCardHandle,
  onCreateNewCategory,
  onChecklistGroupCardHandle,
  onCreateNewGroup,
  onCreateQuestionMother,
  onChecklistquestionMotherCardHandle,
  onChecklistquestionCardHandle,
  onChangeQuestion,
  onCreateQuestion,
  type,
  searchRisk,
  onSearchRisk,
  loading,
  onEditRisk,
  searchRiskData,
  onSuggestions,
  dataAll,
  dataChecklistGroup,
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
            onChecklistCategoryCardHandle={onChecklistCategoryCardHandle}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            onCreateNewCategory={onCreateNewCategory}
            setDataAll={setDataAll}
            dataChecklist={dataChecklist}
            setDataChecklist={setDataChecklist}
            dataAll={dataAll}
            setSave={setSave}
          />
        : index == 1 ?
          <ThirdColumn
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            onChecklistGroupCardHandle={onChecklistGroupCardHandle}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            onCreateNewGroup={onCreateNewGroup}
            onCreateQuestionMother={onCreateQuestionMother}
            onChecklistquestionMotherCardHandle={onChecklistquestionMotherCardHandle}
          />
        : type?.type == 'questionData' ?
          <QuestionsData
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
            onCreateQuestion={onCreateQuestion}
            onChecklistquestionCardHandle={onChecklistquestionCardHandle}
            />
        : type == 'question' ?
          <QuestionColumn
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            onChangeQuestion={onChangeQuestion}
          />
        : type?.type == 'risk' ?
          <RiskFactors
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            searchRisk={searchRisk}
            onSearchRisk={onSearchRisk}
            dataChecklistGroup={dataChecklistGroup}
          />
        : type?.type == 'riskData' ?
          <RiskData
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            searchRisk={searchRisk}
            onSearchRisk={onSearchRisk}
            loading={loading}
            dataAll={dataAll}
          />
        : type?.type == 'riskEdit' ?
          <RisksEdit
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            onEditRisk={onEditRisk}
          />
        : type?.type == 'riskSuggestion' ?
          <RiskSuggestions
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            searchRiskData={searchRiskData}
            onSuggestions={onSuggestions}
          />
        : type?.type == 'riskSuggestionData' ?
          <RiskSuggestData
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            searchRiskData={searchRiskData}
            dataAll={dataAll}
          />
        : type?.type == 'jump' ?
          <JumpQuestions
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            dataChecklistGroup={dataChecklistGroup}
          />
        : type?.type == 'jumpGroup' ?
          <JumpGroupsData
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            dataChecklistGroup={dataChecklistGroup}
            dataAll={dataAll}
            onJumpGroupsHandle={onJumpGroupsHandle}
          />
        : type?.type == 'jumpQuestion' ?
          <JumpQuestionsData
            position={position}
            setPosition={setPosition}
            data={data}
            index={index}
            dataChecklistGroup={dataChecklistGroup}
            dataAll={dataAll}
          />
        : null
      }
   </ColumnContainer>
  );
}



