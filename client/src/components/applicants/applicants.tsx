"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { getCampaign } from "@/api/campaign/api"
import { Campaign } from "@/types/campaign"
import { uploadCV } from "@/api/cv/api"
import { toast } from "sonner"

interface ApplicantsProps {
  title?: string
  description?: string
  companyName?: string
  companyAvatar?: string
  id?: string
}

export default function Applicants({
  id,
}: ApplicantsProps) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleUploadCV = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && campaign?.id) {
      setUploading(true)
      try {
        await uploadCV({ campaignId: campaign.id, file })
        toast.success("CV uploaded successfully")
      } catch (error) {
        toast.error("Failed to upload CV")
      } finally {
        setUploading(false)
      }
    }
  }


  useEffect(() => {
    if (id) {
      getCampaign(id)
        .then(setCampaign)
        .catch(console.error)
    }
  }, [id])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-4xl font-bold text-[#16A34A]">Hiretics</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Job Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{campaign?.job_role}</h1>

          {/* Job Description Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Job Description</h2>
            <div className="text-gray-600 leading-relaxed whitespace-pre-line">{campaign?.job_description}</div>
          </div>

          {/* Company Info */}
          <div className="flex items-center space-x-3 mb-8">
            <Avatar className="h-12 w-12">
              <AvatarImage src={campaign?.company_name || "/placeholder.svg"} alt={campaign?.company_name || "Company Name"} />
              <AvatarFallback className="bg-primary text-white font-semibold">{campaign?.company_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium text-gray-900">{campaign?.company_name}</span>
          </div>

          {/* Upload CV Button */}
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            />
            <Button
              onClick={handleUploadCV}
              className="w-full bg-black hover:cursor-pointer hover:bg-gray-800 text-white py-3 text-base font-medium"
              disabled={uploading}
            >
              {uploading ? (
                <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Upload CV
            </Button>
            <p className="text-xs text-gray-500 text-center">list of supported CV formats</p>
          </div>
        </div>
      </div>
    </div>
  )
}
