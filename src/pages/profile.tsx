// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { auth } from "@/firebase"; // Firebase auth import
// import {
//   EmailAuthProvider,
//   reauthenticateWithCredential,
//   updatePassword,
//   updateProfile,
// } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import AvatarEditor from "react-avatar-editor";
// import { toast } from "react-toastify";

// const ProfilePage = () => {
//   const [user, setUser] = useState<any>(null); // Store user data
//   const [image, setImage] = useState<any>(null); // Store uploaded image
//   const [editor, setEditor] = useState<any>(null); // Avatar editor instance
//   const [name, setName] = useState<string>(""); // Store updated name
//   const [password, setPassword] = useState<string>(""); // Store current password for reauthentication
//   const [newPassword, setNewPassword] = useState<string>(""); // For new password
//   const [confirmPassword, setConfirmPassword] = useState<string>(""); // Confirm new password
//   const [loading, setLoading] = useState<boolean>(false); // Loading state
//   const navigate = useNavigate();
//   const editorRef = useRef<any>(null); // Ref for AvatarEditor

//   // Fetch user data when the page loads
//   useEffect(() => {
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       setUser(currentUser);
//       setName(currentUser.displayName || ""); // Set display name if available
//     } else {
//       navigate("/login"); // Redirect to login if not authenticated
//     }
//   }, [navigate]);

//   // Handle image upload
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImage(URL.createObjectURL(file)); // Preview image
//     }
//   };

//   // Handle saving the profile picture
//   const handleSaveImage = async () => {
//     if (editorRef.current) {
//       const canvas = editorRef.current.getImage(); // Get image data from editor
//       const imageURL = canvas.toDataURL(); // Convert to base64
//       try {
//         await updateProfile(user, { photoURL: imageURL });
//         toast.success("Profile picture updated!");
//       } catch (error) {
//         toast.error("Error updating profile picture");
//       }
//     }
//   };

//   // Handle changing name
//   const handleNameChange = async () => {
//     try {
//       await updateProfile(user, { displayName: name });
//       toast.success("Name updated successfully!");
//     } catch (error) {
//       toast.error("Error updating name");
//     }
//   };

//   // Handle password change
//   const handlePasswordChange = async () => {
//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     try {
//       const credential = EmailAuthProvider.credential(user.email, password); // Reauthenticate
//       await reauthenticateWithCredential(user, credential);
//       await updatePassword(user, newPassword); // Update password
//       toast.success("Password updated successfully!");
//     } catch (error) {
//       toast.error("Error changing password");
//     }
//   };

//   // Loading check
//   if (!user) {
//     return <div>Loading...</div>; // Display loading if user data is not available
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>

//       {/* Profile Picture Section */}
//       <div className="flex flex-col items-center mb-8">
//         <AvatarEditor
//           ref={editorRef}
//           image={image || user?.photoURL || "/default-avatar.png"} // Default avatar if no image
//           width={150}
//           height={150}
//           border={50}
//           borderRadius={75}
//           scale={1.2}
//         />
//         <input type="file" onChange={handleImageChange} className="mt-4" />
//         <Button onClick={handleSaveImage} className="mt-4">
//           Save Profile Picture
//         </Button>
//       </div>

//       {/* Name Section */}
//       <div className="mb-8">
//         <h3 className="text-lg font-semibold mb-2">Full Name</h3>
//         <Input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="mb-4"
//         />
//         <Button onClick={handleNameChange} className="w-full">
//           Save Name
//         </Button>
//       </div>

//       {/* Password Section */}
//       <div className="mb-8">
//         <h3 className="text-lg font-semibold mb-2">Change Password</h3>
//         <Input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter current password"
//           className="mb-4"
//         />
//         <Input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           placeholder="Enter new password"
//           className="mb-4"
//         />
//         <Input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm new password"
//           className="mb-4"
//         />
//         <Button onClick={handlePasswordChange} className="w-full">
//           Change Password
//         </Button>
//       </div>

//       {/* Logout Button */}
//       <Button
//         onClick={() => {
//           auth.signOut();
//           navigate("/login");
//         }}
//         variant="outline"
//         className="w-full mt-6"
//       >
//         Logout
//       </Button>
//     </div>
//   );
// };

// export default ProfilePage;
