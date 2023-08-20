// import React,{useState,useEffect} from "react/client";
import React ,{useState,useEffect, Fragment}from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import'react-toastify/dist/react-toastify.esm.mjs'
const CRUD=()=>{ 

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[name,setName]=useState('');
    const[location,setLocation]=useState('');
    const[isActive,setIsActive]=useState(0);

     const[editID,setEditID]=useState('');
     const[editName,setEditName]=useState('');
     const[editLocation,setEditLocation]=useState('');
     const[editIsActive,setEditIsActive]=useState(0);

    // const empData=[
    //     {
    //         id:12,
    //         Name:'Developer',
    //         Location:'Jemo',
    //         isActive:1
    //     },
    //     {
    //         id:16,
    //         Name:'Analyst',
    //         Location:'Jemo1',
    //         isActive:0
    //     },
    //     {
    //         id:19,
    //         Name:'Designer',
    //         Location:'Jemo2',
    //         isActive:1
    //     }
    // ]
   const[data,setData]=useState([]);

   useEffect(()=>{
     getData();
   },[]);
   const handleSave=()=>{
    const baseURL='http://localhost:5020/api/Employee';
      const Data={
           'name':name,
           'location':location,
           'isActive':isActive
               }
               axios.post(baseURL,Data).then((result)=>{
                getData();
                Clear();
                toast.success('Submit is Done !');
               }).catch((error)=>{
                toast.error(error);
               })
           }
   const Clear=()=>{
        setName('');
        setLocation('');
        setIsActive(0);
        setEditName('');
        setEditLocation('');
        setEditIsActive(0);

   }

  const handleActiveChange=(e)=>{
       if(e.target.checked)
       {
        setIsActive(1);
       }
       else{setIsActive(0)}

   }

   const handleEditIsActive=(e)=>{
    if(e.target.checked)
    {
        setEditIsActive(1);
    }
    else{setEditIsActive(0);}
}

   const getData=()=>{

      axios.get('http://localhost:5020/api/Employee').then((result)=>{
        setData(result.data)
       // toast.success('Loadded Succesfully');
      }).catch((error)=>{
          toast.error(error);
           
      })
   }
//  const deleteEmploye=()=>{
//     axios.delete('http://localhost:5020/api/Employee/'/7).then(result=>{
//         setData('')
//     }).catch((error)=>{
//         console.log(error)
//     })
//  }
   const handleEdit=(id)=>
   {
       // alert(id);
       handleShow();
       axios.get(`http://localhost:5020/api/Employee/${id}`).then((result)=>{
            setEditName(result.data.name);
            setEditLocation(result.data.location);
            setEditIsActive(result.data.isActive);
            setEditID(result.data.id);
       }).catch((error)=>{
        toast.error(error);
       })
   }
   const handleDelete=(id)=>
   {
    //const url=;

    if(window.confirm('Are you sure to delete this employee ? ') === true)
       {
       // alert(id);
       axios.delete(`http://localhost:5020/api/Employee/${id}`).then((result)=>{
          if(result.status === 200){

            toast.success('Employee Deleted !');
            getData();
          }
       }).catch((error)=>{
        toast.error(error);
       })
       
       }  
   }
    const handleUpdate=()=>
   {
     const url=`http://localhost:5020/api/Employee/${editID}`;
       const Data={
        'id':editID,
        'name':editName,
        'location':editLocation,
        'isActive':editIsActive
       }
       axios.put(url,Data).then((result)=>{
        if(result.status===200)
        {
             getData();
             Clear();

         toast.success('Employee has been Updated');
       }
             }).catch((error)=>{
                toast.error(error);
            })
       
   }
    return (
        <Fragment>
            <ToastContainer/>
           <Container>
           <Row style={{alignContent:'center' ,alignItems:'center'}}>
                <Col ><h2>Berhan EMS React App</h2></Col>
            </Row>
             <Row>

              <Col>
              <input type='text' className='form-control' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}/>
              </Col>
              <Col>
              <input type='text' className='form-control' placeholder='Enter your adress' value={location} onChange={(e)=>setLocation(e.target.value)}/>
              </Col>
              <Col>
              <input type='checkbox' checked={isActive===1 ? true:false}  value={isActive} onChange={(e)=>handleActiveChange(e)}/> &nbsp;
              <label>IsActive</label>
              </Col>
              <Col>
              <button className='btn btn-primary' onClick={()=>handleSave()}>Submit</button>
              </Col>
             </Row>
            </Container>
            <br></br>
      <Table striped bordered hover variant="white">
      <thead>
        <tr>
            <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Location</th>
          <th>isActive</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length>0 ? data.map((item,index)=>{
                return(
                    <tr key={index}>
                        <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.location}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                        <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button> &nbsp;
                        <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                )
            }):'Loading...'
        }
        
       
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee Informaton</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          
        <Row>

             <Col>
              <input type='text' className='form-control' placeholder='Enter your name' value={editName} onChange={(e)=>setEditName(e.target.value)}/>
              </Col>
              <Col>
              <input type='text' className='form-control' placeholder='Enter your adress' value={editLocation} onChange={(e)=>setEditLocation(e.target.value)}/>
              </Col>
              <Col>
              <input type='checkbox' checked={editIsActive===1? true:false} value={editIsActive} onChange={(e)=>handleEditIsActive(e)}/> &nbsp;
              <label>IsActive</label>
              </Col> 

        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleUpdate()}>
           Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}
export default CRUD;