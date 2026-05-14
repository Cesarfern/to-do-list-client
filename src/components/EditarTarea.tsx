import {ChangeEvent, useEffect, useState} from "react"
import {appsettings} from "../settings/appsetting"
import {useNavigate, useParams,} from "react-router-dom"
import Swal from "sweetalert2"
import {ITarea} from "../Interfaces/ITarea"
import {Container,Row,Col,Form,FormGroup, Label, Input, Button} from "reactstrap"

const initialTarea = {
    id: 0,
    title: "",
    description: "",
    IsCompleted: true
}

export function EditarTarea(){
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

    const guardar = async () =>{
        const response = await fetch(`${appsettings.apiUrl}Tarea/editar`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(tarea)
        })
        if(response.ok){
            navigate(-1)
        }else{
            Swal.fire({
                title: "Error",
                text: "No se pudo editar el tarea",
                icon: "warning"
            });
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
                    <h4>Editar Tarea</h4>
                    <hr/>
                    <Form>
                        <FormGroup>
                            <Label>Título</Label>
                            <Input type="text" name="title" onChange={inputChangeValue} value={tarea.title}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Descripción</Label>
                            <Input
                            name="description"
                            type="textarea"
                            value={tarea.description}
                            onChange={inputChangeValue} 
                            />
                        </FormGroup>
                    </Form>
                    <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                    <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}