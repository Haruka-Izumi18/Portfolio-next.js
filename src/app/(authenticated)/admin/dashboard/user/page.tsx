import UsersTable from "./UsersTable";
import { getUsers } from "./user.action";

const PAGE_SIZE = 10;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const query = await searchParams;
  const page = Math.max(1, Number(query.page ?? "1") || 1);
  const search = (query.search ?? "").trim();
  const result = await getUsers(page, search);

  return (
    <UsersTable
      users={result.users}
      total={result.total}
      page={page}
      search={search}
      loadError={result.ok ? null : result.error}
    />
  );
}
