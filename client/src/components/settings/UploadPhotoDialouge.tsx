import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UploadPhotoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadPhotoDialog = ({ isOpen, onClose }: UploadPhotoDialogProps) => {
  const handleUpload = () => {
    console.log("Profile photo uploaded");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Upload Photo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Upload Photo</DialogTitle>
        <DialogDescription>Upload a new profile photo:</DialogDescription>
        <div className="flex justify-center items-center">
          <Button onClick={handleUpload}>Upload</Button>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPhotoDialog;
