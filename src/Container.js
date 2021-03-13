import logo from './logo.svg';
import {Container, Row, Col, Alert} from 'react-bootstrap';
import Media from './Media';

function App() {
  return (
    <div className="app">
      <Container>
	  <Row className="justify-content-md-center">
		<Col md="auto">
			<img src={logo} className="pad-2" alt="logo" width="150" />
		</Col>
      </Row>
	  <Row>
	  <Col>
        <Alert variant="secondary">
    Resize your images using the form below
  </Alert>
  </Col>
  </Row>
      </Container>
	  <Media />
    </div>
  );
}

export default App;
