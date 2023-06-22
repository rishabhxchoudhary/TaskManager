"use client"
import KanbanBoard from "@/components/KanbanBoard";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession({required: true});
  return (
    <div>
      <Navbar/>
      <KanbanBoard />
    </div>
  )
}
