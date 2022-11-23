import SpinnerImage from "../components/SpinnerImage";
import NavBar from "../components/NavBar";
import { Container, Row } from "react-bootstrap";
import CardAddMeal from "../components/CardAddMeal";
import MealCard from "../components/MealCard";
import toast from "react-hot-toast";
import ResumeCard from "../components/ResumeCard";
const MealsCollection = (props) => {
  return (
    <Container>
      <NavBar />
      {props.isLoading ? (
        <SpinnerImage />
      ) : (
        <Container>
          <Row>
            <CardAddMeal
              apiURLuser={props.apiURLuser}
              setReload={props.setReload}
              reload={props.reload}
            />
            {props.refeicoes.map((refeicao) => {
              return <MealCard key={refeicao._id} refeicao={refeicao} />;
            })}
            <ResumeCard
              refeicoes={props.refeicoes}
              setReload={props.setReload}
              reload={props.reload}
            />
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default MealsCollection;
