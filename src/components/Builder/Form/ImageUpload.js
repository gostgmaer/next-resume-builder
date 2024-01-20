// import React, { useState } from 'react';


// function ImageUpload() {
//   const [image, setImage] = useState(null);
//   const [progress, setProgress] = useState(0);

//   const handleChange = (e) => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     const uploadTask = fire.ref(`images/${image.name}`).put(image);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(progress);
//       },
//       (error) => {
//         console.error(error);
//       },
//       () => {
//         storage
//           .ref('images')
//           .child(image.name)
//           .getDownloadURL()
//           .then((url) => {
//             console.log('File available at:', url);
//             // You can use the URL to display the uploaded image.
//           });
//       }
//     );
//   };

//   return (
//     <div>
//       <progress value={progress} max="100" />
//       <input type="file" onChange={handleChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

// export default ImageUpload;
