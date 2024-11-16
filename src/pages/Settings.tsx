"use client";

// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AvatarEditor from "react-avatar-editor";
import { Link } from "react-router-dom";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig"; // Firebase auth import
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [shortBio, setShortBio] = useState<string>("");
  const [fullBio, setFullBio] = useState<string>("");
  const navigate = useNavigate();
  const editorRef = useRef<any>(null);
  const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the selected image as the new source
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const imageURL = canvas.toDataURL();
      try {
        await updateProfile(user, { photoURL: imageURL }); // Update Firebase profile picture
        toast.success("Profile picture updated!");
      } catch {
        toast.error("Error updating profile picture");
      }
    }
  };

  const handleChange = async (type: string, value: string) => {
    try {
      switch (type) {
        case "name":
          await updateProfile(user, { displayName: value });
          setName(value);
          toast.success("Name updated successfully!");
          break;
        case "avatar":
          if (editorRef.current) {
            const canvas = editorRef.current.getImage();
            const imageURL = canvas.toDataURL();
            await updateProfile(user, { photoURL: imageURL });
            toast.success("Profile picture updated!");
          }
          break;
        case "password":
          if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
          }
          {
            const credential = EmailAuthProvider.credential(
              user.email,
              password
            );
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            toast.success("Password updated successfully!");
          }
          break;
        case "shortBio":
          setShortBio(value);
          break;
        case "fullBio":
          setFullBio(value);
          break;
        case "twitter":
          setTwitter(value);
          break;
        case "github":
          setGithub(value);
          break;
        case "linkedin":
          setLinkedin(value);
          break;
        case "facebook":
          setFacebook(value);
          break;
        case "website":
          setWebsite(value);
          break;
        default:
          break;
      }
    } catch {
      toast.error(`Error updating ${type}`);
    }
  };

  const handleSave = () => {
    handleChange("name", name);
    handleChange("email", email);
    handleChange("shortBio", shortBio);
    handleChange("fullBio", fullBio);
    handleChange("twitter", twitter);
    handleChange("github", github);
    handleChange("linkedin", linkedin);
    handleChange("facebook", facebook);
    handleChange("website", website);

    // Close the password form after saving
    setShowPasswordForm(false);
  };

  const handleDiscard = () => {
    setName(user?.displayName || "");
    setShortBio("");
    setFullBio("");
    setTwitter("");
    setGithub("");
    setLinkedin("");
    setFacebook("");
    setWebsite("");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-purple-600"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-xl font-bold text-gray-900">
              DiscreteLearn
            </span>
          </Link>
          <div className="space-x-2">
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">
              <Button variant="outline">VIEW</Button>
            </Link>
            <Button variant="outline" onClick={handleDiscard}>
              DISCARD
            </Button>
            <Button onClick={handleSave}>SAVE</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <AvatarEditor
                ref={editorRef}
                image={image || user?.photoURL || "/default-avatar.png"} // Use selected image or default avatar
                width={150}
                height={150}
                border={50}
                borderRadius={75}
                scale={1.2}
              />
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                } // Trigger file input click
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit profile picture</span>
              </Button>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <Button onClick={handleSaveAvatar} className="mt-4">
              Save Avatar
            </Button>
            <h1 className="text-2xl font-bold mt-4">Emmanuel Adoum</h1>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">ACCOUNT SETTINGS</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Set a permanent password to login to your account.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                  >
                    Change Password
                  </Button>
                  {showPasswordForm && (
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="oldPassword">Old Password</Label>
                        <Input
                          type="password"
                          id="oldPassword"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          type="password"
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={() => handleChange("password", password)}
                      >
                        Save Password
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>2-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    An additional layer of security to your account during
                    login.
                  </p>
                  <Button variant="outline">Change Methods</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">PROFILE INFORMATION</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={user?.email} disabled />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="legalName">Legal Name</Label>
                  <Input
                    id="legalName"
                    defaultValue="Adoum Ouang-namou Emmanuel"
                    disabled
                  />
                  <p className="text-sm text-gray-600">
                    This name will appear on certificates issued to you by
                    educative
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signatoryName">Signatory Name</Label>
                  <Input
                    id="signatoryName"
                    placeholder="Add your signatory name"
                  />
                  <p className="text-sm text-gray-600">
                    This name is used to sign certificates issued on courses
                    published by you
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shortBio">Short Bio</Label>
                  <Textarea
                    id="shortBio"
                    value={shortBio}
                    placeholder="What defines you"
                    onChange={(e) => setShortBio(e.target.value)}
                    className="h-32"
                  />
                  <p className="text-sm text-gray-600">256 max characters</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullBio">Full Bio</Label>
                  <Textarea
                    id="fullBio"
                    value={fullBio}
                    placeholder="Share your story"
                    onChange={(e) => setFullBio(e.target.value)}
                    className="h-48"
                  />
                  <p className="text-sm text-gray-600">8192 max characters</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    placeholder="Twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    placeholder="Github"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    placeholder="LinkedIn"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    placeholder="Facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Personal Website</Label>
                <Input
                  placeholder="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            <Button variant="destructive" className="flex items-center">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}
