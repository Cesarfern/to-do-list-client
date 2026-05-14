import {useEffect, useState} from "react"
import {appsettings} from "../settings/appsetting"
import {Link} from "react-router-dom"
import Swal from "sweetalert2"
import {ITarea} from "../Interfaces/ITarea"
import {Container, Row, Col, Table, Button} from "reactstrap"

export function ListaCompletadas(){
    const [tareas, setTareas] = useState<ITarea[]>([]);

    const obtenerTareas = async() =>{
        const response = await fetch(`${appsettings.apiUrl}Tarea/lista-completas`)
        if(response.ok){
            const data = await response.json();
            setTareas(data)
        }
    }

    useEffect(()=>{
        obtenerTareas()
    },[])

    const Eliminar = (id:number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Eliminar tarea!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, eliminar!"
          }).then( async(result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${appsettings.apiUrl}Tarea/eliminar/${id}`,{method:"DELETE"})
                if(response.ok) await obtenerTareas()
            }
          });
    }

    return(
        <Container className="my-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h5 style={{fontSize: '25px'}} >APLICACIÓN TO DO LIST</h5>
                    <Link style={{background: '#12e800', border: '.1px solid #900'}} className="btn btn-succes mb-3" to="/nuevatarea">
                        <h4>Nueva tarea</h4>
                    </Link>
                    <Row>
                    <Col>
                            <Link className="btn" style={{border: '.1px solid #900'}} to="/">
                                <h4>Tareas en proceso</h4>
                            </Link>
                        </Col>
                        <Col>
                            <Link className="btn" style={{border: '.1px solid #900', backgroundColor: 'yellow'}} to="/completadas">
                                <h4>Tareas completadas</h4>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <h5>Tareas completadas:</h5>
                    </Row>
                    <Table bordered style={{border: '.2px solid #900'}}>
                        <thead>
                            <tr>
                                <th style={{backgroundColor: 'yellow'}}>Título</th>
                                <th style={{backgroundColor: 'yellow'}}>Descripción</th>
                                <th style={{backgroundColor: 'yellow'}}>Fecha de creación</th>
                                <th style={{backgroundColor: 'yellow'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tareas.map((item) =>(
                                    <tr key={item.id}>
                                        <td style={{backgroundColor: 'yellow'}}>{item.title}</td>
                                        <td style={{backgroundColor: 'yellow'}}>{item.description}</td>
                                        <td style={{backgroundColor: 'yellow'}}>{item.createdAt}</td>
                                        <td style={{backgroundColor: 'yellow'}}>
                                            <Link className="btn btn-primary me-2" to={`/vertarea/${item.id}`} style={{background: 'green'}}>Ver</Link>
                                            <Link className="btn btn-primary me-2" to={`/editartarea/${item.id}`}>Editar</Link>
                                            <Button color="danger" onClick={() => {Eliminar(item.id!)}}>
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>       
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}