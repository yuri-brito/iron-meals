import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import breakfast from "../assets/breakfast.png";
import lunch from "../assets/lunch.png";
import dinner from "../assets/dinner.png";
import lanche from "../assets/lanche.png";
import { Link } from "react-router-dom";
const MealCard = (props) => {
  return (
    <Card
      style={{
        width: "15rem",
        height: "20rem",
        boxShadow:
          "0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)",
        borderRadius: 20,
        margin: 30,
        animation: "fadein 1.5s",
      }}
    >
      <Card.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        {props.refeicao.title === "breakfast" && (
          <Card.Title>Café da Manhã</Card.Title>
        )}
        {props.refeicao.title === "lunch" && <Card.Title>Almoço</Card.Title>}
        {props.refeicao.title === "snacks" && <Card.Title>Lanche</Card.Title>}
        {props.refeicao.title === "dinner" && <Card.Title>Jantar</Card.Title>}

        {props.refeicao.title === "breakfast" && (
          <Card.Img variant="top" src={breakfast} style={{ width: 100 }} />
        )}
        {props.refeicao.title === "lunch" && (
          <Card.Img variant="top" src={lunch} style={{ width: 100 }} />
        )}
        {props.refeicao.title === "snacks" && (
          <Card.Img variant="top" src={lanche} style={{ width: 100 }} />
        )}
        {props.refeicao.title === "dinner" && (
          <Card.Img variant="top" src={dinner} style={{ width: 100 }} />
        )}
        {props.refeicao.itens
          .map((item) => {
            let label = "";
            if (item.label.length > 15) {
              label = `${item.label.slice(0, 15)} ...`;
            } else {
              label = item.label;
            }
            return (
              <OverlayTrigger
                key={props.refeicao.itens.indexOf(item)}
                placement="top"
                overlay={<Tooltip id={`tooltip-top`}>{item.label}</Tooltip>}
              >
                <Card.Text style={{ margin: 0 }}>
                  {label} - {item.quantity}g
                </Card.Text>
              </OverlayTrigger>
            );
          })
          .slice(0, 3)}
        {props.refeicao.itens.length > 3 && (
          <Card.Text style={{ margin: 0 }}>(...)</Card.Text>
        )}
        <Link
          to={`/refeicoes/${props.refeicao._id}`}
          style={{ textDecoration: "none", color: "grey", marginTop: 10 }}
        >
          <Button variant="primary">
            <i className="bi bi-ticket-detailed"></i> Detalhes
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MealCard;
