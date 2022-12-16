import { trpc } from "@/utils/trpc";
import { type NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type User } from "@prisma/client";

// components imports
import Table from "@/components/Table";
import dayjs from "dayjs";

const Users: NextPage = () => {
  // trpc
  const { data: users, status } = trpc.user.allUsers.useQuery(undefined, {
    staleTime: 3000,
  });

  // table column
  const profileColumns = useMemo<ColumnDef<User, any>[]>(
    () => [
      {
        accessorKey: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "email",
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (d) => dayjs(d.createdAt).format("DD/MM/YYYY, hh:mmA"),
        id: "createdAt",
        cell: (info) => info.getValue(),
        header: () => <span>Created at</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "role",
        cell: (info) => info.getValue(),
        header: () => <span>Role</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (d) => (d.active ? "Active" : "Inactive"),
        id: "active",
        cell: (info) => info.getValue(),
        header: () => <span>Status</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>Users | Top Ten Agro Chemicals</title>
      </Head>
      <main className="min-h-screen pt-5 pb-10 container-res">
        {status === "loading" ? (
          <p
            role="progressbar"
            className="text-sm font-medium text-neutral-700 md:text-base"
          >
            Loading...
          </p>
        ) : (
          status === "success" && (
            <Table intent="users" tableData={users} columns={profileColumns} />
          )
        )}
      </main>
    </>
  );
};

export default Users;