import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Home = () => {


	const cloudName = "dd0wschpy";
	const uploadPreset = "chococapibara";

	const cloudinaryUlr = () => `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

	const [file, setFile] = useState(null);

	const [successMessage, setSuccessMessage] = useState("");
	const [publicImageUrl, setPublicImageUrl] = useState("");
	// base64 es un string que mantiene la informacion de archivos multimedia largos
	// se puede usar para mostrar imagenes sin necesidad de subirlas a un servidor

	const handleUploadImage = async (event) => {
		event.preventDefault();

		const formData = new FormData();

		formData.append("file", file);
		formData.append("upload_preset", uploadPreset);

		try {
			const resp = await fetch(cloudinaryUlr(), {
				method: "POST",
				// headers: {
				// 	"Content-Type": "multipart/form-data"
				// },
				body: formData
			});
			const data = await resp.json();
			setPublicImageUrl(data.url);
			setSuccessMessage("Image uploaded successfully!");
		} catch (error) {
			console.error("Error uploading image to Cloudinary:", error);
		}


	};

	useEffect(() => {
	}, [])

	return (
		<div className="text-center mt-5">
			<p className="lead">
				{file && !publicImageUrl && <img src={file ? URL.createObjectURL(file) : rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby"
					width={200} height={200}
					style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
				/>}

				{
					successMessage && <div className="alert alert-success" role="alert">
						{successMessage}
					</div>
				}

				{
					publicImageUrl && <div>
						<p>Uploaded Image:</p>
						<img src={publicImageUrl + `?w=200&h=200&c=fill`} className="img-fluid mb-3" alt="Uploaded" width={200} height={200}
							style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
						/>
						<p><a href={publicImageUrl} target="_blank" rel="noopener noreferrer">{publicImageUrl}</a></p>
					</div>
				}
			</p>
			<form onSubmit={handleUploadImage}>
				<div className="mb-3">
					<label htmlFor="formFile" className="form-label">Default file input example</label>
					<input className="form-control" type="file" onChange={event => setFile(event.target.files[0])} />
				</div>
				<button className="btn btn-primary" type="submit">Upload</button>
			</form>
		</div>
	);
}; 