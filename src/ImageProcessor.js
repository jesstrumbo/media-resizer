import React, { useState, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import { Image, Alert, Spinner } from 'react-bootstrap';

function ImageProcessor(props) {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [mediaSrc, setMediaSrc] = useState("");
	
	useEffect(() => {
		let longestEdge = 0;
		if (!props.longestEdge || props.longestEdge < 1) {
			longestEdge = 200;
		}
		else {
			longestEdge = props.longestEdge;
		}
		if (!props.media) {
			setError("No file was found.");
		}
		if (!(props.media instanceof File)) {
			setError("Could not read uploaded file.");
		}
		else {
			try {
                Resizer.imageFileResizer(
                props.media,
                longestEdge,
                longestEdge,
                'PNG',
                100,
                0,
                uri => {
                    setLoading(false);
					setMediaSrc(uri);
                },
                'base64',
                10,
                10,
                );
            }   catch(err) {
                    setError(err.message);
            }
		}
  });
	return (
		<div>
			{ loading &&
				<Spinner animation="border" role="status" variant="secondary">
					<span className="sr-only">Loading...</span>
				</Spinner>
			}
			{	!loading && !error && mediaSrc &&
				<Image src={mediaSrc} />
			}
			{	error &&
				<Alert variant="danger">Could not process image file.</Alert>
			}
		</div>
	);
}

export default ImageProcessor;