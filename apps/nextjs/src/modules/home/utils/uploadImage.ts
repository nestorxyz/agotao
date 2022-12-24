import { GoogleAuth, JWT } from "google-auth-library";
import { Storage } from "@google-cloud/storage";

export const uploadImage = async (file: File) => {
  // Authenticate with the Google Cloud Storage API using the service account key file
  const authClient = new GoogleAuth({
    keyFile: "/path/to/service-account-key.json",
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });
  const auth = await authClient.authorize();
  const jwtClient = new JWT({
    email: auth.client_email,
    key: auth.private_key,
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });
  const accessToken = await jwtClient.getAccessToken();

  // Create a Storage client
  const storage = new Storage({
    projectId: "your-project-id",
    credentials: {
      access_token: accessToken,
    },
  });

  // Get a reference to the Cloud Storage bucket
  const bucket = storage.bucket("your-bucket-name");

  // Upload the file to Cloud Storage
  await bucket.upload(file, {
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });
};
