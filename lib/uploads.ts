import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * Saves an uploaded file and returns a URL.
 * - If BLOB_READ_WRITE_TOKEN is set (e.g. on Vercel): uploads to Vercel Blob and returns the blob URL.
 *   Images are stored outside the database, so they don't use your 0.5GB DB quota.
 * - Otherwise: saves to public/uploads (local dev only; not persisted on Vercel serverless).
 */
export async function saveUpload(file: File): Promise<string> {
  const ext = path.extname(file.name) || ".jpg";
  const base = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const filename = `${base}${ext}`;
  const pathname = `projects/${filename}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(pathname, file, { access: "public" });
    return blob.url;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const dir = UPLOAD_DIR;
  await mkdir(dir, { recursive: true });
  const filepath = path.join(dir, filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}
