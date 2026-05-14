import {ChangeEvent, useEffect, useState} from "react"
import {appsettings} from "../settings/appsetting"
import {useNavigate, useParams, Link} from "react-router-dom"
import Swal from "sweetalert2"
import {ITarea} from "../Interfaces/ITarea"
import {Container,Row,Col,Form,FormGroup, Label, Input, Button} from "reactstrap"

const initialTarea = {
    id: 0,
    title: "",
    description: "",
    IsCompleted: true
}

export function VerTarea(){
    const {id} = useParams<{id:string}>()
    const [tarea,setTarea] = useState<ITarea>(initialTarea);
    const navigate = useNavigate()

    useEffect(()=>{
        const obtenerTarea = async() =>{
            const response = await fetch(`${appsettings.apiUrl}Tarea/buscar/${id}`)
            if(response.ok){
                const data = await response.json();
                setTarea(data);
            }
        }
        obtenerTarea()
    },[])

    const inputChangeValue = (event:ChangeEvent <HTMLInputElement>)=> {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setTarea({...tarea, [inputName] : inputValue})
    }

    const Compleada = async () =>{
        tarea.isCompleted = true;
        const response = await fetch(`${appsettings.apiUrl}Tarea/editar`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(tarea)
        })
        if(response.ok){
            navigate("/completadas")
        }
    }

    const Proceso = async () =>{
        tarea.isCompleted = false;
        const response = await fetch(`${appsettings.apiUrl}Tarea/editar`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(tarea)
        })
        if(response.ok){
            navigate("/")
        }
    }

    const volver = () =>{
        navigate(-1)
    }

    return(
        <Container className="my-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                    <h5 style={{fontSize: '25px'}} >APLICACIÓN TO DO LIST</h5>
                    <h4>{tarea.title}</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label><strong>Descripción</strong></Label><br/>
                            <Label>{tarea.description}</Label>
                        </FormGroup>
                    </Form>
                    <Link className="btn btn-primary me-2" to={`/editartarea/${tarea.id}`}>Editar</Link>
                    {tarea.isCompleted === false
                        ? <Button style={{background: 'yellow', color:'black'}} color="primary" className="me-4" onClick={Compleada}>Marcar como Completada</Button>
                        : <Button style={{background: 'white', color:'black'}} color="primary" className="me-4" onClick={Proceso}>Marcar como en Proceso</Button>}
                    
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}