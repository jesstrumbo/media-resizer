import {Container, Row, Col, Alert, Form, Button} from 'react-bootstrap';
import React, { useState } from 'react';
import ImageProcessor from './ImageProcessor';

function Media() {
	const [state, setState] = useState({ error: null, longestEdge: "", submitClicked: false, media: undefined });
	const media = React.createRef();
	
	const verifyInput = (val) => {
		if (isNaN(val)) {
			setState(prevState => ({ ...prevState, error: "Must enter a number" }))
		}
		else {
			setState(prevState => ({ ...prevState, longestEdge: val, error: null }))
		}
	}
	const submitImage = () => {
		setState(prevState => ({ ...prevState, submitClicked: true, error: null  }));
	};
	const setSelectedFile = (e) => {
		setState(prevState => ({ ...prevState, media: e[0] }));
	}
	
  return (
    <div className="app">
      <Container>
		<Row>
			<Col lg="3" md="6">
				<Form>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Longest Edge</Form.Label>
						<Form.Control type="text" placeholder="1200" name="longestEdge" value={state.longestEdge} onChange={e => verifyInput(e.target.value)} />
						<Form.Text className="text-muted">
							In pixels
						</Form.Text>
					</Form.Group>
					<Form.Group>
					{ state.error && 
					<Alert variant="danger">{state.error}</Alert>
					}
						<Form.File id="mediaUpload" label="File Input" disabled={state.error} ref={media} onChange={e => setSelectedFile(e.target.files)} accept="image/*" />
					</Form.Group>
					<Button variant="primary" type="button" onClick={submitImage} disabled={!state.media}>
						Submit
					</Button>
				</Form>
			</Col>
			<Col lg="9" md="6">
				{
					state.submitClicked && state.media &&
					<ImageProcessor media={state.media} longestEdge={state.longestEdge} />
				}
			</Col>
		</Row>
      </Container>
    </div>
  );
}

export default Media;