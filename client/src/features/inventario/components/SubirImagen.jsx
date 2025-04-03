import React, { useState } from "react";
import { Uploader, Message, Loader, toaster } from "rsuite";
import FileUploadIcon from "@rsuite/icons/FileUpload";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

// Función para subir la imagen al backend
const SubirImagen = ({ value, onChange }) => {
  const [uploading, setUploading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState(null);

  function previewFile(file, callback) {
    if (!file || !(file instanceof Blob)) {
      console.error("Archivo inválido en previewFile:", file);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  }
const urlImg = BASE_URL+`/img/upload`
  return (
    <Uploader
      name="img"
      fileListVisible={false}
      listType="picture"
      action={urlImg}
      onUpload={(file) => {
        setUploading(true);
        previewFile(file.blobFile, (value) => {
          setFileInfo(value);
        });
        value = file.name;
      }}
      onSuccess={(response, file) => {
        setUploading(false);
        toaster.push(<Message type="success">Subido exitosamente</Message>);
        onChange(response.fileName);
        console.log(response);
      }}
      onError={(error) => {
        setFileInfo(null);
        setUploading(false);
        toaster.push(<Message type="error">Error al subir</Message>);
        console.log(error);
      }}
    >
      <button type="button" style={{ width: 150, height: 150 }}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} width="100%" height="100%" />
        ) : (
          <FileUploadIcon style={{ fontSize: 120 }} />
        )}
      </button>
    </Uploader>
  );
};

export default SubirImagen;
