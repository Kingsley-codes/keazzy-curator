import { PostDetail } from "@/components/adminDashboard/PostDetail";
export default async function PostPage({ params }: { params: Promise<{ id: string }> }) { return <PostDetail id={(await params).id}/>; }
