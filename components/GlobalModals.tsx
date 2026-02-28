"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { QuoteModal } from "@/components/QuoteModal";
import { ProjectModal } from "@/components/ProjectModal";

function GlobalModalsInner() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const quoteOpen = searchParams.get("quote") === "1";
  const projectSlug = searchParams.get("project");

  const closeQuote = () => {
    const url = pathname || "/";
    router.replace(url);
  };

  const closeProject = () => {
    const url = pathname || "/";
    router.replace(url);
  };

  return (
    <>
      {quoteOpen && (
        <QuoteModal onClose={closeQuote} />
      )}
      {projectSlug && (
        <ProjectModal
          slug={projectSlug}
          onClose={closeProject}
          onRequestQuote={() => {
            closeProject();
            setTimeout(() => router.push(`${pathname || "/"}?quote=1`), 100);
          }}
        />
      )}
    </>
  );
}

export function GlobalModals() {
  return (
    <Suspense fallback={null}>
      <GlobalModalsInner />
    </Suspense>
  );
}
