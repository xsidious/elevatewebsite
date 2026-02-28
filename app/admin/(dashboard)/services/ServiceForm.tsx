"use client";

import Link from "next/link";
import { updateService } from "./actions";

type Initial = {
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  sortOrder: number;
};

type Props = {
  serviceId: string;
  initial: Initial;
};

export function ServiceForm({ serviceId, initial }: Props) {
  return (
    <form action={updateService} className="space-y-4">
      <input type="hidden" name="id" value={serviceId} />
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={initial.name}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="tagline" className="block text-sm font-medium text-zinc-700 mb-1">
          Tagline (optional)
        </label>
        <input
          id="tagline"
          name="tagline"
          type="text"
          defaultValue={initial.tagline}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="shortDescription" className="block text-sm font-medium text-zinc-700 mb-1">
          Short description
        </label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          rows={2}
          defaultValue={initial.shortDescription}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="longDescription" className="block text-sm font-medium text-zinc-700 mb-1">
          Long description
        </label>
        <textarea
          id="longDescription"
          name="longDescription"
          rows={6}
          defaultValue={initial.longDescription}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="sortOrder" className="block text-sm font-medium text-zinc-700 mb-1">
          Sort order
        </label>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={initial.sortOrder}
          className="w-24 rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm hover:bg-primary-700 transition"
        >
          Save changes
        </button>
        <Link
          href="/admin/services"
          className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
