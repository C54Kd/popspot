"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import instance from "@/utils/instance";
import UserList from "../components/UserList/UserList";
import Pagination from "../components/Pagination/Pagination";

export default function Page() {
  const [res, setRes] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instance.get(
          `/popupstore/users?${searchParams.toString()}`
        );
        setRes(data);
      } catch (error) {
        console.error(error);
        window.alert("권리자 권한이 없습니다");
        router.push("/");
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <>
      {/* <UserDashboard
        data={res || []}
        totalUsers={res?.totalUsers}
        newUserToday={res?.newUserToday}
      /> */}
      <UserList userData={res?.data} />
      <Pagination currentPage={res?.currentPage} totalPages={res?.totalPages} />
    </>
  );
}
