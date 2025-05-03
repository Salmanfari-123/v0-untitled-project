"use client"

import type React from "react"

import DashboardLayout from "@/components/layouts/dashboard-layout"
import PreviewPanel from "@/components/preview/preview-panel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLinkTree } from "@/contexts/linktree-context"
import { Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function ProfilePage() {
  const { state, updateUser } = useLinkTree()
  const [name, setName] = useState(state.user.name)
  const [username, setUsername] = useState(state.user.username)
  const [bio, setBio] = useState(state.user.bio)
  const [profilePicture, setProfilePicture] = useState(state.user.profilePicture)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    setName(state.user.name)
    setUsername(state.user.username)
    setBio(state.user.bio)
    setProfilePicture(state.user.profilePicture)
  }, [state.user])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setPreviewUrl(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateUser({
      name,
      username,
      bio,
      profilePicture: previewUrl || profilePicture,
    })

    toast.success("Profile updated successfully")
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold">Edit Profile</h1>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border">
                      {previewUrl || profilePicture ? (
                        <img src={previewUrl || profilePicture} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">
                          <Upload className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <Label
                      htmlFor="profile-picture"
                      className="cursor-pointer text-sm text-emerald-600 hover:text-emerald-700"
                    >
                      Upload Image
                    </Label>
                    <Input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="flex rounded-md overflow-hidden">
                        <div className="bg-gray-100 text-gray-500 px-3 py-2 text-sm border border-r-0 border-input rounded-l-md">
                          linkforest.app/
                        </div>
                        <Input
                          id="username"
                          className="rounded-none rounded-r-md"
                          value={username}
                          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell people about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                  <p className="text-sm text-gray-500">{bio.length}/150 characters</p>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:block">
          <PreviewPanel
            previewUser={{
              ...state.user,
              name,
              username,
              bio,
              profilePicture: previewUrl || profilePicture,
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
