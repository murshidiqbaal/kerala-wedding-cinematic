import { toast } from "sonner";

export interface GDriveFolder {
  id: string;
  name: string;
  shareLink: string;
}

export interface UploadProgressItem {
  id: string;
  name: string;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  url?: string;
}

// Subfolder names matching the project requirements
export const ALBUM_CATEGORIES = [
  "Ceremony",
  "Reception",
  "Couple Shoot",
  "Family Photos",
  "Candid Moments",
  "Stage Photos",
];

// Fallback placeholder/default links in case Google Drive integration is not active yet
export const DEFAULT_ALBUMS = [
  {
    title: "Ceremony",
    subtitle: "Sacred moments from the traditional Kerala Hindu wedding",
    link: "https://drive.google.com/drive/folders/1placeholderCeremony",
    image: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Reception",
    subtitle: "Celebrations, delicious feast, and greetings with loved ones",
    link: "https://drive.google.com/drive/folders/1placeholderReception",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Couple Shoot",
    subtitle: "Ethereal pre-wedding and post-wedding cinematic couple frames",
    link: "https://drive.google.com/drive/folders/1placeholderCouple",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Family Photos",
    subtitle: "Heartwarming portraits with parents, siblings, and close kin",
    link: "https://drive.google.com/drive/folders/1placeholderFamily",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Candid Moments",
    subtitle: "Laughter, tears of joy, and emotional snapshots captured live",
    link: "https://drive.google.com/drive/folders/1placeholderCandid",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Stage Photos",
    subtitle: "Grand stage poses, greetings with guests, and designer sets",
    link: "https://drive.google.com/drive/folders/1placeholderStage",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop",
  },
];

/**
 * Creates a public Google Drive permission (role=reader, type=anyone) on a folder or file.
 */
export async function makeItemPublic(itemId: string, token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${itemId}/permissions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "reader",
          type: "anyone",
        }),
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error making item public:", error);
    return false;
  }
}

/**
 * Setup Google Drive Folder hierarchy.
 * Returns the created or found subfolders mapped.
 */
export async function setupDriveStructure(token: string): Promise<GDriveFolder[]> {
  try {
    // 1. Search for existing Main Folder
    const mainFolderName = "Rohith & Anjana Wedding Memories";
    const mainFolderQuery = encodeURIComponent(
      `name='${mainFolderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
    );
    
    const searchResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${mainFolderQuery}&fields=files(id,name)`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const searchResult = await searchResponse.json();
    let mainFolderId = "";

    if (searchResult.files && searchResult.files.length > 0) {
      mainFolderId = searchResult.files[0].id;
    } else {
      // Create Main Folder
      const createResponse = await fetch("https://www.googleapis.com/drive/v3/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: mainFolderName,
          mimeType: "application/vnd.google-apps.folder",
        }),
      });

      const newFolder = await createResponse.json();
      mainFolderId = newFolder.id;
      
      // Make it public
      await makeItemPublic(mainFolderId, token);
    }

    if (!mainFolderId) throw new Error("Could not acquire Google Drive main folder ID");

    // 2. Fetch existing subfolders inside main folder
    const subQuery = encodeURIComponent(
      `'${mainFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`
    );
    const subSearchResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${subQuery}&fields=files(id,name,webViewLink)`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const subSearchResult = await subSearchResponse.json();
    const existingSubfolders = subSearchResult.files || [];

    const finalSubfolders: GDriveFolder[] = [];

    // 3. Ensure all 6 categories exist
    for (const category of ALBUM_CATEGORIES) {
      const match = existingSubfolders.find((f: any) => f.name.toLowerCase() === category.toLowerCase());
      
      if (match) {
        finalSubfolders.push({
          id: match.id,
          name: category,
          shareLink: match.webViewLink || `https://drive.google.com/drive/folders/${match.id}`,
        });
      } else {
        // Create subfolder
        const subCreateResponse = await fetch("https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: category,
            mimeType: "application/vnd.google-apps.folder",
            parents: [mainFolderId],
          }),
        });

        const newSub = await subCreateResponse.json();
        await makeItemPublic(newSub.id, token);
        
        finalSubfolders.push({
          id: newSub.id,
          name: category,
          shareLink: newSub.webViewLink || `https://drive.google.com/drive/folders/${newSub.id}`,
        });
      }
    }

    return finalSubfolders;
  } catch (error) {
    console.error("Error setting up drive structure:", error);
    toast.error("Google Drive connection encountered structural errors.");
    throw error;
  }
}

/**
 * Uploads a file directly to Google Drive via multipart binary streaming.
 * Tracks progress dynamically.
 */
export function uploadFileWithProgress(
  file: File,
  folderId: string,
  token: string,
  onProgress: (progress: number) => void,
  onSuccess: (fileUrl: string) => void,
  onError: (err: any) => void
) {
  try {
    const boundary = "-------314159265358979323846";
    const delimiter = "\r\n--" + boundary + "\r\n";
    const closeDelim = "\r\n--" + boundary + "--";

    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [folderId],
    };

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    
    reader.onload = function () {
      const arrayBuffer = reader.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);

      // Create multipart body
      const metadataPart = delimiter +
        'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
        JSON.stringify(metadata) +
        '\r\n';

      const fileHeaderPart = delimiter +
        'Content-Type: ' + file.type + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n\r\n';

      // Convert array buffer to base64 string safely
      let binary = "";
      const len = uint8Array.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const base64Data = window.btoa(binary);
      
      const body = metadataPart + fileHeaderPart + base64Data + closeDelim;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink");
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.setRequestHeader("Content-Type", "multipart/related; boundary=" + boundary);

      // Progress Tracker
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          onProgress(percentComplete);
        }
      };

      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          // Set file permission to anyone can read
          await makeItemPublic(response.id, token);
          
          // Generate direct thumbnail/preview-friendly URL if content link matches
          const previewUrl = response.webViewLink || `https://drive.google.com/uc?export=view&id=${response.id}`;
          onSuccess(previewUrl);
        } else {
          onError(xhr.statusText || "Upload failed with status code " + xhr.status);
        }
      };

      xhr.onerror = () => {
        onError("Network request failed.");
      };

      xhr.send(body);
    };

    reader.onerror = (e) => {
      onError("FileReader encountered file reading errors.");
    };
  } catch (error: any) {
    onError(error.message || "Failed initializing multipart transmission.");
  }
}
