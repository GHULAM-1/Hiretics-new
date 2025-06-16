"use client";

import { Sidebar } from "@/components/layout/SideBar";
import { Header } from "@/components/layout/Header";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCampaign,
  archiveCampaign,
  favoriteCampaign,
  updateCampaign,
} from "@/api/campaign/api";
import { Campaign } from "@/types/campaign";
import {
  CheckCircle,
  Trash2,
  Edit,
  Link,
  Heart,
  Share2,
  Link2,
  Star,
  Pen,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import CreateCampaign from "@/components/campaign-creation/Dialouges";

export default function CampaignPage() {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getCampaign(params.id as string)
        .then(setCampaign)
        .catch(console.error);
    }
  }, [params.id]);

  const handleArchive = async () => {
    if (!campaign?.id || !campaign) return;

    try {
      setIsArchiving(true);
      await archiveCampaign(campaign.id);
      toast.success("Campaign moved to trash");
      router.push("/");
    } catch (error) {
      toast.error("Failed to archive campaign");
      console.error(error);
    } finally {
      setIsArchiving(false);
      setShowArchiveDialog(false);
    }
  };

  const handleFavorite = async () => {
    if (!campaign?.id || !campaign) return;
    const newValue = !campaign.is_favorite;
    try {
      const updated = await favoriteCampaign(campaign.id, newValue);
      setCampaign(updated);
      toast.success(
        newValue
          ? "Campaign marked as favorite"
          : "Campaign removed from favorites"
      );
    } catch (error) {
      toast.error("Failed to update favorite status");
      console.error(error);
    }
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleSave = async (data: any) => {
    if (!campaign?.id || !campaign) return;
    await updateCampaign(campaign.id, data);
    const updated = await getCampaign(campaign.id);
    setCampaign(updated);
    setEditDialogOpen(false);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  };

  return (
    <div className="w-full bg-muted/20">
      <div className="max-w-[1440px] mx-auto flex px-0 lg:px-6 lg:pt-6 pt-2">
        <div className="border-[#E4E4E7] border-[1px] shadow-md rounded-[6px] h-screen">
          <Sidebar
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <MobileHeader
            onMobileMenuClick={() => setIsMobileOpen(true)}
            title={campaign?.name || "Campaign Details"}
          />

          <Header
            title={campaign?.name || "Campaign Details"}
            subtitle={`${campaign?.company_name}`}
            user={{ name: "Abdul Moiz", avatarUrl: "" }}
          />

          <div className="flex-1 p-6 overflow-auto">
            {campaign ? (
              <div className="space-y-6">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center space-x-2 text-base">
                  <span
                    className="text-[#16A34A] underline cursor-pointer"
                    onClick={() => router.push("/")}
                  >
                    All Campaigns
                  </span>
                  <span className="text-muted-foreground">›</span>
                  <span className="text-[#16A34A] underline">
                    {campaign.name}
                  </span>
                </div>

                {/* Campaign Header with Status and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#16A34A] rounded-full">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-3xl font-semibold text-[#16A34A] capitalize">
                      {campaign.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 border-[1px] hover:bg-gray-100 rounded-md"
                      onClick={() => setShowArchiveDialog(true)}
                    >
                      <Trash2 className="w-5 h-5 text-[#DC2626]" />
                    </button>
                    <button
                      className="p-2 border-[1px] hover:bg-gray-100 rounded-md"
                      onClick={handleEdit}
                    >
                      <Pen className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      className="p-2 border-[1px] hover:bg-gray-100 rounded-md"
                      onClick={handleCopyLink}
                    >
                      <Link2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      className="p-2 border-[1px] hover:bg-gray-100 rounded-md"
                      onClick={handleFavorite}
                    >
                      <Star
                        className={
                          campaign?.is_favorite
                            ? "w-5 h-5 text-yellow-400 fill-yellow-400"
                            : "w-5 h-5 text-gray-600"
                        }
                        fill={campaign?.is_favorite ? "currentColor" : "none"}
                      />
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium flex items-center gap-2"
                      onClick={handleCopyLink}
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  Loading campaign details...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Campaign</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive this campaign? It will be moved
              to trash.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isArchiving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleArchive}
              disabled={isArchiving}
              className="bg-[#DC2626] hover:bg-[#DC2626]/90 text-white"
            >
              {isArchiving ? "Moving to trash..." : "Move to trash"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {campaign && (
        <CreateCampaign
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          editMode={true}
          campaignId={campaign.id}
          initialValues={{
            id: campaign.id,
            title: campaign.name,
            company: campaign.company_name,
            role: campaign.job_role,
            description: campaign.job_description,
            startDate: campaign.start_date
              ? new Date(campaign.start_date)
              : null,
            endDate: campaign.end_date ? new Date(campaign.end_date) : null,
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
