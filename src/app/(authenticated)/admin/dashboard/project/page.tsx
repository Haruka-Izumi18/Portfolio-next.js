import ProjectsTable from "./ProjectsTable";
import { getProjects } from "./project.action";

const PAGE_SIZE = 10;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const query = await searchParams;
  const page = Math.max(1, Number(query.page ?? "1") || 1);
  const search = (query.search ?? "").trim();
  const result = await getProjects(page, search);

  return (
    <ProjectsTable
      projects={result.projects}
      total={result.total}
      page={page}
      search={search}
      loadError={result.ok ? null : result.error}
    />
  );
}
