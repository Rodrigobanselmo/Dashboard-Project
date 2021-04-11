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
import {QuestionColumn} from './QuestionColumn';
import {RiskFactors} from './RiskFactors';
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
  onChangeQuestion,
  type,
  searchRisk,
  onSearchRisk
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
            onChangeQuestion={onChangeQuestion}
            searchRisk={searchRisk}
            onSearchRisk={onSearchRisk}
          />
        : null
      }
   </ColumnContainer>
  );
}



