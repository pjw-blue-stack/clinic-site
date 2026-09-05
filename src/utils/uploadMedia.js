import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadMedia = async (file, folder = 'media') => {
  if (!file) return null;
  const uniqueName = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `${folder}/${uniqueName}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
};
