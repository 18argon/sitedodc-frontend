import React, { Component } from "react";
import { Breadcrumbs, Breadcrumb } from "../../components/Breadcrumbs";
import {
  AlunoCardImage,
  AlunoCardBody,
} from "./components/aluno_card";
import { CardContainer, FourCards } from "../../components/cards";

import { Query } from "react-apollo";
import { GET_ALUNOS } from "../../utils/queries";

class Alunos extends Component {
  render() {
    let path = window.location.pathname;
    let curso, ano;
    [curso, ano] = path
      .toUpperCase()
      .split("/")
      .slice(2, 4);
    return (
      <React.Fragment>
        <Breadcrumbs>
          <Breadcrumb endereco="/">Início</Breadcrumb>
          <Breadcrumb endereco="/alunos">Alunos</Breadcrumb>
          <Breadcrumb bold>
            {curso} {ano}
          </Breadcrumb>
        </Breadcrumbs>

        <div className="container">
        <CardContainer>
            <Query query={GET_ALUNOS} variables={{ ano: parseInt(ano), curso: curso.toUpperCase() }}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <div />;
                }
                if (error) {
                  return `Error! ${error.message}`;
                }

                return data.alunos.map((aluno, index) => (
                  <FourCards>
                    <AlunoCardImage foto={aluno.Foto ? `${process.env.REACT_APP_API_URL}/${aluno.Foto.url}` : null} />
                    <AlunoCardBody nome={aluno.Nome} />
                  </FourCards>
                ));
              }}
            </Query>
          </CardContainer>
        </div>
      </React.Fragment>
    );
  }
}

export default Alunos;
