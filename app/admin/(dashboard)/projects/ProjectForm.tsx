"use client";

import Image from "next/image";

type ProjectImage = { id: string; url: string; alt: string | null };

type Initial = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  location: string;
  published: boolean;
  featuredImageUrl: string | null;
  gallery: ProjectImage[];
};

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  categories: string[];
  initial?: Initial;
};

export function ProjectForm({ action, categories, initial }: ProjectFormProps) {
  return (
    <form action={action} encType="multipart/form-data" className="space-y-6 max-w-2xl">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initial?.title}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          defaultValue={initial?.slug}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
          placeholder="my-project"
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
        <select
          id="category"
          name="category"
          defaultValue={initial?.category}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Location (optional)</label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={initial?.location}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="shortDescription" className="block text-sm font-medium text-slate-700 mb-1">Short description</label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          rows={2}
          defaultValue={initial?.shortDescription}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label htmlFor="fullDescription" className="block text-sm font-medium text-slate-700 mb-1">Full description</label>
        <textarea
          id="fullDescription"
          name="fullDescription"
          rows={6}
          defaultValue={initial?.fullDescription}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Featured image</label>
        {initial?.featuredImageUrl && (
          <div className="mb-2 relative w-48 h-32 rounded overflow-hidden bg-slate-100">
            <Image src={initial.featuredImageUrl} alt="" fill className="object-cover" />
          </div>
        )}
        <input type="file" name="featuredImage" accept="image/*" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary-50 file:text-primary-700" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Gallery images</label>
        {initial?.gallery && initial.gallery.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {initial.gallery.map((img) => (
              <div key={img.id} className="relative w-24 h-24 rounded overflow-hidden bg-slate-100">
                <Image src={img.url} alt={img.alt ?? ""} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
        <input type="file" name="gallery" accept="image/*" multiple className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-primary-50 file:text-primary-700" />
        <p className="text-xs text-slate-500 mt-1">Edit: uploading new files replaces existing gallery.</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={initial?.published ?? true}
          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="published" className="text-sm font-medium text-slate-700">Published (visible on site)</label>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
        >
          Save project
        </button>
      </div>
    </form>
  );
}
