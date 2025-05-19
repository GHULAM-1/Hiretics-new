'use client'
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChangeEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeEmailDialog = ({ isOpen, onClose }: ChangeEmailDialogProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Email changed to:", email);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="link">Change</Button>
      </DialogTrigger> */}
      <DialogContent>
        <DialogTitle>Change Email</DialogTitle>
        <DialogDescription>Enter your new email address below:</DialogDescription>
        <Input
          placeholder="New Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[70%]"
        />
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeEmailDialog;
