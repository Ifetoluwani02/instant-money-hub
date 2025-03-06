
interface MobileOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

const MobileOverlay = ({ isVisible, onClose }: MobileOverlayProps) => {
  if (!isVisible) return null;
  
  return (
    <div
      className="fixed inset-0 bg-black/50 z-30"
      onClick={onClose}
    />
  );
};

export default MobileOverlay;
