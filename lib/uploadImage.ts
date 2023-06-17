import { ID, storage } from "@/appwrite";

const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile("6479fe68a5399948df32", ID.unique(), file);
    return fileUploaded;
};

export default uploadImage;
