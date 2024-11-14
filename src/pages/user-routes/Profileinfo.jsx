import React from 'react'
import Base from '../../components/Base'
import { Card, CardBody, CardText, Col, Container, Row } from 'reactstrap';
import { Link, useParams } from 'react-router-dom'

function Profileinfo() {
  return (
    <Base>
      <Container className='mt-5 mb-5'>
     <Link to="/">Home</Link>
<Row>
  <Col md={
    {
      size:12
    }
  }
>
   <Card>
      <CardBody>
 <CardText>
  <h3><b>Bhujveer Singh</b></h3>
  <p>
Full Stack .Net Developer(Asp.Net C#| JavaScript | HTML | CSS | C# | .Net Core | WebApi |ASP.NET MVC | MicroServices | SQL Server | at National Informatic Center New Delhi
 Hi everyone - I am looking for a new role and would appreciate your support. Thank you in advance for any connections, advice, or opportunities you can offer. </p>

</CardText>
      </CardBody>

     </Card>
</Col>
</Row>
</Container>
  
    </Base>
  )
}

export default Profileinfo
