
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Profile = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/auth");
  };

  const handleEditProfile = () => {
    setEditForm({
      name: user.name,
      email: user.email,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    // In a real application, this would make an API call to update the user's profile
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
    setIsEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
      
      <Card className="p-6 bg-[#121214] border-white/10 mb-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm text-gray-400">Name</h2>
            <p className="text-white font-semibold">{user.name}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-400">Email</h2>
            <p className="text-white font-semibold">{user.email}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-400">Role</h2>
            <p className="text-white font-semibold">{user.isAdmin ? "Administrator" : "User"}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-400">Account Status</h2>
            <p className="text-white font-semibold">Active</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          className="bg-[#121214] border border-white/10 hover:bg-white/5"
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>
        <Button
          variant="destructive"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#121214] text-white border-white/10">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Name</label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="bg-[#1A1A1C] border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Email</label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="bg-[#1A1A1C] border-white/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
