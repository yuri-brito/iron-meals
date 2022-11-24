import { Card, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import logo_ from "../assets/logo_.png";
import { useEffect, useState } from "react";
const ResumeCard = (props) => {
  const [resumo, setResumo] = useState([]);
  let somaCarbs = 0;
  let somaKcal = 0;
  let somaLipids = 0;
  let somaSodium = 0;
  let somaProtein = 0;
  let somaFiber = 0;
  async function calcResumo() {
    somaCarbs = 0;
    somaKcal = 0;
    somaLipids = 0;
    somaSodium = 0;
    somaProtein = 0;
    somaFiber = 0;
    await props.refeicoes.map((refeicao) => {
      refeicao.itens.map((item) => {
        somaCarbs += (item.carbs * item.quantity) / 100;
        somaKcal += (item.kcal * item.quantity) / 100;
        somaLipids += (item.lipids * item.quantity) / 100;
        somaSodium += (item.sodium * item.quantity) / 100;
        somaProtein += (item.protein * item.quantity) / 100;
        somaFiber += (item.fiber * item.quantity) / 100;
      });
    });
    setResumo([
      {
        soma: somaKcal,
        name: "Kcal",
        un: "",
        tip: "Referência OMS: 2000kCal/dia para mulheres e 2500kCal/dia para homens",
      },
      {
        soma: somaCarbs,
        name: "Carboidratos",
        un: "g",
        tip: "Referência OMS: 130g/dia",
      },
      {
        soma: somaLipids,
        name: "Lipídios",
        un: "g",
        tip: "Referência OMS: 30% do valor energético total (VET)",
      },
      {
        soma: somaProtein,
        name: "Proteínas",
        un: "g",
        tip: "Referência OMS: 0,8 gramas por kg de peso corporal/dia",
      },
      {
        soma: somaFiber,
        name: "Fibra",
        un: "g",
        tip: "Referência OMS: > 25g/dia",
      },
      {
        soma: somaSodium,
        name: "Sódio",
        un: "mg",
        tip: "Referência OMS: 2000mg/dia",
      },
    ]);
    // props.setReload(!props.reload)
  }
  useEffect(() => {
    calcResumo();
  }, [props.refeicoes]);
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
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignContent: "center",
          backgroundImage: `url(${logo_})`,
          backgroundSize: "200px",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "center",
          backgroundPositionX: "center",
        }}
      >
        <Card.Title style={{ color: "rgba(0,0,0,0.6)" }}>
          Resumo de Calorias
        </Card.Title>
        {props.refeicoes.length === 0 ? (
          <Card.Text as="div" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 80 }}>
              <i className="bi bi-database-exclamation"></i>
            </div>
            <h5>{"Sem dados no momento."}</h5>
            <h6 style={{ marginTop: 40 }}>
              {"Adicione sua primeira refeição!"}
            </h6>
          </Card.Text>
        ) : (
          <Card.Text as="div" style={{ textAlign: "left" }}>
            <Table>
              <tbody>
                {resumo.map((cadaSoma, index) => {
                  return (
                    <tr key={index}>
                      <OverlayTrigger
                        key={index}
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>{cadaSoma.tip}</Tooltip>
                        }
                      >
                        <td width={150}>
                          <strong>{cadaSoma.name}</strong>
                        </td>
                      </OverlayTrigger>
                      <td>{Math.round(cadaSoma.soma) + cadaSoma.un}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default ResumeCard;
