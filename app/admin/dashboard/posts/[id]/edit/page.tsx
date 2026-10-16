import { PostEditorScreen } from "@/components/adminDashboard/PostEditorScreen";
export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) { return <PostEditorScreen id={(await params).id}/>; }
