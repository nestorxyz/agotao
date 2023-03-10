import React, { useEffect, useState } from "react";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { BiImageAdd } from "react-icons/bi";
import * as Label from "@radix-ui/react-label";
import classNames from "classnames";
import Image from "next/image";

import { determineFileType, MimeTypes } from "./types";
import { Spinner, ErrorMessage } from "../index";

enum FileInputError {
  failedLoadingBlob = "Ha habido un error cargando la información del Archivo digital. Por favor contacta con el equipo de soporte.",
  generalMimeTypeValidationError = "El archivo que has intentado subir no tiene un formato generalmente válido por nuestra plataforma.",
  mimeTypeNotSupportedError = "El archivo no tiene un formato válido.",
  onDropFileError = "Ha habido un error al cargar el archivo.",
  maxFileSizeError = "Sube un archivo de menos de 5MB.",
}

const generalMimeTypeSupport = Object.values(MimeTypes);

enum InputFileState {
  loading = "loading",
  showUrl = "showUrl",
  empty = "empty",
  showFile = "showFile",
  showInfoFile = "showInfoFile",
  loadingFile = "loadingFile",
}

interface SquareFileInputProps {
  className?: string;
  file: File | null;
  label?: string;
  mimeTypesSupported?: Array<string>;
  setError?: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  showLocalError?: boolean;
  url?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const SquareFileInput = (props: SquareFileInputProps) => {
  const {
    className,
    label,
    mimeTypesSupported,
    setError,
    setErrorMessage,
    setFile,
    showLocalError = false,
  } = props;

  const [url, setUrl] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [dragEnter, SetDragEnter] = useState<boolean>(false);
  const [inputState, setInputState] =
    useState<keyof typeof InputFileState>("empty");
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (props.url) {
      setUrl(props.url);
      setInputState("showUrl");
    }
  }, [props.url]);

  useEffect(() => {
    if (fileUrl != null) setInputState("showFile");
  }, [fileUrl]);

  const loadFileToState = async (rawFile: File) => {
    // General mimetypes validation for avoid misspelling or discarding weird types.
    if (generalMimeTypeSupport.some((mts) => mts === rawFile.type) == false)
      return throwError(FileInputError.generalMimeTypeValidationError);

    // Validate max file size
    if (rawFile.size > MAX_FILE_SIZE)
      return throwError(FileInputError.mimeTypeNotSupportedError);

    if (mimeTypesSupported) {
      if (mimeTypesSupported.some((mts) => mts === rawFile.type) == false)
        return throwError(FileInputError.mimeTypeNotSupportedError);

      setFile(rawFile);
    }

    const type = determineFileType(rawFile.type as MimeTypes);
    if (type === "image") {
      cleanError();
      setFile(rawFile);
      setFileUrl(URL.createObjectURL(rawFile));
    } else {
      throwError(FileInputError.mimeTypeNotSupportedError);
    }
  };

  const throwError = (error: FileInputError) => {
    setErrorMessage && setErrorMessage(error);
    setError && setError(true);
    setLocalError(error);
  };

  const cleanError = () => {
    setErrorMessage && setErrorMessage(null);
    setError && setError(false);
    setLocalError(null);
  };

  const onClickRemoveInput = () => {
    setFile(null);
    setUrl(null);
    setFileUrl(null);
    setInputState("empty");
  };

  const onClickInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      const file = e.target.files[0];

      if (file === undefined) {
        throwError(FileInputError.failedLoadingBlob);
      } else {
        loadFileToState(file);
      }
    } else {
      throwError(FileInputError.failedLoadingBlob);
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    SetDragEnter(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    SetDragEnter(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const file = e.dataTransfer.files[0];

      if (file === undefined) {
        throwError(FileInputError.failedLoadingBlob);
      } else {
        loadFileToState(file);
      }

      SetDragEnter(false);
    } catch (e) {
      throwError(FileInputError.onDropFileError);
    }
  };

  const render = (
    <div
      className={classNames(
        (inputState == "empty" ||
          inputState == "showInfoFile" ||
          inputState == "loadingFile") &&
          "rounded-md border-[3px] border-dashed border-gray-300",
        inputState == "showFile" && "",
        "group relative flex h-40 w-40 cursor-pointer items-center justify-center",
      )}
    >
      {(inputState == "showUrl" || inputState == "showFile") && (
        <div
          className={classNames(
            dragEnter && "bg-gray-100 opacity-70",
            "absolute inset-0 flex rounded-md",
          )}
          onDragEnter={(e) => onDragEnter(e)}
          onDragLeave={(e) => onDragLeave(e)}
          onDragOver={(e) => onDragEnter(e)}
          onDrop={(e) => onDrop(e)}
        >
          <label
            className={
              "flex h-full w-full cursor-pointer items-center justify-center bg-white bg-opacity-50 opacity-0 transition duration-200 ease-in-out group-hover:opacity-70"
            }
          >
            <PlusIcon className="absolute h-9 w-9 text-primary" />
            <input
              className={"hidden"}
              id={"iw_inputFileCover"}
              onChange={onClickInput}
              type={"file"}
            />
          </label>
          <div
            className={
              "absolute -top-2 -right-2 z-50 m-auto cursor-pointer rounded-full bg-white bg-opacity-100 p-1 opacity-0 shadow-lg transition duration-200 ease-in-out hover:bg-gray-200 group-hover:opacity-100"
            }
            onClick={onClickRemoveInput}
          >
            <Cross1Icon className="h-3 w-3 text-gray-500" />
          </div>
        </div>
      )}
      {inputState == "empty" && (
        <div
          className={classNames(
            dragEnter && "bg-gray-100 opacity-70",
            "my-4 flex h-full w-full flex-col items-center justify-center text-sm font-medium",
          )}
          onDragEnter={(e) => onDragEnter(e)}
          onDragLeave={(e) => onDragLeave(e)}
          onDragOver={(e) => onDragEnter(e)}
          onDrop={(e) => onDrop(e)}
        >
          <label
            className={
              "flex h-full w-full cursor-pointer flex-col items-center justify-center gap-1 pr-1"
            }
          >
            <BiImageAdd className="h-9 w-9 fill-gray-500 group-hover:stroke-primary" />
            <input
              className={"hidden"}
              id={"iw_inputFileCover"}
              onChange={onClickInput}
              type={"file"}
              accept={
                mimeTypesSupported ? mimeTypesSupported.join(",") : "image/*"
              }
            />
            <span className="w-[70%] text-center text-sm font-medium leading-5 text-gray-400">
              JPG, PNG hasta 10MB
            </span>
          </label>
        </div>
      )}
      {inputState == "showFile" && fileUrl && (
        <div className={"h-full w-full rounded-md bg-gray-100"}>
          {
            <img
              alt={""}
              src={fileUrl}
              width={400}
              height={400}
              className="h-full w-full rounded-md object-cover"
            />
          }
        </div>
      )}
      {inputState == "showUrl" && url && (
        <img
          alt={""}
          width={400}
          height={400}
          className="h-full w-full rounded-md object-cover"
          src={url}
        />
      )}
      {inputState == "loadingFile" && (
        <div
          className={
            "my-4 flex h-full w-full flex-col items-center justify-center text-sm font-medium"
          }
        >
          <Spinner className="h-6 w-6" />
        </div>
      )}
    </div>
  );

  return (
    <div className={classNames(className, "space-y-1")}>
      {label && (
        <Label.Root className="text-sm font-medium text-gray-600">
          {label}
        </Label.Root>
      )}
      {render}
      {localError && showLocalError && (
        <ErrorMessage>{localError}</ErrorMessage>
      )}
    </div>
  );
};
