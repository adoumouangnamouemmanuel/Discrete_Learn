"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pencil,
  Trash2,
  Twitter,
  Github,
  Linkedin,
  Facebook,
  Globe,
} from "lucide-react";
import AvatarEditor from "react-avatar-editor";
import { Link } from "react-router-dom";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
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
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
      // Load saved data from localStorage
      const savedData = JSON.parse(localStorage.getItem("userProfile") || "{}");
      setShortBio(savedData.shortBio || "");
      setFullBio(savedData.fullBio || "");
      setTwitter(savedData.twitter || "");
      setGithub(savedData.github || "");
      setLinkedin(savedData.linkedin || "");
      setFacebook(savedData.facebook || "");
      setWebsite(savedData.website || "");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const imageURL = canvas.toDataURL();
      try {
        await updateProfile(user, { photoURL: imageURL });
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

    // Save data to localStorage
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        shortBio,
        fullBio,
        twitter,
        github,
        linkedin,
        facebook,
        website,
      })
    );

    setEditMode(false);
    toast.success("Profile updated successfully!");
  };

  const handleDiscard = () => {
    setName(user?.displayName || "");
    const savedData = JSON.parse(localStorage.getItem("userProfile") || "{}");
    setShortBio(savedData.shortBio || "");
    setFullBio(savedData.fullBio || "");
    setTwitter(savedData.twitter || "");
    setGithub(savedData.github || "");
    setLinkedin(savedData.linkedin || "");
    setFacebook(savedData.facebook || "");
    setWebsite(savedData.website || "");
    // Remove: setEditMode(false);
  };

  const renderEditableField = (
    label: string,
    value: string,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
    isTextarea: boolean = false
  ) => {
    if (editMode) {
      return isTextarea ? (
        <Textarea value={value} onChange={onChange} className="mt-1" />
      ) : (
        <Input value={value} onChange={onChange} className="mt-1" />
      );
    }
    return (
      <div className="mt-1 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <strong className="text-gray-700">{label}:</strong>
        <p className="mt-1 text-gray-600">{value || "Not provided"}</p>
      </div>
    );
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
              <Button variant="outline">VIEW PROFILE</Button>
            </Link>
            {editMode ? (
              <>
                <Button variant="outline" onClick={handleDiscard}>
                  DISCARD
                </Button>
                <Button onClick={handleSave}>SAVE</Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)}>EDIT</Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <AvatarEditor
                ref={editorRef}
                image={image || user?.photoURL || "/default-avatar.png"}
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
                }
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
            <h1 className="text-2xl font-bold mt-4">{name}</h1>
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

          <section className="shadow p-10 bg-white">
            <h2 className="text-xl font-semibold mb-4">PROFILE INFORMATION</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  {renderEditableField("Full Name", name, (e) =>
                    setName(e.target.value)
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={user?.email} disabled />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shortBio">Short Bio</Label>
                  {renderEditableField(
                    "Short Bio",
                    shortBio,
                    (e) => setShortBio(e.target.value),
                    true
                  )}
                  <p className="text-sm text-gray-600">256 max characters</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullBio">Full Bio</Label>
                  {renderEditableField(
                    "Full Bio",
                    fullBio,
                    (e) => setFullBio(e.target.value),
                    true
                  )}
                  <p className="text-sm text-gray-600">8192 max characters</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  {editMode ? (
                    renderEditableField("Twitter", twitter, (e) =>
                      setTwitter(e.target.value)
                    )
                  ) : (
                    <a
                      href={`https://twitter.com/${twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <Twitter className="w-5 h-5 mr-2 text-blue-400" />
                      <span className="text-gray-600">
                        {twitter || "Not provided"}
                      </span>
                    </a>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  {editMode ? (
                    renderEditableField("GitHub", github, (e) =>
                      setGithub(e.target.value)
                    )
                  ) : (
                    <a
                      href={`https://github.com/${github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <Github className="w-5 h-5 mr-2 text-gray-700" />
                      <span className="text-gray-600">
                        {github || "Not provided"}
                      </span>
                    </a>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  {editMode ? (
                    renderEditableField("LinkedIn", linkedin, (e) =>
                      setLinkedin(e.target.value)
                    )
                  ) : (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <Linkedin className="w-5 h-5 mr-2 text-blue-700" />
                      <span className="text-gray-600">
                        {linkedin || "Not provided"}
                      </span>
                    </a>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  {editMode ? (
                    renderEditableField("Facebook", facebook, (e) =>
                      setFacebook(e.target.value)
                    )
                  ) : (
                    <a
                      href={facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <Facebook className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-gray-600">
                        {facebook || "Not provided"}
                      </span>
                    </a>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Personal Website</Label>
                {editMode ? (
                  renderEditableField("Personal Website", website, (e) =>
                    setWebsite(e.target.value)
                  )
                ) : (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <Globe className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-gray-600">
                      {website || "Not provided"}
                    </span>
                  </a>
                )}
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
