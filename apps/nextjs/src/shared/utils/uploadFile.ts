import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Services
import Firebase from "@/shared/lib/firebase";

// Constants
import { env } from "@/env/client.mjs";

export interface UploadFileProps {
  file: File;
  directory: string;
}

export const uploadFile = async (props: UploadFileProps): Promise<string> => {
  const { file, directory } = props;

  const app = Firebase.getInstance().getApp();
  const storage = getStorage(app);

  const storageRef = ref(
    storage,
    `${directory}/${uuidv4()}.${file.name.split(".").pop()}`,
  );

  const snapshot = await uploadBytes(storageRef, file);
  const filePath = snapshot.metadata.fullPath;

  return `https://storage.googleapis.com/${env.NEXT_PUBLIC_STORAGE_BUCKET}/${filePath}`;
};
